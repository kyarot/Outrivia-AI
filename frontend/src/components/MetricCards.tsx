import { motion } from "framer-motion";

const METRICS = [
  { label: "Prospects Found", value: "47", delta: "+12 this run" },
  { label: "Emails Verified", value: "28", delta: "59% rate" },
  { label: "Messages Generated", value: "28", delta: "Personalized" },
  { label: "Emails Sent", value: "0", delta: "Awaiting approval" },
];

interface MetricCardsProps {
  visible: boolean;
}

const MetricCards = ({ visible }: MetricCardsProps) => {
  if (!visible) return null;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {METRICS.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="glass-card-elevated p-5 border border-slate-100 bg-white/95"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-900/60">{m.label}</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{m.value}</p>
          <p className="mt-1 text-[10px] font-bold text-success">{m.delta}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricCards;
