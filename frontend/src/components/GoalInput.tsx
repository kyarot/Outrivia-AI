import { useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoalInputProps {
  onGenerate: (goal: string) => void;
  isProcessing: boolean;
}

const GoalInput = ({ onGenerate, isProcessing }: GoalInputProps) => {
  const [goal, setGoal] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card-elevated p-6"
    >
      <h2 className="mb-1 text-lg font-black text-slate-900 tracking-tight uppercase tracking-widest text-[10px] opacity-70">Configuration</h2>
      <h3 className="mb-1 text-2xl font-black text-slate-900 tracking-tight">Outreach Goal</h3>
      <p className="mb-4 text-sm text-slate-500 font-bold uppercase tracking-wider text-[11px] opacity-80">
        Describe who you want to reach and why.
      </p>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Find AI startup founders hiring backend engineers"
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
        rows={4}
      />
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="default"
            className="gap-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-full px-6 shadow-sm"
          >
            <Mic className="h-4 w-4" />
            Voice Input
          </Button>
        </div>
        <Button
          size="lg"
          disabled={!goal.trim() || isProcessing}
          onClick={() => onGenerate(goal)}
          className="rounded-full px-8 shadow-[0_0_20px_rgba(41,123,255,0.3)] hover:shadow-[0_0_25px_rgba(41,123,255,0.5)] transition-all"
        >
          {isProcessing ? "Generating…" : "Generate Prospects"}
        </Button>
      </div>
    </motion.div>
  );
};

export default GoalInput;
