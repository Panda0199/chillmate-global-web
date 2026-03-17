import { motion } from "framer-motion";
import { Thermometer, Factory, Ship, ShieldCheck, Handshake } from "lucide-react";

const items = [
  { icon: Thermometer, title: "HVAC Refrigerant Supply", desc: "High-purity refrigerant gases for commercial and residential HVAC systems." },
  { icon: Factory, title: "Industrial Refrigeration", desc: "High-volume supply for large-scale industrial refrigeration systems." },
  { icon: Ship, title: "International Logistics", desc: "Integrated supply chain with ISO tank and cylinder delivery worldwide." },
  { icon: ShieldCheck, title: "Quality & Compliance", desc: "Full certificates of analysis, MSDS documentation, and regulatory adherence." },
  { icon: Handshake, title: "Long-term B2B Partnerships", desc: "Structured contracts, volume pricing, and dedicated account management." },
];

const OfferingsSection = () => (
  <section id="offerings" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      >
        <p className="text-label text-primary mb-4">What We Offer</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-12">
          Integrated Solutions for Your Supply Chain
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
            className="card-surface"
          >
            <div className="h-10 w-10 bg-primary/10 rounded-[8px] flex items-center justify-center mb-6">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OfferingsSection;
