import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  to: string;
  company: string;
  subject: string;
  body: string;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    to: "Sarah Chen",
    company: "NeuralPath AI",
    subject: "Re: Backend Engineering at NeuralPath",
    body: "Hi Sarah, I noticed NeuralPath is scaling its inference pipeline team. Having worked with distributed systems at scale, I'd love to discuss how we could support your backend hiring goals with pre-vetted senior engineers...",
  },
  {
    id: 2,
    to: "Marcus Rivera",
    company: "DataForge",
    subject: "DataForge's growth — a quick thought",
    body: "Marcus, congratulations on the Series A. Building a data platform at this stage means getting the backend foundations right. I have a network of engineers who specialize in exactly this kind of challenge...",
  },
  {
    id: 3,
    to: "Aisha Patel",
    company: "Synthwave",
    subject: "Synthwave's engineering roadmap",
    body: "Aisha, your recent talk on real-time audio synthesis was impressive. If you're looking to expand the backend team to support lower-latency streaming, I'd love to share a few candidates who've built similar systems...",
  },
];

interface GeneratedMessagesProps {
  visible: boolean;
}

const GeneratedMessages = ({ visible }: GeneratedMessagesProps) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4 text-lg font-semibold text-foreground">Generated Messages</h2>
      <div className="grid gap-4">
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-elevated group p-6 border border-slate-100 hover:border-primary/20 transition-all bg-white/95"
          >
            <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-70">Personalized Message</h3>
            <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
              <h4 className="text-sm font-black text-slate-900">{msg.to}</h4>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-tighter">Draft</span>
            </div>
            <p className="mb-2 text-xs font-black text-slate-900 tracking-tight">{msg.subject}</p>
            <p className="mb-5 text-sm text-slate-600 font-medium leading-relaxed italic opacity-90 line-clamp-3">
              "{msg.body}"
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold">Edit</Button>
              <Button variant="outline" size="sm" className="rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold">Regenerate</Button>
              <Button size="sm" className="rounded-full px-6 shadow-md font-bold">Approve</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GeneratedMessages;
