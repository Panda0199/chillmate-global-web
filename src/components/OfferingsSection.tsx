import { motion } from "framer-motion";
import { Thermometer, Factory, Ship, ShieldCheck, Handshake } from "lucide-react";

const icons = [Thermometer, Factory, Ship, ShieldCheck, Handshake];

type OfferItem = {
  title: string;
  desc: string;
};

type OfferingsSectionProps = {
  content?: {
    title?: string | null;
    subtitle?: string | null;
    items?: OfferItem[] | null;
  } | null;
};

const fallbackItems: OfferItem[] = [
  { title: "Refrigerant gas supply for HVAC systems", desc: "Supply of high-quality refrigerant gases for HVAC applications." },
  { title: "Industrial refrigeration solutions", desc: "Reliable supply solutions for industrial refrigeration systems." },
  { title: "Reliable international logistics", desc: "Efficient global delivery through trusted logistics partners." },
  { title: "Quality assurance and compliance", desc: "Products aligned with international standards and regulations." },
  { title: "Long-term B2B partnerships", desc: "Building stable and long-term relationships with business clients." },
];

const OfferingsSection = ({ content }: OfferingsSectionProps) => {
  const items = content?.items || fallbackItems;

  return (
    <section id="offerings" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          <p className="text-label text-primary mb-4">
            {content?.title || "What We Offer"}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-12">
            {content?.subtitle || "What We Offer"}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                className="card-surface"
              >
                <div className="h-10 w-10 bg-primary/10 rounded-[8px] flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;