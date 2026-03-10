import { motion } from "framer-motion";

const STATS = [
  { value: "10x", label: "Faster prospecting than manual research" },
  { value: "92%", label: "Email deliverability on verified addresses" },
  { value: "3.4x", label: "Higher reply rates with AI personalization" },
  { value: "50k+", label: "Outreach messages sent by our users" },
];

const StatsRow = () => {
  return (
    <section className="py-12">
      <div className="glass-card bg-white/90 border-slate-100 p-8 shadow-xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] text-slate-500 font-black uppercase tracking-widest leading-tight mx-auto max-w-[120px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRow;
