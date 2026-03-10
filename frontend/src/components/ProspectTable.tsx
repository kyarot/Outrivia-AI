import { motion } from "framer-motion";

interface Prospect {
  id: number;
  name: string;
  role: string;
  company: string;
  score: number;
  emailStatus: string;
  linkedin: string;
}

const PROSPECTS: Prospect[] = [
  { id: 1, name: "Sarah Chen", role: "CTO", company: "NeuralPath AI", score: 95, emailStatus: "Verified", linkedin: "linkedin.com/in/sarachen" },
  { id: 2, name: "Marcus Rivera", role: "Founder", company: "DataForge", score: 88, emailStatus: "Verified", linkedin: "linkedin.com/in/mrivera" },
  { id: 3, name: "Aisha Patel", role: "VP Engineering", company: "Synthwave", score: 82, emailStatus: "Verified", linkedin: "linkedin.com/in/aishap" },
  { id: 4, name: "Tom Lindgren", role: "Co-Founder", company: "Automate.ai", score: 76, emailStatus: "Pending", linkedin: "linkedin.com/in/toml" },
  { id: 5, name: "Emily Zhao", role: "Head of Eng", company: "Cortex Labs", score: 64, emailStatus: "Verified", linkedin: "linkedin.com/in/emilyzhao" },
  { id: 6, name: "David Kim", role: "CTO", company: "InferAI", score: 58, emailStatus: "Not Found", linkedin: "linkedin.com/in/dkim" },
];

interface ProspectTableProps {
  visible: boolean;
  onSelectProspect?: (id: number) => void;
}

const scoreBadge = (score: number) => {
  if (score >= 80) return "score-high";
  if (score >= 65) return "score-medium";
  return "score-low";
};

const ProspectTable = ({ visible, onSelectProspect }: ProspectTableProps) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-4 pb-2">
        <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase tracking-widest text-[10px] opacity-70">Analytics</h2>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Prospect Ranking</h3>
      </div>
      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Company</th>
              <th className="px-4 py-4">Score</th>
              <th className="px-4 py-4">Email Status</th>
              <th className="px-4 py-4 hidden md:table-cell">LinkedIn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {PROSPECTS.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelectProspect?.(p.id)}
                className="group cursor-pointer transition-all hover:bg-slate-50/50"
              >
                <td className="px-4 py-4 font-bold text-slate-900">{p.name}</td>
                <td className="px-4 py-4 text-slate-600 font-medium">{p.role}</td>
                <td className="px-4 py-4 text-slate-600 font-medium">{p.company}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black shadow-sm ${scoreBadge(p.score)}`}>
                    {p.score}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${p.emailStatus === "Verified" ? "text-success" : p.emailStatus === "Pending" ? "text-slate-400" : "text-destructive"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${p.emailStatus === "Verified" ? "bg-success" : p.emailStatus === "Pending" ? "bg-slate-300 animate-pulse" : "bg-destructive"}`} />
                    {p.emailStatus}
                  </span>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <a href={`https://${p.linkedin}`} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Profile</a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProspectTable;
