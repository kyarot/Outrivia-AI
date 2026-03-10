import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GoalInput from "@/components/GoalInput";
import PipelineVisualization from "@/components/PipelineVisualization";
import BackendLogs from "@/components/BackendLogs";
import ProspectTable from "@/components/ProspectTable";
import GeneratedMessages from "@/components/GeneratedMessages";
import ApprovalCenter from "@/components/ApprovalCenter";
import MetricCards from "@/components/MetricCards";
import StatsRow from "@/components/StatsRow";

const Dashboard = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const [showResults, setShowResults] = useState(false);

    const handleGenerate = useCallback((goal: string) => {
        setIsProcessing(true);
        setActiveStep(0);
        setShowResults(false);
    }, []);

    useEffect(() => {
        if (!isProcessing || activeStep < 0) return;
        if (activeStep >= 7) {
            setIsProcessing(false);
            setShowResults(true);
            return;
        }
        const timer = setTimeout(() => setActiveStep((s) => s + 1), 800);
        return () => clearTimeout(timer);
    }, [isProcessing, activeStep]);

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10">
                <Navbar />

                <main className="mx-auto max-w-7xl px-4 pt-48 pb-16 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                            Command <span className="glow-text">Center</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-white font-bold drop-shadow-sm opacity-90">
                            Autonomously discover, enrich, and engage your next high-value customers.
                        </p>
                    </div>

                    {/* Global Stats */}
                    <div className="mb-12">
                        <StatsRow />
                    </div>

                    {/* Goal Input */}
                    <div className="mx-auto max-w-3xl">
                        <GoalInput onGenerate={handleGenerate} isProcessing={isProcessing} />
                    </div>

                    {/* Dashboard Content */}
                    <div className="mt-12 space-y-8">
                        {/* Pipeline + Logs */}
                        {activeStep >= 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid gap-6 lg:grid-cols-[1fr_2fr]"
                            >
                                <PipelineVisualization activeStep={activeStep} />
                                <div className="h-[400px]">
                                    <BackendLogs activeStep={activeStep} />
                                </div>
                            </motion.div>
                        )}

                        {/* Shimmer / Loading State */}
                        {isProcessing && activeStep > 4 && (
                            <div className="space-y-6">
                                <div className="h-32 w-full animate-pulse rounded-2xl bg-white/40 border border-slate-100 shadow-sm" />
                                <div className="h-64 w-full animate-pulse rounded-2xl bg-white/40 border border-slate-100 shadow-sm" />
                            </div>
                        )}

                        {/* Results Section */}
                        {showResults && !isProcessing && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <MetricCards visible={true} />

                                <div className="grid gap-6 lg:grid-cols-3">
                                    <div className="lg:col-span-2">
                                        <ProspectTable visible={true} />
                                    </div>
                                    <div>
                                        <ApprovalCenter visible={true} />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <GeneratedMessages visible={true} />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </main>

                <footer className="border-t border-white/10 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-white/40 font-medium">
                        © 2026 Outrivia Command Center. Autonomous Intelligence Engine Active.
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
