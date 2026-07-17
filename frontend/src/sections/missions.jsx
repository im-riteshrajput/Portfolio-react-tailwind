import { memo, useState, useCallback, useEffect } from "react";
import stationaryPro from "../assets/img/stationary-pro.png";
import hrmsbim from "../assets/img/hrmsbim.png";
import mission3 from "../assets/img/mission_3.png";
import reel02Thumb from "../assets/img/reel_02_thumb.jpg";
import reel03Thumb from "../assets/img/reel_03_thumb.jpg";
import reel04Thumb from "../assets/img/reel_04_thumb.jpg";
import reel05Thumb from "../assets/img/reel_05_thumb.jpg";

const MISSIONS = [
    {
        id: "OP_01",
        codename: "STATIONARY_PRO",
        title: "Stationary Pro",
        owner: "Ritesh Rajput",
        url: "https://stationary-pro.onrender.com/index.html",
        image: stationaryPro,
        status: "COMPLETED",
    },
    {
        id: "OP_02",
        codename: "HRMS_BIMFROX",
        title: "HRMS Dashboard — Bimfrox",
        owner: "Bimfrox Pvt. Ltd.",
        url: "https://bimfrox-management.vercel.app/",
        image: hrmsbim,
        status: "DEPLOYED",
    },
];

// Video reels / editing samples — replace placeholder URLs with real embed links
const VIDEO_REELS = [
    {
        id: "REEL_01",
        title: "GAMING & INFORMATIONAL",
        // For YouTube: use embed URL like "https://www.youtube.com/embed/VIDEO_ID"
        // For Instagram: use embed URL like "https://www.instagram.com/reel/REEL_ID/embed"
        embedUrl: "https://www.youtube.com/embed/ApspfWIN6SI?si=tKp7jrZPHVJe2TTO",
        type: "youtube", // "youtube" | "instagram"
        orientation: "portrait", // "landscape" | "portrait"
        status: "DEPLOYED",
    },
    {
        id: "REEL_02",
        title: "STOCK-VIEW & STORYTELLING",
        embedUrl: "https://www.instagram.com/reel/DapvwZqMmCt/embed",
        thumbnail: reel02Thumb,
        type: "instagram",
        orientation: "portrait",
        status: "DEPLOYED",
    },
    {
        id: "REEL_03",
        title: "TRAVEL & FLASH EDIT",
        embedUrl: "https://www.instagram.com/reel/DTP9_WnEoMA/embed",
        thumbnail: reel03Thumb,
        type: "instagram",
        orientation: "portrait",
        status: "DEPLOYED",
    },
    {
        id: "REEL_04",
        title: "TRAVEL & SOFt EDIT",
        embedUrl: "https://www.instagram.com/reel/DTxd3tIjEvk/embed",
        thumbnail: reel04Thumb,
        type: "instagram",
        orientation: "portrait",
        status: "DEPLOYED",
    },
    {
        id: "REEL_05",
        title: "TRAVEL & BEAT SYNC",
        embedUrl: "https://www.instagram.com/reel/DW_c8y1vxju/embed",
        thumbnail: reel05Thumb,
        type: "instagram",
        orientation: "portrait",
        status: "DEPLOYED",
    },
    {
        id: "VIDEO_01",
        title: "GAMING & INFORMATIONAL 1",
        embedUrl: "https://www.youtube.com/embed/_eE7vY1JCSk?si=9c3z1bLDrIKeV2Zi",
        type: "youtube",
        orientation: "landscape",
        status: "DEPLOYED",
    },
    {
        id: "VIDEO_02",
        title: "GAMING & INFORMATIONAL 2",
        embedUrl: "https://www.youtube.com/embed/iSC3E2LB0Jo?si=LNffjDFHf-G6Nc9v",
        type: "youtube",
        orientation: "landscape",
        status: "DEPLOYED",
    },
];

export { MISSIONS, VIDEO_REELS };

