import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import FeatureSections from "@/components/FeatureSections";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <HeroSection onGetStarted={() => navigate("/dashboard")} />

          {/* Stats */}
          <StatsRow />

          {/* Features */}
          <div id="features">
            <FeatureSections />
          </div>

          {/* How It Works */}
          <HowItWorks />

          {/* CTA */}
          <CTASection onGetStarted={() => navigate("/dashboard")} />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <span className="text-lg font-black text-white tracking-tight">Outrivia</span>
                <p className="mt-1 text-sm text-white/60 font-medium">
                  AI-powered autonomous outbound. Built for modern sales teams.
                </p>
              </div>
              <div className="flex gap-8 text-sm text-white/60 font-bold">
                <a href="#" className="transition-colors hover:text-white">Privacy</a>
                <a href="#" className="transition-colors hover:text-white">Terms</a>
                <a href="#" className="transition-colors hover:text-white">Docs</a>
                <a href="#" className="transition-colors hover:text-white">Contact</a>
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-white/40 font-bold uppercase tracking-widest">
              © 2026 Outrivia. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
