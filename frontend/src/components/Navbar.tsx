import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-12 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/40 bg-white/90 px-6 py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] ring-1 ring-white/20"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:scale-105 transition-transform">
            Outrivia
          </span>
          <div className="hidden h-4 w-[1px] bg-slate-200 sm:block" />
          <span className="hidden text-[10px] uppercase tracking-widest text-slate-500 sm:inline font-black">
            Autonomous Outreach Intelligence
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/#features" className="hidden text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:text-slate-900 md:inline">Features</Link>
          <Link to="/dashboard" className="text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:text-slate-900">Dashboard</Link>
          <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.3)] animate-pulse" />
            <span className="font-bold tracking-wider">ONLINE</span>
          </div>
          <Link to="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-900 shadow-xl border border-white/20 hover:scale-110 transition-transform">
            JD
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
