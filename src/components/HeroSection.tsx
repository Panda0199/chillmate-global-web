import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
    {/* Subtle grid background */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />

    <div className="container relative z-10">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        >
          <p className="text-label text-primary mb-6">ISO 9001:2015 Certified · 99.9% Purity Guaranteed</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.1] text-foreground mb-6" style={{ letterSpacing: "-0.04em" }}>
            Reliable Refrigerant Gas Trading Partner
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl" style={{ textWrap: "pretty" as any }}>
            We supply high-quality refrigerant gases for HVAC, refrigeration, and industrial applications, working with partners across international markets.
          </p>
          <a
            href="#contact"
            className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-[6px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
