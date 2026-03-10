import { motion } from "framer-motion";
import { MessageSquare, Search, UserCheck, Mail, CheckCircle } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Describe Your Goal",
    description: "Tell Outrivia who you want to reach in plain English. No complex filters or boolean queries needed.",
  },
  {
    icon: Search,
    step: "02",
    title: "AI Finds Prospects",
    description: "Our pipeline scans LinkedIn, company databases, and the web to surface verified, high-intent prospects.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Review & Score",
    description: "Prospects are ranked by relevance. Review scores, company fit, and enriched profiles in one view.",
  },
  {
    icon: Mail,
    step: "04",
    title: "Personalized Messages",
    description: "AI generates unique, context-aware outreach for each prospect — ready for your review.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Approve & Send",
    description: "Edit, approve, and launch your campaign. Outrivia handles deliverability and follow-up sequencing.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl drop-shadow-sm">
          How it <span className="glow-text">works</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80 font-bold italic">
          Five steps from idea to inbox. Every step automated, every message personal.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20 md:left-1/2 md:-translate-x-px" />

        {STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`relative mb-12 flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
          >
            {/* Node dot */}
            <div className="absolute left-6 top-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-[0_0_12px_rgba(41,123,255,0.8)] md:left-1/2" />

            <div className={`ml-12 flex-1 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
              <span className="text-xs font-black font-mono text-white tracking-widest bg-primary/20 px-2 py-0.5 rounded uppercase">Step {s.step}</span>
              <h3 className="mt-2 text-xl font-black text-white tracking-tight drop-shadow-sm">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 font-bold">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
