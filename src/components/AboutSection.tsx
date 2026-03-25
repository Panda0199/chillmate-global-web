import { motion } from "framer-motion";

type AboutSectionProps = {
  content?: {
    title?: string | null;
    subtitle?: string | null;
    body?: string | null;
  } | null;
};

const AboutSection = ({ content }: AboutSectionProps) => (
  <section id="about" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className="max-w-3xl"
      >
        <p className="text-label text-primary mb-4">
          {content?.title || "About Us"}
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
          {content?.subtitle || "About Our Company"}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {(content?.body || "").split("\n\n").filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;