import { useState, forwardRef, memo } from "react";

// Global AudioContext to prevent memory leak crashes (browsers limit to 6 contexts)
let audioCtx = null;

const getAudioContext = () => {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    // Resume if suspended (browser autoplay policy)
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

// Sound synthesis utilizing the Web Audio API for tactical cyber soundscapes
const playSound = (type) => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        if (type === "click") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(700, now + 0.04);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start();
            osc.stop(now + 0.04);
        } else if (type === "hover") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(1800, now);
            gain.gain.setValueAtTime(0.008, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
            osc.start();
            osc.stop(now + 0.015);
        } else if (type === "deploy") {
            // Sci-fi power charge-up synth swell
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);

            filter.type = "lowpass";
            filter.Q.setValueAtTime(8, now);
            filter.frequency.setValueAtTime(180, now);
            filter.frequency.exponentialRampToValueAtTime(2500, now + 0.4);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.04, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

            osc.start();
            osc.stop(now + 0.4);
        } else if (type === "logs") {
            // Rapid keystroke/logs data sweep cascade
            [400, 600, 800, 1000].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + idx * 0.05);
                gain.gain.setValueAtTime(0.015, now + idx * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.045);
                osc.start(now + idx * 0.05);
                osc.stop(now + idx * 0.05 + 0.045);
            });
        }
    } catch (e) {
        // Safe fall-through if Audio Context is blocked by browser interaction rules
    }
};

