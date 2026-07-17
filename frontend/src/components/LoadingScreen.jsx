import { useState, useEffect, useRef } from "react";

const LoadingScreen = ({ isLoaded, onEnterStart, onEnterComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("INITIALIZING_SYSTEMS");
    const [showEnter, setShowEnter] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const progressInterval = useRef(null);

    // Simulate progress ticking up, but cap at 90% until truly loaded
    useEffect(() => {
        const statusMessages = [
            { at: 5, text: "LOADING_CORE_MODULES" },
            { at: 15, text: "ESTABLISHING_SECURE_CONNECTION" },
            { at: 30, text: "DECRYPTING_ASSET_VAULT" },
            { at: 45, text: "COMPILING_MISSION_DATA" },
            { at: 60, text: "RENDERING_TACTICAL_HUD" },
            { at: 75, text: "CALIBRATING_VISUAL_SYSTEMS" },
            { at: 90, text: "FINALIZING_DEPLOYMENT" },
        ];

        progressInterval.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90 && !isLoaded) return 90; // hold at 90 until loaded
                if (prev >= 100) {
                    clearInterval(progressInterval.current);
                    return 100;
                }
                const next = prev + (isLoaded ? 5 : 0.8);
                const clamped = Math.min(next, isLoaded ? 100 : 90);

                // Update status text
                const msg = statusMessages.findLast((m) => clamped >= m.at);
                if (msg) setStatusText(msg.text);

                return clamped;
            });
        }, 60);

        return () => clearInterval(progressInterval.current);
    }, [isLoaded]);

    // Show enter button when progress hits 100
    useEffect(() => {
        if (progress >= 100) {
            setStatusText("SYSTEMS_ONLINE");
            const timer = setTimeout(() => setShowEnter(true), 400);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    const handleEnter = () => {
        setIsExiting(true);
        // Immediately tell parent to start revealing the background
        if (onEnterStart) onEnterStart();

        // Wait for gate + fog animation to finish before fully unmounting
        setTimeout(() => {
            if (onEnterComplete) onEnterComplete();
        }, 1600);
    };

    return (
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center font-mono ${isExiting ? "pointer-events-none" : ""}`}>
            {/* Gate Left Panel */}
            <div
                className="absolute top-0 left-0 w-1/2 h-full bg-[#060c14] z-10 transition-transform ease-in-out"
                style={{
                    transform: isExiting ? "translateX(-100%)" : "translateX(0)",
                    transitionDuration: "1s",
                    borderRight: "1px solid rgba(251, 54, 65, 0.2)",
                }}
            >
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#FB3641]/40 to-transparent"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FB3641]/30"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FB3641]/30"></div>
            </div>

            {/* Gate Right Panel */}
            <div
                className="absolute top-0 right-0 w-1/2 h-full bg-[#060c14] z-10 transition-transform ease-in-out"
                style={{
                    transform: isExiting ? "translateX(100%)" : "translateX(0)",
                    transitionDuration: "1s",
                    borderLeft: "1px solid rgba(251, 54, 65, 0.2)",
                }}
            >
                <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#FB3641]/40 to-transparent"></div>
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FB3641]/30"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FB3641]/30"></div>
            </div>

            {/* Content (sits on top of both gate panels) */}
            <div
                className="relative z-20 flex flex-col items-center transition-opacity duration-500 ease-out"
                style={{ opacity: isExiting ? 0 : 1 }}
            >
                {/* Ambient glow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: "400px",
                        height: "400px",
                        background: "radial-gradient(circle, rgba(251,54,65,0.15) 0%, transparent 60%)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                ></div>

                {/* Card container */}
                <div
                    className="relative px-8 sm:px-16 py-10 sm:py-14 flex flex-col items-center rounded-lg border border-white/5"
                    style={{
                        background: "rgba(10, 20, 30, 0.85)",
                        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(251, 54, 65, 0.06)",
                    }}
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FB3641]/50"></div>
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FB3641]/50"></div>
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FB3641]/50"></div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FB3641]/50"></div>

                    {/* Logo */}
                    <div className="mb-6 flex items-baseline gap-0.5 select-none">
                        <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-[#FB3641]">R<sup className="text-[#FFFFFF]">2</sup></h1>
                    </div>

                    {/* Tagline */}
                    <h2 className="text-xs sm:text-sm text-[#84958a] tracking-[0.4em] uppercase mb-8 text-center">
                        PORTFOLIO_SYSTEM
                    </h2>

                    {/* Progress bar container */}
                    <div className="w-56 sm:w-72 mb-4">
                        <div className="w-full h-[3px] bg-[#1a2a35] rounded-full overflow-hidden relative">
                            <div
                                className="h-full rounded-full transition-all duration-200 ease-out relative"
                                style={{
                                    width: `${progress}%`,
                                    background: "linear-gradient(90deg, #FB3641 0%, #FB3641 70%, #ff6b73 100%)",
                                    boxShadow: "0 0 12px rgba(251, 54, 65, 0.6)",
                                }}
                            >
                                <div
                                    className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full"
                                    style={{
                                        background: "rgba(251, 54, 65, 0.8)",
                                        filter: "blur(4px)",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Status text */}
                    <div className="flex items-center gap-2 mb-6">
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${progress >= 100 ? "bg-[#00e29d]" : "bg-[#FB3641] animate-pulse"}`}
                        ></span>
                        <span className="text-[9px] sm:text-[10px] text-[#84958a] tracking-[0.2em] uppercase">
                            {statusText}
                        </span>
                        {progress < 100 && (
                            <span className="text-[9px] sm:text-[10px] text-[#FB3641] tracking-wider">
                                {Math.round(progress)}%
                            </span>
                        )}
                    </div>

                    {/* Enter button — appears after loading */}
                    <div className={`transition-all duration-500 ${showEnter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                        <button
                            onClick={handleEnter}
                            className="group relative px-10 sm:px-14 py-3 sm:py-4 bg-[#FB3641] hover:bg-[#CD040E] text-white font-bold tracking-[0.3em] text-xs sm:text-sm uppercase cursor-pointer transition-all duration-200 active:scale-95 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,54,65,0.4)]"
                            style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                        >
                            ENTER_SYSTEM
                        </button>
                    </div>
                </div>

                {/* Bottom version text */}
                <div className="mt-8 text-center">
                    <p className="text-[9px] text-[#84958a]/50 tracking-[0.3em] uppercase">
                        RAJPUT_RITESH // PORTFOLIO v1.0
                    </p>
                    <p className="text-[8px] text-[#00e29d]/40 tracking-widest uppercase mt-1">
                        Establishing secure connection to workspace...
                    </p>
                </div>
            </div>

            {/* Scanlines overlay */}
            <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
                    opacity: isExiting ? 0 : 1,
                    transition: "opacity 0.5s",
                }}
            ></div>
        </div>
    );
};

export default LoadingScreen;
