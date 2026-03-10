import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card-elevated mx-auto max-w-3xl p-12 text-center border border-slate-100 bg-white/95"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Ready to automate your{" "}
          <span className="glow-text">outbound pipeline</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-600 font-medium">
          Join hundreds of sales teams using Outrivia to find, engage, and
          convert high-value prospects on autopilot.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="gap-2 text-base rounded-full px-8 shadow-xl font-bold" onClick={onGetStarted}>
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="text-base rounded-full px-8 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold" onClick={onGetStarted}>
            Talk to Sales
          </Button>
        </div>
        <p className="mt-4 text-xs text-slate-400 font-bold tracking-tight uppercase tracking-widest">
          No credit card required · 14-day free trial · Cancel anytime
        </p>
      </motion.div>
    </section>
  );
};

export default CTASection;