// Inline tactical SVG icons
const ExternalLinkIcon = ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const CrosshairIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
);

const PlayIcon = ({ size = 40, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8 5v14l11-7z" />
    </svg>
);

const FilmIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
);

const CloseIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ─── VIDEO LIGHTBOX MODAL ──────────────────────────────────────────
const VideoLightboxModal = ({ reel, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [onClose]);

    if (!reel) return null;

    const isPortrait = reel.orientation === "portrait";

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" style={{ WebkitBackdropFilter: 'blur(12px)' }}></div>

            {/* Modal Content */}
            <div
                className="relative z-10 flex flex-col items-center"
                style={{
                    width: isPortrait ? 'min(380px, 90vw)' : 'min(900px, 90vw)',
                    maxHeight: '90vh',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header bar */}
                <div className="w-full flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#00e29d] animate-pulse"></span>
                        <span className="text-[10px] text-[#FB3641] tracking-[0.2em] font-bold font-mono uppercase">
                            {reel.id}
                        </span>
                        <span className="text-[10px] text-[#84958a]/50 font-mono">|</span>
                        <span className={`text-[10px] tracking-widest font-bold font-mono uppercase ${reel.type === 'youtube' ? 'text-red-400' : 'text-pink-400'
                            }`}>
                            {reel.type === 'youtube' ? '▶ YOUTUBE' : '◎ INSTAGRAM'}
                        </span>
                        <span className="text-[10px] text-[#84958a]/50 font-mono">|</span>
                        <span className="text-[10px] text-[#84958a] tracking-widest font-bold font-mono uppercase">
                            {isPortrait ? 'PORTRAIT' : 'LANDSCAPE'}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-sm border border-white/10 hover:border-[#FB3641]/50 hover:bg-[#FB3641]/10 transition-all duration-200 cursor-pointer"
                        style={{ background: 'rgba(10, 20, 30, 0.6)' }}
                        aria-label="Close video"
                    >
                        <CloseIcon size={16} className="text-[#84958a] hover:text-white" />
                    </button>
                </div>

                {/* Video container */}
                <div
                    className="relative w-full rounded-lg border border-white/10 overflow-hidden"
                    style={{
                        aspectRatio: isPortrait ? '9 / 16' : '16 / 9',
                        maxHeight: isPortrait ? '75vh' : 'none',
                        background: 'rgba(10, 20, 30, 0.5)',
                        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(251, 54, 65, 0.08)',
                    }}
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00e29d] z-20"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00e29d] z-20"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00e29d] z-20"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00e29d] z-20"></div>

                    {reel.embedUrl ? (
                        <iframe
                            src={reel.embedUrl}
                            title={reel.title}
                            className="w-full h-full absolute inset-0"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                            <FilmIcon size={56} className="text-[#84958a]/30" />
                            <span className="text-[10px] text-[#84958a]/40 tracking-widest font-bold font-mono uppercase">
                                FOOTAGE_UNAVAILABLE
                            </span>
                        </div>
                    )}

                    {/* Scanlines overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>
                </div>

                {/* Footer info */}
                <div className="w-full flex items-center justify-between mt-4 px-2">
                    <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tighter font-mono">
                        {reel.title}
                    </h3>
                    <span className="text-[9px] text-[#00e29d] tracking-widest font-bold font-mono uppercase">
                        NOW_PLAYING
                    </span>
                </div>
            </div>
        </div>
    );
};
const getThumbnailUrl = (reel) => {
    if (reel.thumbnail) return reel.thumbnail;

    if (reel.type === 'youtube' && reel.embedUrl) {
        const match = reel.embedUrl.match(/\/embed\/([^?]+)/);
        if (match && match[1]) {
            return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
        }
    }

    if (reel.type === 'instagram' && reel.embedUrl) {
        const match = reel.embedUrl.match(/instagram\.com\/(?:reel|p)\/([^/?]+)/);
        if (match && match[1]) {
            return `https://www.instagram.com/p/${match[1]}/media/?size=l`;
        }
    }

    return null;
};

