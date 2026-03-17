import { motion } from "framer-motion";

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className="max-w-3xl"
      >
        <p className="text-label text-primary mb-4">About Us</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6">
          Global Refrigerant Supply, Built on Compliance
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            With over a decade of experience in the refrigerant gas industry, we have established ourselves as a trusted partner for HVAC manufacturers, industrial plant operators, and procurement teams worldwide. Our operations span multiple continents, supported by a robust logistics infrastructure designed for the safe and efficient transport of chemical gases.
          </p>
          <p>
            We maintain the highest standards of quality assurance, holding ISO 9001:2015 certification and adhering to international environmental regulations. Every shipment is backed by full documentation, certificates of analysis, and end-to-end traceability — because in this industry, compliance is not optional.
          </p>
          <p>
            Our product portfolio includes R-134a, R-410A, R-404A, R-407C, R-32, and other specialty refrigerants, supplied in cylinders, ISO tank containers, and bulk quantities tailored to your operational requirements.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
