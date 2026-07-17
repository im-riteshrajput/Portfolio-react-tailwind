import { useState, memo } from "react";

// Inline tactical SVG icons for zero-dependency portability
const CpuIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
);

const SlidersIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="2" y1="14" x2="6" y2="14" />
        <line x1="10" y1="8" x2="14" y2="8" />
        <line x1="18" y1="16" x2="22" y2="16" />
    </svg>
);

const LayoutIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
);

const ShieldIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const VideoIcon = ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);


// Global AudioContext to prevent memory leak crashes
let audioCtx = null;

const getAudioContext = () => {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

// Dynamic Synthesized Web Audio API sound generator for futuristic HUD clicks and alerts
const playSound = (type) => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        if (type === 'click') {
            // High-pitched tactical tick
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } else if (type === 'success') {
            // Tactical ascending beep chord
            const now = ctx.currentTime;
            [600, 800, 1000].forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + index * 0.06);

                gain.gain.setValueAtTime(0.04, now + index * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.005, now + index * 0.06 + 0.12);

                osc.start(now + index * 0.06);
                osc.stop(now + index * 0.06 + 0.12);
            });
        } else if (type === 'reset') {
            // Cyberpunk power down descending synth sweep
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);

            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        }
    } catch (e) {
        console.warn('Audio Context not allowed or supported yet', e);
    }
};

const INITIAL_SKILLS = [
    {
        id: "SK1",
        tag: "FRONTEND",
        name: "LOOKS AND VISUALS",
        description: "Advanced reactive architecture, visual components, state management pipelines, and highly animated interfaces.",
        stats: [
            { name: "TOOLS_KIT", value: "REACT.JS, TAILWIND_CSS" },
            { name: "RESPONSIVENESS", value: "UNIVERSAL" },
            { name: "STYLING_INDEX", value: "SCALABLE" },
        ],
        allocated: 2,
        max: 5
    },
    {
        id: "SK2",
        tag: "BACKEND",
        name: "LOGICS AND DATABASE PIPELINES",
        description: "Microservices design, secure authentication layers, database optimization, and high-performance server logic.",
        stats: [
            { name: "TOOLS_KIT", value: "NODE.JS, EXPRESS.JS, MONGODB" },
            { name: "DATA_SYNC", value: "99.9%" },
            { name: "UI_LATENCY", value: "MINIMAL" },
        ],
        allocated: 1,
        max: 5
    },
    {
        id: "SK3",
        tag: "UI/UX",
        name: "User Experience and Aesthetics",
        description: "Strategic mapping of end-user interactions and visual aesthetics. Translating complex system mechanics into intuitive, streamlined wireframes and engaging prototypes that eliminate user friction.",
        stats: [
            { name: "USER_RETENSTION", value: "ENHANCED" },
            { name: "INTEGRITY_INDEX", value: "1.000" },
        ],
        allocated: 1,
        max: 5
    },
    {
        id: "SK4",
        tag: "INTEGRITY",
        name: "Zero Trust & Protocols",
        description: "End-to-end encryption protocols, secure token authentication, compliance logging, and system defense mechanisms.",
        stats: [
            { name: "SHIELD_STRENGTH", value: "MIL_SPEC" },
            { name: "INTEGRITY_INDEX", value: "1.000" },
        ],
        allocated: 1,
        max: 5
    },
    {
        id: "SK5",
        tag: "VIDEO EDITING",
        name: "VISUAL STORYTELLING",
        description: "Creating engaging visual narratives through dynamic video editing, motion graphics, and visual effects.",
        stats: [
            { name: "TOOLS_KIT", value: "CAPCUT" },
            { name: "VISUAL_IMPACT", value: "MAXIMUM" },
        ],
        allocated: 1,
        max: 5
    }
];

const Capabilities = () => {
    const [skills, setSkills] = useState(INITIAL_SKILLS);
    const [intelligencePoints, setIntelligencePoints] = useState(5);

    const upgradeSkill = (skillId) => {
        if (intelligencePoints <= 0) return;

        setSkills(prevSkills =>
            prevSkills.map(sk => {
                if (sk.id === skillId && sk.allocated < sk.max) {
                    setIntelligencePoints(prev => prev - 1);
                    playSound('success');
                    return { ...sk, allocated: sk.allocated + 1 };
                }
                return sk;
            })
        );
    };

    const resetSkills = () => {
        setSkills(INITIAL_SKILLS);
        setIntelligencePoints(5);
        playSound('reset');
    };

    return (
        <section className="py-12 font-mono sticky top-0 z-20 min-h-screen flex flex-col justify-center px-2 sm:px-4 md:px-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #000000 0%, #070d14 40%, #0a1520 70%, #060c12 100%)' }}
        >
            {/* Large ambient glow orbs behind everything — these are what the cards blur through */}
            <div className="absolute pointer-events-none" style={{ top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(251,54,65,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
            <div className="absolute pointer-events-none" style={{ top: '30%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(0,226,157,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
            <div className="absolute pointer-events-none" style={{ bottom: '10%', left: '40%', width: '500px', height: '300px', background: 'radial-gradient(circle, rgba(251,54,65,0.1) 0%, transparent 70%)', filter: 'blur(100px)' }}></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="text-center mb-10 select-text">
                    <span className="text-[10px] text-[#FB3641] tracking-[0.3em] font-bold block mb-2">
                        SKILL_TREE_PROTOCOL
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                        AGENT_CAPABILITIES
                    </h2>
                </div>

                {/* Grid display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {skills.map(sk => {
                        return (
                            <div
                                key={sk.id}
                                onClick={() => { playSound('click'); }}
                                className="relative p-5 sm:p-8 border border-white/10 group hover:border-[#FB3641]/40 transition-all duration-300 cursor-pointer rounded-lg w-[95%] mx-auto md:w-full"
                                style={{
                                    background: 'rgba(10, 20, 30, 0.45)',
                                    backdropFilter: 'blur(32px)',
                                    WebkitBackdropFilter: 'blur(32px)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                                }}
                            >
                                {/* Double corner tactical brackets */}
                                <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#FB3641]/40 group-hover:border-[#00e29d] transition-colors"></div>
                                <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#FB3641]/40 group-hover:border-[#00e29d] transition-colors"></div>

                                {/* Skill icons matching code tags */}
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="text-[#FB3641]">
                                        {sk.id === "SK1" && <CpuIcon size={32} className="animate-pulse" />}
                                        {sk.id === "SK2" && <SlidersIcon size={32} />}
                                        {sk.id === "SK3" && <LayoutIcon size={32} />}
                                        {sk.id === "SK4" && <ShieldIcon size={32} />}
                                        {sk.id === "SK5" && <VideoIcon size={32} />}
                                    </div>
                                    <span className="text-[9px] text-[#84958a] uppercase font-bold tracking-widest">{sk.tag}</span>
                                </div>

                                <h3 className="font-display font-bold text-lg text-white uppercase mb-4 tracking-tighter">
                                    {sk.name}
                                </h3>

                                <p className="text-[11px] text-[#b9cbbf] mb-6 leading-relaxed select-text min-h-[50px]">
                                    {sk.description}
                                </p>

                                {/* Allocated specification bullet indicators */}
                                <ul className="space-y-2 text-[9px] text-[#b9cbbf] tracking-widest font-mono">
                                    {sk.stats.map((stat, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#FB3641]"></span>
                                            {stat.name}: <span className="text-white font-bold">{stat.value}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        );
                    })}
                </div>
            </div>


        </section>



    );
};

export default memo(Capabilities);