const Profile = forwardRef((props, ref) => {
    const { isMobile } = props;
    const [activeTab, setActiveTab] = useState("LOADOUT");
    const [deployedStatus, setDeployedStatus] = useState("STANDBY");
    const [logsActive, setLogsActive] = useState(false);

    const handleDeploy = () => {
        playSound("deploy");
        setDeployedStatus("ACTIVE_DEPLOYMENT");
        setTimeout(() => {
            setDeployedStatus("OPERATIONAL");
        }, 2000);
    };

    const handleLogsClick = () => {
        playSound("logs");
        setLogsActive(!logsActive);
    };

    return (
        <section
            ref={ref}
            className={`${props.className || ""} w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:h-[50vh] pt-10 md:h-screen md:py-0 flex justify-center items-center relative overflow-hidden sticky top-0 z-[25] border-t border-[#00e29d]/10`}
        >

            {/*ID Card + Telemetry Box */}
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 items-center h-full">

                {/* Card landing zone — visible on desktop only, hidden on mobile */}
                <div className="hidden md:flex md:col-span-2 justify-center items-center h-full py-4">
                </div>

                {/* 3. Agent Details & Stats Column */}
                <div className="md:col-span-3 flex flex-col justify-center select-text">

                    {/* Dynamic Sub-Tab Rendering */}
                    {activeTab === "LOADOUT" && (
                        <div>

                            {/* Telemetry Header */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 rounded border border-[#FB3641]/40 flex items-center justify-center text-[#FB3641] bg-[#FB3641]/5">
                                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                                        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="w-2 h-2 inline-block bg-[#FB3641] rounded-full mr-1 animate-pulse"></span>
                                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight inline-block align-middle">
                                        AGENT_PROFILE
                                    </h2>
                                </div>
                            </div>

                            {/* Tactical Description Panel */}
                            <div className="p-4 bg-[#FB3641]/10 border-l-4 border-r border-[#FB3641] border-r-[#FB3641]/30 text-[13px] sm:text-[15px] text-[#b9cbbf] mb-6 leading-relaxed relative rounded-r shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                                <div className="absolute top-0 right-0 w-2 h-2 bg-[#00e29d]/40"></div>
                                I am a Full Stack Developer and Video Editor who brings ideas to life from the backend to the screen. Whether I am architecting scalable web applications or cutting dynamic video content, I build digital experiences that work perfectly and look amazing."
                            </div>






                        </div>
                    )}

                    {activeTab === "DASHBOARD" && (
                        <div>
                            {/* Dashboard Header */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 rounded border border-[#00e29d]/40 flex items-center justify-center text-[#00e29d] bg-[#00e29d]/5">
                                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H6v-2h8v2zm4-4H6v-2h12v2zm0-4H6V7h12v2z" />
                                    </svg>
                                </div>
                                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                                    OPERATIVE_DASHBOARD
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="p-4 bg-[#0a141e]/50 border-l-4 border-r border-[#00e29d] border-r-[#00e29d]/30 text-[11px] sm:text-xs text-[#b9cbbf] mb-6 leading-relaxed relative rounded-r shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                                Central tactical hub. Real-time monitoring of active nodes, system memory pools, and server deployment status. Security integrity remains stable at standard threshold.
                            </div>

                            {/* Stats List */}
                            <div className="mb-6 space-y-4">
                                <div className="flex justify-between items-center text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                                    <span className="text-white">SYSTEM_RESOURCES</span>
                                    <span className="text-[#00e29d]">METRICS_STABLE</span>
                                </div>

                                <div className="space-y-3.5 border-t border-[#00e29d]/10 pt-4">
                                    {/* CPU LOAD */}
                                    <div>
                                        <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mb-1.5">
                                            <span className="text-[#b9cbbf]">CPU_LOAD</span>
                                            <span className="text-[#00e29d]">42%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-[#07131b] border border-[#00e29d]/20 rounded-full overflow-hidden p-0.5">
                                            <div className="h-full bg-[#00e29d] rounded-full shadow-[0_0_10px_rgba(0,226,157,0.6)]" style={{ width: "42%" }}></div>
                                        </div>
                                    </div>

                                    {/* MEMORY USAGE */}
                                    <div>
                                        <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mb-1.5">
                                            <span className="text-[#b9cbbf]">MEMORY_POOL</span>
                                            <span className="text-[#00e29d]">67%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-[#07131b] border border-[#00e29d]/20 rounded-full overflow-hidden p-0.5">
                                            <div className="h-full bg-[#00e29d] rounded-full shadow-[0_0_10px_rgba(0,226,157,0.6)]" style={{ width: "67%" }}></div>
                                        </div>
                                    </div>

                                    {/* SECURE TUNNELS */}
                                    <div>
                                        <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mb-1.5">
                                            <span className="text-[#b9cbbf]">SECURE_TUNNELS</span>
                                            <span className="text-[#00e29d]">80% [8/10 ACTIVE]</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-[#07131b] border border-[#00e29d]/20 rounded-full overflow-hidden p-0.5">
                                            <div className="h-full bg-[#00e29d] rounded-full shadow-[0_0_10px_rgba(0,226,157,0.6)]" style={{ width: "80%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={() => playSound("click")}
                                    onMouseEnter={() => playSound("hover")}
                                    className="px-6 py-3.5 bg-[#00e29d] text-black font-bold tracking-wider text-[9px] sm:text-xs uppercase active:scale-95 duration-100 cursor-pointer shadow-[0_0_15px_rgba(0,226,157,0.2)]"
                                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                                >
                                    DIAGNOSTICS
                                </button>
                                <button
                                    onClick={() => playSound("click")}
                                    onMouseEnter={() => playSound("hover")}
                                    className="px-6 py-3.5 border border-[#00e29d] text-[#00e29d] hover:bg-[#00e29d]/10 font-bold tracking-wider text-[9px] sm:text-xs uppercase active:scale-95 duration-100 cursor-pointer"
                                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                                >
                                    NETWORK_MAP
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "RANK_STATS" && (
                        <div>
                            {/* Rank Stats Header */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 rounded border border-[#00e29d]/40 flex items-center justify-center text-[#00e29d] bg-[#00e29d]/5">
                                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                                    </svg>
                                </div>
                                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                                    COMPETITIVE_STATS
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="p-4 bg-[#0a141e]/50 border-l-4 border-r border-[#00e29d] border-r-[#00e29d]/30 text-[11px] sm:text-xs text-[#b9cbbf] mb-6 leading-relaxed relative rounded-r shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                                Ranked competitive history inside the high-stakes cyber network. Currently holding the RADIANT operational tier. Match history shows consecutive tactical successes.
                            </div>

                            {/* Stats List */}
                            <div className="mb-6 space-y-4">
                                <div className="flex justify-between items-center text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                                    <span className="text-white">SEASON_METRICS</span>
                                    <span className="text-[#00e29d]">TIER: RADIANT (TOP 0.1%)</span>
                                </div>

                                <div className="space-y-3.5 border-t border-[#00e29d]/10 pt-4">
                                    {/* WIN RATE */}
                                    <div>
                                        <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mb-1.5">
                                            <span className="text-[#b9cbbf]">WIN_RATE</span>
                                            <span className="text-[#00e29d]">76%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-[#07131b] border border-[#00e29d]/20 rounded-full overflow-hidden p-0.5">
                                            <div className="h-full bg-[#00e29d] rounded-full shadow-[0_0_10px_rgba(0,226,157,0.6)]" style={{ width: "76%" }}></div>
                                        </div>
                                    </div>

                                    {/* ACCURACY */}
                                    <div>
                                        <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mb-1.5">
                                            <span className="text-[#b9cbbf]">ACCURACY_INDEX</span>
                                            <span className="text-[#00e29d]">84%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-[#07131b] border border-[#00e29d]/20 rounded-full overflow-hidden p-0.5">
                                            <div className="h-full bg-[#00e29d] rounded-full shadow-[0_0_10px_rgba(0,226,157,0.6)]" style={{ width: "84%" }}></div>
                                        </div>
                                    </div>

                                    {/* COMBAT SCORE */}
                                    <div>
                                        <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mb-1.5">
                                            <span className="text-[#b9cbbf]">COMBAT_SCORE</span>
                                            <span className="text-[#00e29d]">320/400 (HIGH RATING)</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-[#07131b] border border-[#00e29d]/20 rounded-full overflow-hidden p-0.5">
                                            <div className="h-full bg-[#00e29d] rounded-full shadow-[0_0_10px_rgba(0,226,157,0.6)]" style={{ width: "80%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={() => playSound("click")}
                                    onMouseEnter={() => playSound("hover")}
                                    className="px-6 py-3.5 bg-[#00e29d] text-black font-bold tracking-wider text-[9px] sm:text-xs uppercase active:scale-95 duration-100 cursor-pointer shadow-[0_0_15px_rgba(0,226,157,0.2)]"
                                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                                >
                                    LEADERBOARD
                                </button>
                                <button
                                    onClick={() => playSound("click")}
                                    onMouseEnter={() => playSound("hover")}
                                    className="px-6 py-3.5 border border-[#00e29d] text-[#00e29d] hover:bg-[#00e29d]/10 font-bold tracking-wider text-[9px] sm:text-xs uppercase active:scale-95 duration-100 cursor-pointer"
                                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                                >
                                    MATCH_RECORDS
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "HISTORY" && (
                        <div>
                            {/* History Header */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 rounded border border-[#00e29d]/40 flex items-center justify-center text-[#00e29d] bg-[#00e29d]/5">
                                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                                    </svg>
                                </div>
                                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                                    DEPLOYMENT_HISTORY
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="p-4 bg-[#0a141e]/50 border-l-4 border-r border-[#00e29d] border-r-[#00e29d]/30 text-[11px] sm:text-xs text-[#b9cbbf] mb-6 leading-relaxed relative rounded-r shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                                Historical log of high-profile operations. Executed tactical infiltration, database extractions, and network security bypasses. All traces successfully purged.
                            </div>

                            {/* History Logs list layout */}
                            <div className="mb-6 border-t border-[#00e29d]/10 pt-4 space-y-3.5 max-h-[190px] overflow-y-auto pr-2">
                                {[
                                    { op: "OP_STEALTH_NIGHT", desc: "Digital vault infiltration & data extraction", status: "100% SUCCESS", color: "text-[#00e29d]" },
                                    { op: "OP_DATABASE_SHIELD", desc: "Core database encryption integrity deployment", status: "95% SECURED", color: "text-[#00e29d]" },
                                    { op: "OP_CYBER_ENCRYPT", desc: "Zero-trust proxy gateway bypass security drill", status: "100% INFILTRATED", color: "text-[#00e29d]" }
                                ].map((log, index) => (
                                    <div key={index} className="p-3 bg-[#0a141e]/30 border border-[#00e29d]/10 rounded flex justify-between items-center hover:bg-[#00e29d]/5 hover:border-[#00e29d]/25 transition-all">
                                        <div>
                                            <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase">{log.op}</h4>
                                            <p className="text-[8px] sm:text-[9px] text-[#84958a] mt-0.5">{log.desc}</p>
                                        </div>
                                        <span className={`text-[8px] sm:text-[10px] font-bold tracking-widest ${log.color}`}>{log.status}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={() => playSound("click")}
                                    onMouseEnter={() => playSound("hover")}
                                    className="px-6 py-3.5 bg-[#00e29d] text-black font-bold tracking-wider text-[9px] sm:text-xs uppercase active:scale-95 duration-100 cursor-pointer shadow-[0_0_15px_rgba(0,226,157,0.2)]"
                                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                                >
                                    DOWNLOAD_ARCHIVE
                                </button>
                                <button
                                    onClick={() => playSound("click")}
                                    onMouseEnter={() => playSound("hover")}
                                    className="px-6 py-3.5 border border-[#FB3641] text-[#FB3641] hover:bg-[#FB3641]/10 font-bold tracking-wider text-[9px] sm:text-xs uppercase active:scale-95 duration-100 cursor-pointer"
                                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                                >
                                    PURGE_LOGS
                                </button>
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
});

Profile.displayName = "Profile";

export default memo(Profile);