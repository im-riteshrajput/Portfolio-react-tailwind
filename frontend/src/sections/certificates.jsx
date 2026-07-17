import { memo, useState, useCallback, useEffect } from "react";
import bimfswd from "../assets/img/bim-fswd.png"

// ─── CERTIFICATE DATA ──────────────────────────────────────────────
// Update this array with your actual certificates.
// Add a `preview` field with the imported image for each certificate.
//
// Example with imports:
//   import cert1Img from "../assets/img/cert_1.png";
//   ...then set preview: cert1Img
//
// For now, preview is null — replace with your actual certificate images.
const CERTIFICATES = [
    {
        id: "CERT_01",
        codename: "FULL_STACK_OPS",
        title: "Full Stack Web Development",
        issuer: "BIMFROX",
        date: "2026",
        credentialUrl: "#",
        skills: ["REACT", "NODE.JS", "MONGODB"],
        preview: bimfswd,
    },
];

// ─── INLINE SVG ICONS ──────────────────────────────────────────────
const AwardIcon = ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

const ExternalLinkIcon = ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const ShieldCheckIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const ExpandIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
);

const CloseIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const FileIcon = ({ size = 40, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

// ─── LIGHTBOX MODAL ────────────────────────────────────────────────
const LightboxModal = ({ cert, onClose }) => {
    // Close on Escape key
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

    if (!cert) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" style={{ WebkitBackdropFilter: 'blur(12px)' }}></div>

            {/* Modal Content */}
            <div
                className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header bar */}
                <div className="w-full flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#00e29d] animate-pulse"></span>
                        <span className="text-[10px] text-[#FB3641] tracking-[0.2em] font-bold font-mono uppercase">
                            {cert.codename}
                        </span>
                        <span className="text-[10px] text-[#84958a]/50 font-mono">|</span>
                        <span className="text-[10px] text-[#84958a] tracking-widest font-bold font-mono uppercase">
                            {cert.issuer}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-sm border border-white/10 hover:border-[#FB3641]/50 hover:bg-[#FB3641]/10 transition-all duration-200 cursor-pointer"
                        style={{ background: 'rgba(10, 20, 30, 0.6)' }}
                        aria-label="Close preview"
                    >
                        <CloseIcon size={16} className="text-[#84958a] hover:text-white" />
                    </button>
                </div>

                {/* Image container */}
                <div
                    className="relative w-full rounded-lg border border-white/10 overflow-hidden"
                    style={{
                        background: 'rgba(10, 20, 30, 0.5)',
                        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(251, 54, 65, 0.08)',
                    }}
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00e29d] z-20"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00e29d] z-20"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00e29d] z-20"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00e29d] z-20"></div>

                    {cert.preview ? (
                        <img
                            src={cert.preview}
                            alt={cert.title}
                            className="w-full h-auto max-h-[75vh] object-contain"
                        />
                    ) : (
                        <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
                            <FileIcon size={56} className="text-[#84958a]/30" />
                            <span className="text-[10px] text-[#84958a]/40 tracking-widest font-bold font-mono uppercase">
                                PREVIEW_UNAVAILABLE
                            </span>
                        </div>
                    )}

                    {/* Scanlines overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>
                </div>

                {/* Footer info */}
                <div className="w-full flex items-center justify-between mt-4 px-2">
                    <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tighter font-mono">
                        {cert.title}
                    </h3>
                    {cert.credentialUrl && cert.credentialUrl !== "#" && (
                        <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[9px] text-[#00e29d] tracking-widest font-bold font-mono uppercase hover:text-white transition-colors duration-200"
                        >
                            VERIFY_CREDENTIAL
                            <ExternalLinkIcon size={11} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── CERTIFICATE PREVIEW IMAGE ─────────────────────────────────────
const CertPreview = ({ cert, onExpand }) => {
    const hasImage = !!cert.preview;

    return (
        <div
            className="relative h-44 sm:h-48 overflow-hidden cursor-pointer"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onExpand(cert);
            }}
        >
            {hasImage ? (
                <img
                    src={cert.preview}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                    loading="lazy"
                />
            ) : (
                /* Tactical placeholder when no image is provided */
                <div className="w-full h-full flex flex-col items-center justify-center relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(10,20,30,0.9) 0%, rgba(15,25,40,0.9) 50%, rgba(10,20,30,0.9) 100%)',
                    }}
                >
                    {/* Grid pattern background */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    ></div>

                    {/* Crosshair center decoration */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="relative">
                            <FileIcon size={36} className="text-[#FB3641]/25 group-hover:text-[#00e29d]/40 transition-colors duration-300" />
                            {/* Pulsing ring around icon */}
                            <div className="absolute -inset-3 border border-[#FB3641]/10 rounded-full group-hover:border-[#00e29d]/20 transition-colors duration-300 animate-ping" style={{ animationDuration: '3s' }}></div>
                        </div>
                        <span className="text-[8px] text-[#84958a]/40 tracking-[0.3em] font-bold uppercase group-hover:text-[#84958a]/60 transition-colors duration-300">
                            CLASSIFIED_DOCUMENT
                        </span>
                    </div>

                    {/* Corner data readouts */}
                    <span className="absolute top-3 left-3 text-[7px] text-[#84958a]/20 tracking-widest font-bold">{cert.id}</span>
                    <span className="absolute top-3 right-3 text-[7px] text-[#84958a]/20 tracking-widest font-bold">{cert.date}</span>
                </div>
            )}

            {/* Scanlines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>

            {/* Bottom gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none"></div>

            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e29d] animate-pulse"></span>
                <span className="text-[8px] text-[#00e29d] font-bold tracking-widest uppercase">VERIFIED</span>
            </div>

            {/* Operation ID */}
            <div className="absolute top-3 left-3 z-10">
                <span className="text-[8px] text-[#FB3641]/60 font-bold tracking-widest">{cert.id}</span>
            </div>

            {/* Expand icon — appears on hover */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm"
                    style={{ WebkitBackdropFilter: 'blur(8px)' }}
                >
                    <ExpandIcon size={18} className="text-white" />
                </div>
            </div>

            {/* Hover scan line */}
            <div
                className="absolute left-0 right-0 h-[1.5px] bg-[#00e29d] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: '0 0 8px rgba(0,226,157,0.8)', top: '50%', animation: 'scanSweep 3s linear infinite' }}
            ></div>
        </div>
    );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────
const Certificates = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [lightboxCert, setLightboxCert] = useState(null);

    const openLightbox = useCallback((cert) => {
        setLightboxCert(cert);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxCert(null);
    }, []);

    return (
        <>
            <section
                className="py-16 sm:py-24 font-mono sticky top-0 z-20 min-h-screen flex flex-col justify-center px-2 sm:px-4 md:px-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #0a1520 0%, #060c14 50%, #000000 100%)' }}
            >
                {/* Ambient glow orbs */}
                <div className="absolute pointer-events-none" style={{ top: '10%', right: '10%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(251,54,65,0.1) 0%, transparent 70%)', filter: 'blur(90px)' }}></div>
                <div className="absolute pointer-events-none" style={{ bottom: '15%', left: '5%', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(0,226,157,0.08) 0%, transparent 70%)', filter: 'blur(90px)' }}></div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 select-text">
                        <div className="flex items-center justify-center gap-2.5 mb-3">
                            <AwardIcon size={18} className="text-[#FB3641] animate-pulse" />
                            <span className="text-[10px] text-[#FB3641] tracking-[0.3em] font-bold">
                                CREDENTIAL_VAULT
                            </span>
                            <AwardIcon size={18} className="text-[#FB3641] animate-pulse" />
                        </div>
                        <h2 className="font-display font-black text-xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                            VERIFIED_CLEARANCES
                        </h2>
                        <p className="w-[90%] flex justify-center items-center mx-auto text-[9px] sm:text-xs text-[#84958a] mt-3 tracking-widest uppercase">
                            Authenticated credentials &mdash; field-verified proficiency records
                        </p>
                    </div>

                    {/* Certificate Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {CERTIFICATES.map((cert) => (
                            <div
                                key={cert.id}
                                onClick={(e) => {
                                    // Don't open modal if clicking the verify link
                                    if (e.target.closest('a')) return;
                                    openLightbox(cert);
                                }}
                                className="group relative block rounded-lg border border-white/10 overflow-hidden transition-all duration-400 hover:border-[#00e29d]/50 hover:scale-[1.02] cursor-pointer w-[95%] mx-auto sm:w-full"
                                style={{
                                    background: 'rgba(10, 20, 30, 0.5)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                                }}
                                onMouseEnter={() => setHoveredId(cert.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Corner tactical brackets */}
                                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>
                                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FB3641]/30 group-hover:border-[#00e29d] transition-colors duration-300 z-20"></div>

                                {/* ═══ Certificate Image Preview ═══ */}
                                <CertPreview cert={cert} onExpand={openLightbox} />

                                {/* Card Content */}
                                <div className="p-5 sm:p-6 relative">
                                    {/* Codename */}
                                    <span className="text-[8px] text-[#FB3641] tracking-[0.2em] font-bold uppercase block mb-2">
                                        {cert.codename}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tighter mb-2 group-hover:text-[#00e29d] transition-colors duration-300">
                                        {cert.title}
                                    </h3>

                                    {/* Issuer + Date */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#84958a]"></span>
                                            <span className="text-[9px] text-[#84958a] tracking-widest uppercase font-bold">
                                                {cert.issuer}
                                            </span>
                                        </div>
                                        <span className="text-[8px] text-[#84958a]/50">|</span>
                                        <span className="text-[9px] text-[#84958a]/70 tracking-widest font-bold">
                                            {cert.date}
                                        </span>
                                    </div>

                                    {/* Skill tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {cert.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 text-[7px] font-bold tracking-widest uppercase rounded-sm transition-all duration-300 group-hover:border-[#00e29d]/30 group-hover:text-[#00e29d]/90"
                                                style={{
                                                    background: 'rgba(251, 54, 65, 0.06)',
                                                    border: '1px solid rgba(251, 54, 65, 0.15)',
                                                    color: 'rgba(251, 54, 65, 0.7)',
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom tactical line */}
                                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[8px] text-[#84958a]/60 tracking-widest uppercase">CLICK_TO_INSPECT</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300"></span>
                                                <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-75"></span>
                                                <span className="w-1 h-1 bg-[#FB3641]/40 group-hover:bg-[#00e29d] transition-colors duration-300 delay-150"></span>
                                            </div>
                                            <div className="text-[#84958a] group-hover:text-[#00e29d] transition-colors duration-300">
                                                <ExternalLinkIcon size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Intel counter */}
                    <div className="mt-10 text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm"
                            style={{ background: 'rgba(10, 20, 30, 0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00e29d] animate-pulse"></span>
                            <span className="text-[9px] text-[#84958a] tracking-widest uppercase font-bold">
                                TOTAL_CLEARANCES: <span className="text-white">{CERTIFICATES.length}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fullscreen Lightbox Modal */}
            {lightboxCert && (
                <LightboxModal cert={lightboxCert} onClose={closeLightbox} />
            )}
        </>
    );
};

export default memo(Certificates);
