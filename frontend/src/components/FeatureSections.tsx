import { motion } from "framer-motion";
import { Search, Brain, Mail, BarChart3, Shield, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Intelligent Prospect Discovery",
    description:
      "Define your ideal customer profile in natural language. Outrivia scours LinkedIn, company databases, and the open web to surface high-intent prospects that match your exact criteria.",
    highlights: ["Natural language targeting", "Multi-source aggregation", "Intent signal detection"],
  },
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description:
      "Every message is uniquely crafted. Our AI analyzes each prospect's role, recent activity, company stage, and public content to generate outreach that feels genuinely human.",
    highlights: ["Context-aware messaging", "Tone & style matching", "Dynamic subject lines"],
  },
  {
    icon: Mail,
    title: "Automated Email Enrichment",
    description:
      "Verified, deliverable email addresses for every prospect. Outrivia cross-references multiple enrichment providers and validates each address before it enters your pipeline.",
    highlights: ["Multi-provider verification", "Bounce prediction", "Real-time validation"],
  },
  {
    icon: BarChart3,
    title: "Real-Time Pipeline Analytics",
    description:
      "Watch your outreach pipeline execute in real time. From intent extraction to message delivery, every step is logged, measured, and visible in a live terminal view.",
    highlights: ["Live execution logs", "Step-by-step tracking", "Performance metrics"],
  },
  {
    icon: Shield,
    title: "Human-in-the-Loop Approval",
    description:
      "Stay in control. Review, edit, and approve every message before it's sent. Outrivia handles the heavy lifting — you make the final call on what reaches your prospects.",
    highlights: ["Batch approval workflow", "Inline editing", "Quality scoring"],
  },
  {
    icon: Zap,
    title: "One-Click Outreach Execution",
    description:
      "When you're ready, send approved messages with a single click. Outrivia handles deliverability, scheduling, and follow-up sequencing automatically.",
    highlights: ["Smart send scheduling", "Deliverability optimization", "Auto follow-ups"],
  },
];

const FeatureSections = () => {
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
          Everything you need to{" "}
          <span className="glow-text">scale outbound</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80 font-bold">
          From prospect discovery to message delivery, Outrivia automates every
          step of your outbound pipeline with AI precision.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card group p-6 transition-all duration-300 hover:glow-border bg-white/90 border-slate-100"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-black text-slate-900 tracking-tight">
              {feature.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600 font-medium">
              {feature.description}
            </p>
            <ul className="space-y-1.5">
              {feature.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-slate-500 font-black uppercase tracking-wider">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSections;
