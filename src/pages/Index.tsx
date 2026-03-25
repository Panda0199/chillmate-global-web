import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OfferingsSection from "@/components/OfferingsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getSiteContent, PageSection, SiteSettings } from "@/lib/content";

const Index = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { settings, sections } = await getSiteContent("en");
        console.log("SECTIONS FROM SUPABASE:", sections);
        setSettings(settings);
        setSections(sections);
      } catch (error) {
        console.error("Failed to load CMS content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (settings?.page_title) {
      document.title = settings.page_title;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && settings?.meta_description) {
      metaDescription.setAttribute("content", settings.meta_description);
    }
  }, [settings]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const hero = sections.find((s) => s.section_key === "hero" && s.is_visible);
  const about = sections.find((s) => s.section_key === "about" && s.is_visible);
  const offerings = sections.find((s) => s.section_key === "offerings" && s.is_visible);
  const contact = sections.find((s) => s.section_key === "contact" && s.is_visible);

  return (
    <>
      <Navbar />
      <main>
        {hero && <HeroSection content={hero.translation} />}
        {about && <AboutSection content={about.translation} />}
        {offerings && <OfferingsSection content={offerings.translation} />}
        {contact && <ContactSection content={contact.translation} />}
      </main>
      <Footer />
    </>
  );
};

export default Index;