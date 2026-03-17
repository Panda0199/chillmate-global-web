import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <p className="text-label text-primary mb-4">Contact Us</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            If you are interested in partnering with us or learning more about our refrigerant gas supply solutions, please send us a message.
          </p>

          {submitted ? (
            <div className="card-surface text-center py-12">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Request Received</h3>
              <p className="text-muted-foreground text-sm">We will review your inquiry and respond within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-label">Company Name</label>
                  <input required type="text" className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-label">Contact Person</label>
                  <input required type="text" className="input-field" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-label">Email</label>
                <input required type="email" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-label">Message</label>
                <textarea required rows={5} className="input-field resize-none" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input required type="checkbox" className="mt-1 h-4 w-4 rounded border-border accent-primary" />
                <span className="text-sm text-muted-foreground">I consent to the processing of my data for the purpose of this inquiry.</span>
              </label>
              <button
                type="submit"
                className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-[6px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Request
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
