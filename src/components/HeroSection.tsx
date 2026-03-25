import { motion } from "framer-motion";

type HeroSectionProps = {
  content?: {
    title?: string | null;
    body?: string | null;
    button_label?: string | null;
  } | null;
};

const HeroSection = ({ content }: HeroSectionProps) => (
  <section id="hero" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
          {content?.title || "Reliable Refrigerant Gas Trading Partner"}
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {content?.body || "We supply high-quality refrigerant gases for HVAC, refrigeration, and industrial applications, working with partners across international markets."}
        </p>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground"
        >
          {content?.button_label || "Contact Us"}
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;