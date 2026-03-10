
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const PROSPECTS = [
  { id: 1, name: "Sarah Chen", company: "NeuralPath AI", score: 95 },
  { id: 2, name: "Marcus Rivera", company: "DataForge", score: 88 },
  { id: 3, name: "Aisha Patel", company: "Synthwave", score: 82 },
  { id: 4, name: "Tom Lindgren", company: "Automate.ai", score: 76 },
];

const scoreBadge = (score: number) => {
  if (score >= 80) return "score-high";
  if (score >= 65) return "score-medium";
  return "score-low";
};

interface ApprovalCenterProps {
  visible: boolean;
}

const ApprovalCenter = ({ visible }: ApprovalCenterProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  if (!visible) return null;

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-5 border border-slate-100 bg-white/90"
    >
      <h2 className="mb-4 text-lg font-bold text-slate-900 tracking-tight">Approval Center</h2>
      <div className="space-y-2">
        {PROSPECTS.map((p) => (
          <label
            key={p.id}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-primary/20 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selected.includes(p.id)}
                onCheckedChange={() => toggleSelect(p.id)}
                className="border-slate-300"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 leading-tight">{p.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.company}</span>
              </div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-black shadow-sm ${scoreBadge(p.score)}`}>
              {p.score}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Button
          variant="outline"
          size="default"
          disabled={selected.length === 0}
          className="w-full rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-600 justify-between px-4 font-black shadow-sm"
        >
          Approve Selected
          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white font-black">
            {selected.length}
          </span>
        </Button>
        <Button
          size="lg"
          disabled={selected.length === 0}
          className="w-full rounded-xl shadow-lg font-black tracking-tight"
        >
          Send Outreach
        </Button>
      </div>
    </motion.div>
  );
};

export default ApprovalCenter;
