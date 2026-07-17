import { useState, memo, useRef, useEffect } from "react";
import agentPhoto from "../assets/img/1713.png";
import cardBack from "../assets/img/cardback.png";

// Preload and decode card images immediately so the first scroll doesn't lag
const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
    if (img.decode) {
        img.decode().catch(() => {}); // decode asynchronously, ignore errors
    }
};
preloadImage(cardBack);
preloadImage(agentPhoto);

/**
 * CardVisual — Reusable agent card component.
 *
 * Renders the full card with back-face / front-face flip,
 * optional glow trail, and optional float animation.
 *
 * The flip rotation, glow, and float are updated directly via DOM
 * by the parent's RAF loop (using data-card-flipper, data-card-glow,
 * data-card-float attributes) to avoid React re-renders on scroll.
 *
 * Props:
 *   flipDeg        – Y-axis flip rotation (0 = back, 180 = front)
 *   cardScale      – scale factor (default 1.2)
 *   cardRotateZ    – Z-axis tilt in degrees (default 6)
 *   cardWidth      – CSS width string (default "208px")
 *   cardHeight     – CSS height string (default "322px")
 *   floatIntensity – 0..1, controls float animation (default 0)
 *   glowTrail      – 0..1, controls glow opacity (default 0)
 *   showGlow       – whether to render the glow div (default true)
 *   className      – additional wrapper classes
 */
const CardVisual = memo(({
    flipDeg = 0,
    cardScale = 1.2,
    cardRotateZ = 6,
    cardWidth = "208px",
    cardHeight = "322px",
    floatIntensity = 0,
    glowTrail = 0,
    showGlow = true,
    className = "",
}) => {
    const containerRef = useRef(null);
    const [isFlippedState, setIsFlippedState] = useState(flipDeg > 90);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (containerRef.current) {
            const parent = containerRef.current.parentElement;
            if (parent && parent.dataset.flipDeg) {
                const currentFlip = parseFloat(parent.dataset.flipDeg);
                setIsFlippedState(currentFlip > 90);
            }
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const isFlipped = isFlippedState;
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

    // Apply desktop hover transformation if we are flipped (meaning we are on the profile section)
    const shouldApplyHover = isHovered && isFlipped && !isMobile;
    const finalScale = shouldApplyHover ? cardScale * 1.25 : cardScale;
    const finalRotate = shouldApplyHover ? 0 : cardRotateZ;

    return (
        <div
            ref={containerRef}
            className={`relative pointer-events-auto group ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow trail effect — hardware accelerated for scroll performance */}
            {showGlow && (
                <div
                    data-card-glow
                    className="absolute rounded-[24px] pointer-events-none"
                    style={{
                        inset: -20,
                        background: `radial-gradient(ellipse at center, rgba(251, 54, 65, 0.7) 0%, transparent 70%)`,
                        filter: `blur(35px)`,
                        opacity: 0.6,
                        transform: "scale(0.8)",
                        willChange: "transform, opacity",
                    }}
                />
            )}

            {/* Float wrapper — animation toggled via data-card-float */}
            <div
                data-card-float
                style={{
                    animation: "cardFloat 5s ease-in-out infinite",
                    animationPlayState:
                        floatIntensity > 0.05 ? "running" : "paused",
                }}
            >
                {/* Card container with scale + tilt */}
                <div
                    style={{
                        width: cardWidth,
                        height: cardHeight,
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transform: `scale(${finalScale}) rotate(${finalRotate}deg)`,
                        transition: isFlipped && !isMobile ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                        willChange: "transform",
                    }}
                >
                    {/* Inner flipper — rotated directly via data-card-flipper */}
                    <div
                        data-card-flipper
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            transformStyle: "preserve-3d",
                            transform: `rotateY(${flipDeg}deg)`,
                            transition: "none",
                            willChange: "transform",
                        }}
                    >
                        {/* ──── BACK FACE (default visible in hero) ──── */}
                        <div
                            className="absolute inset-0 rounded-lg overflow-hidden"
                            style={{ backfaceVisibility: "hidden", willChange: "transform", transform: "translateZ(0)" }}
                        >
                            <img
                                src={cardBack}
                                alt="Card back"
                                className="absolute object-cover w-full h-full"
                                loading="eager"
                                decoding="sync"
                                fetchPriority="high"
                                style={{
                                    left: "-5%",
                                    top: "0.7%",
                                    scale: 1.73,
                                }}
                            />
                        </div>

                        {/* ──── FRONT FACE (revealed as card reaches profile) ──── */}
                        <div
                            className="absolute inset-0 rounded-lg overflow-hidden bg-[#050b10] border border-[#FB3641]/30 group"
                            style={{
                                transform: "rotateY(180deg) translateZ(0)",
                                backfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                        >
                            {/* Corner Accent Brackets */}
                            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FB3641]/60 z-10"></div>
                            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FB3641]/60 z-10"></div>

                            {/* Card Header */}
                            <div className="flex justify-between items-center bg-[#07131d] mt-[5%] border-b border-[#FB3641]/20 px-3 py-1.5 mx-2 rounded-t">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-[#00e29d] rounded-full animate-ping"></span>
                                    <span className="text-[7px] text-[#00e29d] font-bold tracking-widest uppercase">ONLINE</span>
                                </div>
                            </div>

                            {/* Agent Photo */}
                            <div className="relative mx-1 mt-1 overflow-hidden bg-[#070b10] border border-[#FB3641]/10 rounded" style={{ height: "calc(100% - 72px)" }}>
                                <img
                                    src={agentPhoto}
                                    alt="Agent operative"
                                    className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-[filter] duration-500 brightness-90 contrast-110"
                                    loading="eager"
                                    decoding="sync"
                                    fetchPriority="high"
                                />
                                {/* Scanlines overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
                                {/* Scanning line */}
                                <div className="absolute left-0 right-0 h-[1.5px] bg-[#00e29d] shadow-[0_0_8px_rgba(0,226,157,0.8)] opacity-60 animate-[scanSweep_3.5s_linear_infinite]"></div>
                            </div>

                            {/* Footer Labels */}
                            <div className="absolute bottom-1 left-2 right-2">
                                <span className="text-[10px] text-[#FB3641] group-hover:text-white font-bold tracking-widest block uppercase">Mrs.</span>
                                <h2 className="font-display font-black text-lg tracking-tighter text-white uppercase select-text leading-none group-hover:text-[#FB3641] transition-colors">
                                    Rajput Ritesh
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden offscreen images to force browser to fully decode into GPU memory */}
            <img src={agentPhoto} alt="" aria-hidden="true" className="absolute w-[1px] h-[1px] opacity-[0.01] pointer-events-none -z-50" />
            <img src={cardBack} alt="" aria-hidden="true" className="absolute w-[1px] h-[1px] opacity-[0.01] pointer-events-none -z-50" />
        </div>
    );
});

CardVisual.displayName = "CardVisual";

export default CardVisual;
