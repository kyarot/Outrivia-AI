import { motion } from "framer-motion";

const steps = [
  "Goal",
  "Intent Extraction",
  "Prospect Discovery",
  "Profile Scraping",
  "Email Enrichment",
  "AI Personalization",
  "Outreach",
];

interface PipelineVisualizationProps {
  activeStep: number;
}

const PipelineVisualization = ({ activeStep }: PipelineVisualizationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">Pipeline Pipeline</h2>
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className={`pipeline-node text-center min-w-[200px] shadow-sm ${i < activeStep
                  ? "pipeline-node-active border-primary/20 bg-slate-50/50"
                  : i === activeStep
                    ? "pipeline-node-active shadow-md border-primary/40 bg-white"
                    : "bg-white/40 opacity-50 border-slate-100"
                }`}
            >
              <span className={`text-xs font-black uppercase tracking-widest ${i <= activeStep ? "text-primary" : "text-slate-400"}`}>
                {step}
              </span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 * i + 0.15, duration: 0.2 }}
                className={`h-6 w-px origin-top ${i < activeStep ? "bg-primary" : "bg-border"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
      {/* Particle */}
      {activeStep >= 0 && activeStep < steps.length && (
        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.6, times: [0, 0.1, 0.8, 1] }}
          className="mx-auto mt-2 h-2 w-2 rounded-full bg-primary"
          style={{ boxShadow: "0 0 12px 4px rgba(0,122,255,0.4)" }}
        />
      )}
    </motion.div>
  );
};

export default PipelineVisualization;
