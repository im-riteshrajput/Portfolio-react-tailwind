import { memo } from "react";

// ─── EDUCATION DATA ────────────────────────────────────────────────
// Update this array with your actual education details.
const EDUCATION = [
    {
        id: "EDU_01",
        // codename: "PRIMARY_TRAINING",
        degree: "PRIMARY EDUCATION",
        // field: "Hybrid",
        institution: "OXFORD ENGLISH HIGHER SECONDARY SCHOOL",
        location: "UDHNA, SURAT, GUJARAT",
        duration: "2010 — 2017",
        status: "COMPLETED",
        // grade: "A+",
        highlights: [],
    },
    {
        id: "EDU_02",
        codename: "RECON_PHASE",
        degree: "Secondary EDUCATION",
        // field: "Science — PCM",
        institution: "OXFORD ENGLISH HIGHER SECONDARY SCHOOL",
        location: "UDHNA, SURAT, GUJARAT",
        duration: "2017 — 2022",
        status: "COMPLETED",
        // grade: "85%",
        highlights: [
            "STANDARD MATHEMATICS",
        ],
    },
    {
        id: "EDU_03",
        codename: "BOOT_SEQUENCE",
        degree: "DIPLOMA IN ENGINEERING",
        field: "COMPUTER ENGINEERING",
        institution: "BHAGWAN MAHAVIR POLYTECHNIC",
        location: "VESU, SURAT, GUJARAT",
        duration: "2022 — 2025",
        status: "COMPLETED",
        grade: "89.14%",
        highlights: [],
    },
    {
        id: "EDU_04",
        codename: "HIGHER_EDUCATION",
        degree: "BACHELOR OF TECHNOLOGY",
        field: "COMPUTER SCIENCE & ENGINEERING",
        institution: "ASHA M TARSADIA INSTITUTE OF COMPUTER SCIENCE & TECHNOLOGY",
        location: "BARDOLI, SURAT, Gujarat",
        duration: "2025 — 2028",
        status: "CONTINUING",
        grade: "90.7%",
        highlights: [

        ],
    },
];

// ─── INLINE SVG ICONS ──────────────────────────────────────────────
const GraduationCapIcon = ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
);

const BookIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const MapPinIcon = ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const CalendarIcon = ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const CheckCircleIcon = ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

// ─── KEYFRAME STYLES (injected once) ───────────────────────────────
const timelineStyles = `
@keyframes edu-pulse-ring {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
}
@keyframes edu-pulse-ring-slow {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
}
@keyframes edu-glow-flow {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 200%; }
}
@keyframes edu-data-stream {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
}
@keyframes edu-connector-dash {
    to { stroke-dashoffset: -12; }
}
@keyframes edu-node-rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}
`;