const Missions = () => {
    const [lightboxReel, setLightboxReel] = useState(null);

    const openLightbox = useCallback((reel) => {
        if (!reel.embedUrl) return;
        setLightboxReel(reel);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxReel(null);
    }, []);

    // Split reels into portrait (shorts) and landscape rows
    const portraitReels = VIDEO_REELS.filter(r => r.orientation === "portrait");
    const landscapeReels = VIDEO_REELS.filter(r => r.orientation === "landscape");

    // Reusable card renderer
    const renderReelCard = (reel) => {
        const isPortrait = reel.orientation === "portrait";
        const hasUrl = Boolean(reel.embedUrl);
        const thumbnailUrl = getThumbnailUrl(reel);

        return (
            <div
                key={reel.id}
                className={`group relative w-[95%] md:w-full justify-self-center rounded-lg border border-white/10 overflow-hidden transition-all duration-400 hover:border-[#FB3641]/50 ${hasUrl ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'
                    }`}
                style={{
                    background: 'rgba(10, 20, 30, 0.5)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                }}
                onClick={() => openLightbox(reel)}
            >
                {/* Corner tactical brackets */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>

                {/* Video Thumbnail Area */}
                <div
                    className={`relative overflow-hidden flex items-center justify-center w-full ${isPortrait ? '' : 'h-44 sm:h-48'}`}
                    style={{
                        aspectRatio: isPortrait ? '9 / 16' : 'auto',
                    }}
                >
                    {/* Dark tactical background (Always present as fallback) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(10,21,32,0.95) 0%, rgba(6,12,20,0.98) 50%, rgba(15,25,35,0.95) 100%)',
                        }}
                    ></div>

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(251,54,65,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251,54,65,0.08) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    ></div>

                    {thumbnailUrl && (
                        <>
                            <img
                                src={thumbnailUrl}
                                alt={reel.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-50"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextSibling) {
                                        e.target.nextSibling.style.display = 'none';
                                    }
                                }}
                            />
                            {/* Tactical color overlay on thumbnail */}
                            <div className="absolute inset-0 bg-[#060c14]/30 mix-blend-multiply pointer-events-none"></div>
                        </>
                    )}

                    {/* Center play button */}
                    <div className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-300 ${hasUrl ? 'group-hover:scale-110' : 'opacity-50'
                        }`}>
                        <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${hasUrl
                                ? 'border-[#FB3641]/60 group-hover:border-[#00e29d] group-hover:shadow-[0_0_30px_rgba(0,226,157,0.3)]'
                                : 'border-white/10'
                                }`}
                            style={{
                                background: hasUrl
                                    ? 'rgba(251,54,65,0.12)'
                                    : 'rgba(255,255,255,0.03)',
                            }}
                        >
                            <PlayIcon
                                size={28}
                                className={`transition-colors duration-300 ${hasUrl
                                    ? 'text-[#FB3641] group-hover:text-[#00e29d]'
                                    : 'text-white/20'
                                    }`}
                            />
                        </div>
                        <span className={`text-[9px] tracking-[0.2em] font-bold uppercase ${hasUrl ? 'text-[#84958a]' : 'text-white/15'
                            }`}>
                            {hasUrl ? 'CLICK_TO_PLAY' : 'AWAITING_UPLOAD'}
                        </span>
                    </div>

                    {/* Scanlines overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>

                    {/* Reel ID overlay */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className="text-[8px] text-[#FB3641]/60 font-bold tracking-widest">{reel.id}</span>
                    </div>

                    {/* Orientation badge */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FB3641] animate-pulse"></span>
                        <span className="text-[8px] text-[#FB3641] font-bold tracking-widest uppercase">
                            {isPortrait ? 'SHORT' : 'LANDSCAPE'}
                        </span>
                    </div>

                    {/* Hover scan line */}
                    <div
                        className="absolute left-0 right-0 h-[1.5px] bg-[#00e29d] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: '0 0 8px rgba(0,226,157,0.8)', top: '50%', animation: 'scanSweep 3s linear infinite' }}
                    ></div>
                </div>

                {/* Card Footer / Metadata */}
                <div className="p-4 sm:p-5 relative">
                    {/* Type badge */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[8px] tracking-[0.2em] font-bold uppercase px-2 py-0.5 rounded-sm ${reel.type === 'youtube'
                            ? 'text-red-400 bg-red-400/10 border border-red-400/20'
                            : 'text-pink-400 bg-pink-400/10 border border-pink-400/20'
                            }`}>
                            {reel.type === 'youtube' ? '▶ YOUTUBE' : '◎ INSTAGRAM'}
                        </span>
                        <span className={`text-[8px] tracking-[0.15em] font-bold uppercase px-2 py-0.5 rounded-sm ${hasUrl
                            ? 'text-[#00e29d] bg-[#00e29d]/10 border border-[#00e29d]/20'
                            : 'text-[#84958a]/50 bg-white/3 border border-white/5'
                            }`}>
                            {hasUrl ? reel.status : 'PENDING'}
                        </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tighter mb-2 group-hover:text-[#FB3641] transition-colors duration-300">
                        {reel.title}
                    </h4>

                    {/* Bottom tactical line */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[8px] text-[#84958a]/60 tracking-widest uppercase">
                            {hasUrl ? 'CLICK_TO_PLAY' : 'LINK_PENDING'}
                        </span>
                        <div className="flex gap-1">
                            <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300"></span>
                            <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-75"></span>
                            <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-150"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <section
                className="py-16 sm:py-24 font-mono sticky top-0 z-20 flex flex-col px-2 sm:px-4 md:px-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #000000 0%, #060c14 50%, #0a1520 100%)' }}
            >
                {/* Ambient glow orbs */}
                <div className="absolute pointer-events-none" style={{ top: '15%', left: '5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(251,54,65,0.1) 0%, transparent 70%)', filter: 'blur(90px)' }}></div>
                <div className="absolute pointer-events-none" style={{ bottom: '20%', right: '8%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,226,157,0.08) 0%, transparent 70%)', filter: 'blur(90px)' }}></div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 select-text">
                        <div className="flex items-center justify-center gap-2.5 mb-3">
                            <CrosshairIcon size={18} className="text-[#FB3641] animate-pulse" />
                            <span className="text-[10px] text-[#FB3641] tracking-[0.3em] font-bold">
                                MISSION_ARCHIVE
                            </span>
                            <CrosshairIcon size={18} className="text-[#FB3641] animate-pulse" />
                        </div>
                        <h2 className="font-display font-black text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                            COMPLETED_OPERATIONS
                        </h2>
                        <p className="w-[90%] flex justify-center items-center mx-auto text-[9px] sm:text-xs text-[#84958a] mt-3 tracking-widest uppercase">
                            Declassified field operations &mdash; click to inspect deployment
                        </p>
                    </div>

                    {/* Mission Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {MISSIONS.map((mission) => (
                            <a
                                key={mission.id}
                                href={mission.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block rounded-lg border border-white/10 overflow-hidden transition-all duration-400 hover:border-[#FB3641]/50 hover:scale-[1.02] cursor-pointer w-[95%] mx-auto md:w-full"
                                style={{
                                    background: 'rgba(10, 20, 30, 0.5)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                                }}
                            >
                                {/* Corner tactical brackets */}
                                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>

                                {/* Image Container */}
                                <div className="relative h-48 sm:h-52 overflow-hidden">
                                    <img
                                        src={mission.image}
                                        alt={mission.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                                        loading="lazy"
                                    />
                                    {/* Scanlines overlay on image */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>
                                    {/* Bottom gradient fade */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none"></div>

                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
                                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e29d] animate-pulse"></span>
                                        <span className="text-[8px] text-[#00e29d] font-bold tracking-widest uppercase">{mission.status}</span>
                                    </div>

                                    {/* Operation ID */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="text-[8px] text-[#FB3641]/60 font-bold tracking-widest">{mission.id}</span>
                                    </div>

                                    {/* Hover scan line */}
                                    <div className="absolute left-0 right-0 h-[1.5px] bg-[#00e29d] opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                                        style={{ boxShadow: '0 0 8px rgba(0,226,157,0.8)', top: '50%', animation: 'scanSweep 3s linear infinite' }}
                                    ></div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4 sm:p-5 relative">
                                    {/* Codename */}
                                    <span className="text-[8px] text-[#FB3641] tracking-[0.2em] font-bold uppercase block mb-2">
                                        {mission.codename}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tighter mb-2 group-hover:text-[#FB3641] transition-colors duration-300">
                                        {mission.title}
                                    </h3>

                                    {/* Owner + External Link */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#84958a]"></span>
                                            <span className="text-[9px] text-[#84958a] tracking-widest uppercase font-bold">
                                                {mission.owner}
                                            </span>
                                        </div>
                                        <div className="text-[#84958a] group-hover:text-[#00e29d] transition-colors duration-300">
                                            <ExternalLinkIcon size={14} />
                                        </div>
                                    </div>

                                    {/* Bottom tactical line */}
                                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[8px] text-[#84958a]/60 tracking-widest uppercase">CLICK_TO_INSPECT</span>
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300"></span>
                                            <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-75"></span>
                                            <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-150"></span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* ═══════════════════════════════════════════════════════════
                        VIDEO INTEL — Video Editing Samples / Reels
                    ═══════════════════════════════════════════════════════════ */}
                    <div className="mt-20 sm:mt-28">
                        {/* Sub-section Header */}
                        <div className="text-center mb-10 sm:mb-14 select-text">
                            <div className="flex items-center justify-center gap-2.5 mb-3">
                                <FilmIcon size={16} className="text-[#FB3641] animate-pulse" />
                                <span className="text-[10px] text-[#FB3641] tracking-[0.3em] font-bold">
                                    VIDEO_INTEL
                                </span>
                                <FilmIcon size={16} className="text-[#FB3641] animate-pulse" />
                            </div>
                            <h3 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-tight">
                                EDITING_SAMPLES
                            </h3>
                            <p className="w-[90%] flex justify-center items-center mx-auto text-[9px] sm:text-xs text-[#84958a] mt-3 tracking-widest uppercase">
                                Intercepted footage &mdash; video editing reels &amp; visual productions
                            </p>
                        </div>

                        {/* ── ROW 1: Shorts / Portrait Reels ── */}
                        {portraitReels.length > 0 && (
                            <div className="mb-10">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <span className="w-1.5 h-1.5 bg-[#FB3641]"></span>
                                    <span className="text-[9px] text-[#84958a] tracking-[0.25em] font-bold uppercase">
                                        SHORTS_/_REELS
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {portraitReels.map(renderReelCard)}
                                </div>
                            </div>
                        )}

                        {/* ── ROW 2: Landscape Videos ── */}
                        {landscapeReels.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2.5 mb-5">
                                    <span className="w-1.5 h-1.5 bg-[#FB3641]"></span>
                                    <span className="text-[9px] text-[#84958a] tracking-[0.25em] font-bold uppercase">
                                        LANDSCAPE_FOOTAGE
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {landscapeReels.map(renderReelCard)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Video Lightbox Modal — rendered outside section to avoid clipping */}
            {lightboxReel && (
                <VideoLightboxModal reel={lightboxReel} onClose={closeLightbox} />
            )}
        </>
    );
};

export default memo(Missions);

