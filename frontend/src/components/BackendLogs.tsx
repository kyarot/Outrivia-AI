import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  time: string;
  type: "info" | "success" | "error";
  message: string;
}

const ALL_LOGS: LogEntry[] = [
  { time: "00:00.1", type: "info", message: "Extracting intent from goal..." },
  { time: "00:00.8", type: "success", message: "Intent parsed: AI founders + backend hiring" },
  { time: "00:01.2", type: "info", message: "SerpAPI: searching LinkedIn profiles..." },
  { time: "00:02.4", type: "success", message: "Found 47 matches via SERP" },
  { time: "00:03.0", type: "info", message: "Apify: scraping founder profiles..." },
  { time: "00:04.2", type: "success", message: "Extracted data for 32 leads" },
  { time: "00:04.8", type: "info", message: "Enriching emails & verification..." },
  { time: "00:05.9", type: "success", message: "Verified 28 corporate emails" },
  { time: "00:06.5", type: "info", message: "AI: generating personalized outreach..." },
  { time: "00:07.8", type: "success", message: "28 custom messages staged" },
];

interface BackendLogsProps {
  activeStep: number;
}

const BackendLogs = ({ activeStep }: BackendLogsProps) => {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const count = Math.min(activeStep * 2 + 2, ALL_LOGS.length);
    setVisibleLogs(ALL_LOGS.slice(0, Math.max(count, 0)));
  }, [activeStep]);

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (visibleLogs.length > 0) {
      const lastLog = visibleLogs[visibleLogs.length - 1];
      let i = 0;
      setDisplayText("");
      const interval = setInterval(() => {
        if (i < lastLog.message.length) {
          setDisplayText((prev) => prev + lastLog.message[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [visibleLogs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card-elevated flex flex-col p-5 h-full border border-slate-100 bg-white/95"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900/60">Execution Logs</h2>
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto rounded-xl bg-slate-50 p-4 font-mono text-xs leading-relaxed border border-slate-100 shadow-inner scrollbar-hide">
        {visibleLogs.slice(0, -1).map((log, i) => (
          <div key={i} className="flex gap-3 mb-2 opacity-70">
            <span className="text-slate-300 shrink-0 font-bold">[{log.time}]</span>
            <span className={log.type === "success" ? "text-success/90" : log.type === "error" ? "text-destructive/90" : "text-slate-500"}>
              {log.message}
            </span>
          </div>
        ))}
        {visibleLogs.length > 0 && (
          <div className="flex gap-3">
            <span className="text-slate-300 shrink-0 font-bold">[{visibleLogs[visibleLogs.length - 1].time}]</span>
            <span className={visibleLogs[visibleLogs.length - 1].type === "success" ? "text-success font-bold" : visibleLogs[visibleLogs.length - 1].type === "error" ? "text-destructive font-bold" : "text-slate-800 font-medium"}>
              {displayText}
              <span className="inline-block w-1.5 h-3 bg-primary/40 ml-1 animate-pulse align-middle" />
            </span>
          </div>
        )}
        {visibleLogs.length === 0 && (
          <span className="text-slate-300 italic">Awaiting neural engine pulse...</span>
        )}
      </div>
    </motion.div>
  );
};

export default BackendLogs;
