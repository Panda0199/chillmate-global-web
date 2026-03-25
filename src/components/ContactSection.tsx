import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type ContactSectionProps = {
  content?: {
    title?: string | null;
    body?: string | null;
    button_label?: string | null;
    form_config?: {
      successMessage?: string;
      consentLabel?: string;
    } | null;
  } | null;
};

const ContactSection = ({ content }: ContactSectionProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const data = {
      team_slug: "team-frost",
      source: "ai-web-2026",
      company_name: formData.get("company_name"),
      contact_person: formData.get("contact_person"),
      email: formData.get("email"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on",
    };

    const { data: insertedInquiry, error } = await supabase
      .from("inquiries")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Failed to send message");
      setLoading(false);
      return;
    }

    const emailResponse = await fetch("/.netlify/functions/send-inquiry-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inquiryId: insertedInquiry.id,
        ...data,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Email function failed");
    }

    setSuccess(true);
    e.currentTarget.reset();
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="max-w-2xl"
        >
          <p className="text-label text-primary mb-4">
            {content?.title || "Contact Us"}
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
            {content?.title || "Contact Us"}
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {content?.body ||
              "If you are interested in partnering with us or learning more about our refrigerant gas supply solutions, please send us a message."}
          </p>

          {success && (
            <div className="mb-4 text-green-600">
              {content?.form_config?.successMessage ||
                "Thank you for your message. We will contact you shortly."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="company_name" className="block text-sm mb-2">
                Company name
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                className="w-full rounded-md border px-4 py-3 bg-background"
                required
              />
            </div>

            <div>
              <label htmlFor="contact_person" className="block text-sm mb-2">
                Contact person
              </label>
              <input
                id="contact_person"
                name="contact_person"
                type="text"
                className="w-full rounded-md border px-4 py-3 bg-background"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-md border px-4 py-3 bg-background"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-md border px-4 py-3 bg-background"
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="mt-1"
                required
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground">
                {content?.form_config?.consentLabel ||
                  "I agree to the processing of my information for contact purposes."}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground"
            >
              {loading ? "Sending..." : content?.button_label || "Send Request"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;