const Education = () => {
    return (
        <section
            className="py-16 sm:py-24 font-mono sticky top-0 z-20 min-h-screen flex flex-col justify-center px-2 sm:px-4 md:px-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #000000 0%, #060c14 50%, #0a1520 100%)' }}
        >
            {/* Inject keyframes */}
            <style>{timelineStyles}</style>

            {/* Ambient glow orbs */}
            <div className="absolute pointer-events-none" style={{ top: '20%', left: '8%', width: '440px', height: '440px', background: 'radial-gradient(circle, rgba(251,54,65,0.09) 0%, transparent 70%)', filter: 'blur(90px)' }}></div>
            <div className="absolute pointer-events-none" style={{ bottom: '10%', right: '12%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,226,157,0.07) 0%, transparent 70%)', filter: 'blur(90px)' }}></div>


            <div className="max-w-5xl mx-auto w-full relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 select-text">
                    <div className="flex items-center justify-center gap-2.5 mb-3">
                        <GraduationCapIcon size={18} className="text-[#FB3641] animate-pulse" />
                        <span className="text-[10px] text-[#FB3641] tracking-[0.3em] font-bold">
                            TRAINING_RECORDS
                        </span>
                        <GraduationCapIcon size={18} className="text-[#FB3641] animate-pulse" />
                    </div>
                    <h2 className="font-display font-black text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                        AGENT_TRAINING_LOG
                    </h2>
                    <p className="w-[90%] flex justify-center items-center mx-auto text-[9px] sm:text-xs text-[#84958a] mt-3 tracking-widest uppercase">
                        Formal training &mdash; academic operations &amp; field preparation
                    </p>
                </div>

                {/* Timeline Items */}
                <div className="relative space-y-10 sm:space-y-16">

                    {/* ═══ GLOWING MAIN TIMELINE LINE (Desktop — centered) ═══ */}
                    <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-[5]">
                        {/* Core line */}
                        <div
                            className="absolute inset-0 w-[2px] left-1/2 -translate-x-1/2"
                            style={{
                                background: 'linear-gradient(180deg, #FB3641 0%, #00e29d 50%, #FB3641 100%)',
                                backgroundSize: '100% 200%',
                                animation: 'edu-glow-flow 6s linear infinite',
                            }}
                        ></div>
                        {/* Glow bloom around line */}
                        <div
                            className="absolute inset-0 w-[12px] left-1/2 -translate-x-1/2"
                            style={{
                                background: 'linear-gradient(180deg, rgba(251,54,65,0.3) 0%, rgba(0,226,157,0.25) 50%, rgba(251,54,65,0.3) 100%)',
                                backgroundSize: '100% 200%',
                                animation: 'edu-glow-flow 6s linear infinite',
                                filter: 'blur(6px)',
                            }}
                        ></div>
                        {/* Wider soft glow */}
                        <div
                            className="absolute inset-0 w-[40px] left-1/2 -translate-x-1/2"
                            style={{
                                background: 'linear-gradient(180deg, rgba(251,54,65,0.08) 0%, rgba(0,226,157,0.06) 50%, rgba(251,54,65,0.08) 100%)',
                                backgroundSize: '100% 200%',
                                animation: 'edu-glow-flow 6s linear infinite',
                                filter: 'blur(16px)',
                            }}
                        ></div>
                        {/* Streaming data particles */}
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[30px]"
                                style={{
                                    background: 'linear-gradient(180deg, transparent, #00e29d, transparent)',
                                    animation: `edu-data-stream ${3 + i * 1.5}s linear ${i * 1.2}s infinite`,
                                    opacity: 0.6,
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* ═══ GLOWING MAIN TIMELINE LINE (Mobile — left-aligned) ═══ */}
                    <div className="sm:hidden absolute left-[23px] top-0 bottom-0 pointer-events-none z-[5]">
                        <div
                            className="absolute inset-0 w-[2px] left-1/2 -translate-x-1/2"
                            style={{
                                background: 'linear-gradient(180deg, #FB3641 0%, #00e29d 50%, #FB3641 100%)',
                                backgroundSize: '100% 200%',
                                animation: 'edu-glow-flow 6s linear infinite',
                            }}
                        ></div>
                        <div
                            className="absolute inset-0 w-[10px] left-1/2 -translate-x-1/2"
                            style={{
                                background: 'linear-gradient(180deg, rgba(251,54,65,0.25) 0%, rgba(0,226,157,0.2) 50%, rgba(251,54,65,0.25) 100%)',
                                backgroundSize: '100% 200%',
                                animation: 'edu-glow-flow 6s linear infinite',
                                filter: 'blur(5px)',
                            }}
                        ></div>
                        {[0, 1].map(i => (
                            <div
                                key={i}
                                className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[20px]"
                                style={{
                                    background: 'linear-gradient(180deg, transparent, #00e29d, transparent)',
                                    animation: `edu-data-stream ${3 + i * 2}s linear ${i * 1.5}s infinite`,
                                    opacity: 0.5,
                                }}
                            ></div>
                        ))}
                    </div>
                    {EDUCATION.map((edu, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={edu.id}
                                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                            >
                                {/* ═══ DESKTOP TIMELINE NODE ═══ */}
                                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                                    {/* Outer rotating ring */}
                                    <div
                                        className="absolute w-12 h-12 rounded-full border border-dashed"
                                        style={{
                                            borderColor: 'rgba(251, 54, 65, 0.2)',
                                            animation: 'edu-node-rotate 12s linear infinite',
                                            left: '50%',
                                            top: '50%',
                                        }}
                                    ></div>
                                    {/* Pulse ring 1 */}
                                    <div
                                        className="absolute w-6 h-6 rounded-full border-2 border-[#FB3641]/40"
                                        style={{
                                            animation: 'edu-pulse-ring 2.5s ease-out infinite',
                                            left: '50%',
                                            top: '50%',
                                        }}
                                    ></div>
                                    {/* Pulse ring 2 (delayed) */}
                                    <div
                                        className="absolute w-6 h-6 rounded-full border border-[#00e29d]/25"
                                        style={{
                                            animation: 'edu-pulse-ring-slow 4s ease-out 1s infinite',
                                            left: '50%',
                                            top: '50%',
                                        }}
                                    ></div>
                                    {/* Node body */}
                                    <div
                                        className="relative w-7 h-7 rounded-full flex items-center justify-center z-10"
                                        style={{
                                            background: 'radial-gradient(circle, #0a1520 40%, rgba(251,54,65,0.15) 100%)',
                                            border: '2px solid rgba(251,54,65,0.6)',
                                            boxShadow: '0 0 12px rgba(251,54,65,0.3), 0 0 30px rgba(251,54,65,0.1), inset 0 0 8px rgba(251,54,65,0.1)',
                                        }}
                                    >
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FB3641] animate-pulse"
                                            style={{ boxShadow: '0 0 6px rgba(251,54,65,0.8)' }}
                                        ></div>
                                    </div>
                                    {/* Phase label on node */}
                                    <div className={`absolute top-full mt-2 whitespace-nowrap ${isLeft ? '' : ''}`}>
                                        <span className="text-[7px] text-[#FB3641]/50 tracking-[0.2em] font-bold uppercase">{edu.duration.split('—')[0].trim()}</span>
                                    </div>
                                </div>

                                {/* ═══ HORIZONTAL CONNECTOR ARM (Desktop) ═══ */}
                                <div className={`hidden sm:block absolute top-1/2 z-[6] ${isLeft ? 'right-1/2 mr-[14px]' : 'left-1/2 ml-[14px]'}`}
                                    style={{ width: 'calc(2rem)', height: '2px' }}
                                >
                                    <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute top-1/2 -translate-y-1/2">
                                        <line x1="0" y1="10" x2="100" y2="10"
                                            stroke="rgba(251,54,65,0.35)"
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                            style={{ animation: 'edu-connector-dash 1s linear infinite' }}
                                        />
                                    </svg>
                                    {/* Arrow tip */}
                                    <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 ${isLeft ? 'right-0 border-r-0 border-l-[6px] border-l-[#FB3641]/50' : 'left-0 border-l-0 border-r-[6px] border-r-[#FB3641]/50'}`}
                                        style={{
                                            borderTop: '4px solid transparent',
                                            borderBottom: '4px solid transparent',
                                        }}
                                    ></div>
                                </div>

                                {/* ═══ MOBILE TIMELINE NODE ═══ */}
                                <div className="sm:hidden absolute left-[23px] top-3 z-20 flex items-center justify-center -translate-x-1/2">
                                    {/* Pulse ring */}
                                    <div
                                        className="absolute w-5 h-5 rounded-full border border-[#FB3641]/30"
                                        style={{
                                            animation: 'edu-pulse-ring 2.5s ease-out infinite',
                                            left: '50%',
                                            top: '50%',
                                        }}
                                    ></div>
                                    {/* Node body */}
                                    <div
                                        className="relative w-5 h-5 rounded-full flex items-center justify-center z-10"
                                        style={{
                                            background: 'radial-gradient(circle, #0a1520 40%, rgba(251,54,65,0.15) 100%)',
                                            border: '2px solid rgba(251,54,65,0.6)',
                                            boxShadow: '0 0 8px rgba(251,54,65,0.3), 0 0 20px rgba(251,54,65,0.1)',
                                        }}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FB3641] animate-pulse"
                                            style={{ boxShadow: '0 0 4px rgba(251,54,65,0.8)' }}
                                        ></div>
                                    </div>
                                </div>

                                {/* ═══ CARD ═══ */}
                                <div className={`w-full sm:w-[calc(50%-3.5rem)] ${isLeft ? "sm:pr-0" : "sm:pl-0"} pl-14 sm:pl-0`}>
                                    <div
                                        className="group relative p-5 sm:p-6 rounded-lg border border-white/10 hover:border-[#FB3641]/40 transition-all duration-400 cursor-default hover:scale-[1.01]"
                                        style={{
                                            background: 'rgba(10, 20, 30, 0.5)',
                                            backdropFilter: 'blur(20px)',
                                            WebkitBackdropFilter: 'blur(20px)',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                                        }}
                                    >
                                        {/* Card glow on hover */}
                                        <div className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(251,54,65,0.1) 0%, transparent 40%, transparent 60%, rgba(0,226,157,0.08) 100%)',
                                                filter: 'blur(8px)',
                                            }}
                                        ></div>

                                        {/* Corner tactical brackets */}
                                        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300"></div>
                                        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300"></div>
                                        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300"></div>
                                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300"></div>

                                        {/* Scan line on hover */}
                                        <div className="absolute left-0 right-0 h-[1px] bg-[#00e29d] opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none z-10"
                                            style={{ boxShadow: '0 0 8px rgba(0,226,157,0.6)', top: '50%' }}
                                        ></div>

                                        {/* Top row: ID + Status */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[8px] text-[#FB3641]/60 font-bold tracking-widest">{edu.id}</span>
                                                <span className="text-[7px] text-[#84958a]/30">●</span>
                                                <span className="text-[8px] text-[#84958a]/40 tracking-widest font-bold">PHASE_{String(index + 1).padStart(2, '0')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
                                                style={{
                                                    background: edu.status === "COMPLETED" ? 'rgba(0,226,157,0.08)' : 'rgba(251,54,65,0.08)',
                                                    border: edu.status === "COMPLETED" ? '1px solid rgba(0,226,157,0.15)' : '1px solid rgba(251,54,65,0.15)',
                                                }}
                                            >
                                                <CheckCircleIcon size={9} className={edu.status === "COMPLETED" ? "text-[#00e29d]" : "text-[#FB3641]"} />
                                                <span className={`text-[7px] font-bold tracking-widest uppercase ${edu.status === "COMPLETED" ? "text-[#00e29d]" : "text-[#FB3641]"}`}>
                                                    {edu.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Codename */}
                                        <span className="text-[8px] text-[#FB3641] tracking-[0.2em] font-bold uppercase block mb-1.5">
                                            {edu.codename}
                                        </span>

                                        {/* Degree */}
                                        <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tighter mb-1 group-hover:text-[#FB3641] transition-colors duration-300">
                                            {edu.degree}
                                        </h3>

                                        {/* Field of study */}
                                        <p className="text-[11px] text-[#b9cbbf] mb-4 tracking-wide">
                                            {edu.field}
                                        </p>

                                        {/* Institution + Location + Duration */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2">
                                                <BookIcon size={11} className="text-[#84958a]/60 flex-shrink-0" />
                                                <span className="text-[9px] text-[#84958a] tracking-widest uppercase font-bold">
                                                    {edu.institution}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPinIcon size={10} className="text-[#84958a]/50 flex-shrink-0" />
                                                    <span className="text-[8px] text-[#84958a]/70 tracking-widest uppercase font-bold">
                                                        {edu.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon size={10} className="text-[#84958a]/50 flex-shrink-0" />
                                                    <span className="text-[8px] text-[#84958a]/70 tracking-widest uppercase font-bold">
                                                        {edu.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Grade badge */}
                                        {edu.grade && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-4"
                                                style={{
                                                    background: 'rgba(0,226,157,0.06)',
                                                    border: '1px solid rgba(0,226,157,0.12)',
                                                    boxShadow: '0 0 12px rgba(0,226,157,0.05)',
                                                }}
                                            >
                                                <span className="text-[8px] text-[#84958a] tracking-widest uppercase font-bold">GRADE:</span>
                                                <span className="text-[10px] text-[#00e29d] tracking-widest uppercase font-bold"
                                                    style={{ textShadow: '0 0 8px rgba(0,226,157,0.4)' }}
                                                >{edu.grade}</span>
                                            </div>
                                        )}

                                        {/* Highlight modules / subjects */}
                                        {edu.highlights.length > 0 && (
                                            <div className="pt-3 border-t border-white/5">
                                                <span className="text-[7px] text-[#84958a]/50 tracking-[0.3em] uppercase font-bold block mb-2">
                                                    KEY_MODULES
                                                </span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {edu.highlights.map((h, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-0.5 text-[7px] font-bold tracking-widest uppercase rounded-sm transition-all duration-300 group-hover:border-[#00e29d]/20 group-hover:text-[#00e29d]/80"
                                                            style={{
                                                                background: 'rgba(251, 54, 65, 0.05)',
                                                                border: '1px solid rgba(251, 54, 65, 0.12)',
                                                                color: 'rgba(251, 54, 65, 0.6)',
                                                            }}
                                                        >
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom tactical dots */}
                                        <div className="mt-4 flex items-center justify-end">
                                            <div className="flex gap-1">
                                                <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300"></span>
                                                <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-75"></span>
                                                <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-150"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for the other side */}
                                <div className="hidden sm:block sm:w-[calc(50%-3.5rem)]"></div>
                            </div>
                        );
                    })}

                    {/* ═══ TERMINAL NODE at the bottom of timeline ═══ */}
                    <div className="relative flex justify-center sm:justify-center">
                        {/* Desktop terminal node */}
                        {/* <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2">
                            <div
                                className="w-4 h-4 rotate-45"
                                style={{
                                    background: '#00e29d',
                                    boxShadow: '0 0 12px rgba(0,226,157,0.5), 0 0 30px rgba(0,226,157,0.2)',
                                }}
                            ></div>
                            <span className="text-[7px] text-[#00e29d]/60 tracking-[0.3em] font-bold mt-1">END_LOG</span>
                        </div> */}
                        {/* Mobile terminal node */}
                        {/* <div className="sm:hidden absolute left-[23px] -translate-x-1/2 z-20 flex flex-col items-center gap-1">
                            <div
                                className="w-3 h-3 rotate-45"
                                style={{
                                    background: '#00e29d',
                                    boxShadow: '0 0 8px rgba(0,226,157,0.5), 0 0 20px rgba(0,226,157,0.2)',
                                }}
                            ></div>
                        </div> */}
                    </div>
                </div>

                {/* Bottom summary bar */}
                {/* <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-sm"
                        style={{
                            background: 'rgba(10, 20, 30, 0.6)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e29d] animate-pulse"></span>
                        <span className="text-[9px] text-[#84958a] tracking-widest uppercase font-bold">
                            TRAINING_PHASES: <span className="text-white">{EDUCATION.length}</span>
                        </span>
                        <span className="text-[8px] text-[#84958a]/40">|</span>
                        <span className="text-[9px] text-[#84958a] tracking-widest uppercase font-bold">
                            ALL_PHASES: <span className="text-[#00e29d]" style={{ textShadow: '0 0 6px rgba(0,226,157,0.4)' }}>CLEARED</span>
                        </span>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default memo(Education);
