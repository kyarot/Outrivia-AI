import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative flex flex-col items-center pt-48 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-accent-foreground"
      >
        <Sparkles className="h-3.5 w-3.5" />
        AI-Powered Autonomous Outbound Platform
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl drop-shadow-md"
      >
        Find prospects.{" "}
        <span className="glow-text drop-shadow-[0_0_20px_rgba(41,123,255,0.4)]">Craft messages.</span>{" "}
        Close deals.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-white font-black drop-shadow-sm"
      >
        Outrivia autonomously discovers high-value prospects, generates
        hyper-personalized outreach, and delivers messages — all while you
        focus on closing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 flex gap-4"
      >
        <Button size="lg" className="gap-2 text-base rounded-full px-8 shadow-2xl shadow-primary/20 font-black" onClick={onGetStarted}>
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" className="text-base rounded-full px-8 border-white bg-white/10 text-white hover:bg-white/20 font-black transition-all" onClick={onGetStarted}>
          Book a Demo
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
