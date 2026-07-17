import Navbar from "../components/navbar";
import BottomProgressBar from "../components/bottomProgressBar";
import HeroSection from "../sections/heroSection";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Capabilities from "../sections/capabilities";
import Profile from "../sections/profile";
import Contact from "../sections/contact";
import Missions, { MISSIONS } from "../sections/missions";
import Certificates from "../sections/certificates";
import Education from "../sections/education";
import CardVisual from "../components/CardVisual";
import { useTypingAnimation, useTypewriter } from "../hooks/useTypingAnimation";


function Home() {

    // Responsive: detect mobile (< 768px), tablet (768px–1024px)
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );
    const [isTablet, setIsTablet] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth >= 768 && window.innerWidth < 1024 : false
    );
    const [isXL, setIsXL] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth > 1600 : false
    );

    useEffect(() => {
        let timeoutId = null;
        const handleResize = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const w = window.innerWidth;
                setIsMobile(w < 768);
                setIsTablet(w >= 768 && w < 1024);
                setIsXL(w > 1600);
            }, 100);
        };
        window.addEventListener("resize", handleResize);
        // Also run once on mount
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    // Refs for section measurement
    const heroRef = useRef(null);
    const profileRef = useRef(null);

    // ─── RAF-based scroll tracking ─────────────────────────────────────
    // Use refs for scroll-driven values so we can update them at paint
    // time via requestAnimationFrame without triggering React re-renders
    // on every scroll event. Only the card container and progress bar
    // read these values through direct DOM manipulation.
    const scrollProgressRef = useRef(0);
    const cardProgressRef = useRef(0);
    const cardYOffsetRef = useRef(0);
    const rafIdRef = useRef(null);
    const cardContainerRef = useRef(null);
    const progressBarRef = useRef(null);

    // ─── Mobile card container refs ────────────────────────────────────
    const mobileCardSectionRef = useRef(null);
    const mobileCardRef = useRef(null);
    const mobileRafIdRef = useRef(null);
    const mobileInViewRef = useRef(false);

    // State for progress bar text (only update when rounded value changes)
    const [scrollProgress, setScrollProgress] = useState(0);

    // ─── Section tracking for progress bar ─────────────────────────────
    const [activeSection, setActiveSection] = useState("HERO");
    const heroSectionRef = useRef(null);
    const profileSectionRef = useRef(null);
    const capabilitiesRef = useRef(null);
    const missionsRef = useRef(null);
    const certificatesRef = useRef(null);
    const educationRef = useRef(null);
    const contactRef = useRef(null);

    // IntersectionObserver to detect which section is currently in viewport
    const activeSectionRef = useRef("HERO");
    useEffect(() => {
        const sectionEntries = [
            { id: "HERO", ref: heroSectionRef },
            { id: "PROFILE", ref: profileSectionRef },
            { id: "CAPABILITIES", ref: capabilitiesRef },
            { id: "MISSIONS", ref: missionsRef },
            { id: "CERTIFICATES", ref: certificatesRef },
            { id: "EDUCATION", ref: educationRef },
            { id: "CONTACT", ref: contactRef },
        ];

        // Track intersection ratios for all sections
        const ratioMap = new Map();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("data-section");
                    if (id) ratioMap.set(id, entry.intersectionRatio);
                });

                // Find section with highest visibility
                let bestId = activeSectionRef.current;
                let bestRatio = 0;
                ratioMap.forEach((ratio, id) => {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        bestId = id;
                    }
                });

                // Only update state if section actually changed
                if (bestId !== activeSectionRef.current) {
                    activeSectionRef.current = bestId;
                    setActiveSection(bestId);
                }
            },
            {
                threshold: [0, 0.25, 0.5],
                rootMargin: "-15% 0px -15% 0px",
            }
        );

        sectionEntries.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    // Easing function for smooth animation (memoized)
    const easeInOutCubic = useCallback((t) => {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }, []);

    // Core scroll handler — reads DOM, computes values, applies via RAF
    const handleScroll = useCallback(() => {
        // Cancel any pending frame to avoid double-painting
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

        rafIdRef.current = requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const totalHeight = scrollHeight - clientHeight;

            // Bottom progress bar
            if (totalHeight > 0) {
                const progress = (scrollTop / totalHeight) * 100;
                scrollProgressRef.current = progress;

                // Only trigger React re-render when the rounded percentage changes
                const rounded = Math.round(progress);
                setScrollProgress(prev => {
                    if (Math.round(prev) !== rounded) return progress;
                    return prev;
                });
            }

            // Card parallax: compute progress between hero and profile sections
            const heroEl = heroRef.current;
            const profileEl = profileRef.current;
            if (!heroEl || !profileEl) return;

            const profileTop = profileEl.offsetTop;
            const animStart = heroEl.offsetTop;
            const animEnd = profileTop;
            if (animEnd <= animStart) {
                cardProgressRef.current = 0;
                cardYOffsetRef.current = 0;
            } else {
                let t = (scrollTop - animStart) / (animEnd - animStart);
                t = Math.max(0, Math.min(1, t));
                cardProgressRef.current = t;

                // Scroll the card out of view along with the section when scrolling past profile
                cardYOffsetRef.current = scrollTop > profileTop ? scrollTop - profileTop : 0;
            }

            // ── Direct DOM update for the card container (desktop/tablet only) ──
            const cardEl = cardContainerRef.current;
            const viewWidth = window.innerWidth;
            if (cardEl && viewWidth >= 768) {
                const cp = cardProgressRef.current;
                const yOffset = cardYOffsetRef.current;
                const easedT = easeInOutCubic(cp);

                let cardX, cardY;
                if (viewWidth >= 768 && viewWidth < 1024) {
                    // Tablet
                    const startX = 80;
                    const endX = 23;
                    cardX = startX + (endX - startX) * easedT;
                    cardY = 50;
                } else {
                    // Desktop
                    const startX = 72;
                    const endX = viewWidth > 1600 ? 30 : 27;
                    cardX = startX + (endX - startX) * easedT;
                    cardY = 50;
                }

                cardEl.style.transform = `translate3d(calc(${cardX}vw - 50%), calc(${cardY}vh - 50% - ${yOffset}px), 0)`;

                // Update card visual's flip and effects
                const flipDeg = easedT * 180;
                const floatIntensity = 1 - easedT;
                const glowTrail = Math.sin(easedT * Math.PI);

                // Only write dataset needed for hover logic
                cardEl.dataset.flipDeg = flipDeg.toFixed(2);

                // Directly update the inner card visual elements using hardware-accelerated properties
                const flipper = cardEl.querySelector('[data-card-flipper]');
                if (flipper) {
                    flipper.style.transform = `rotateY(${flipDeg}deg)`;
                }

                const glowEl = cardEl.querySelector('[data-card-glow]');
                if (glowEl) {
                    glowEl.style.opacity = 0.3 + glowTrail * 0.7;
                    glowEl.style.transform = `scale(${0.8 + glowTrail * 0.2})`;
                }

                const floatEl = cardEl.querySelector('[data-card-float]');
                if (floatEl) {
                    floatEl.style.animationPlayState = floatIntensity > 0.05 ? "running" : "paused";
                }
            }
        });
    }, [easeInOutCubic]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial run
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [handleScroll]);

    // ─── Mobile card: IntersectionObserver + scroll-driven animation ────
    // The card lives inside a dedicated container between hero and profile.
    // Animation starts only when the container enters the viewport.
    useEffect(() => {
        if (!isMobile) return;

        const sectionEl = mobileCardSectionRef.current;
        if (!sectionEl) return;

        // IntersectionObserver to flag when the container is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                mobileInViewRef.current = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        observer.observe(sectionEl);

        // Scroll handler scoped to mobile card container
        const handleMobileScroll = () => {
            if (!mobileInViewRef.current) return;
            if (mobileRafIdRef.current) cancelAnimationFrame(mobileRafIdRef.current);

            mobileRafIdRef.current = requestAnimationFrame(() => {
                const cardEl = mobileCardRef.current;
                const section = mobileCardSectionRef.current;
                if (!cardEl || !section) return;

                const rect = section.getBoundingClientRect();
                const viewH = window.innerHeight;

                // Progress based on the card element itself:
                // 0 = card fully visible (bottom edge at viewport bottom)
                // 1 = card has scrolled up one card-height further
                const cardRect = cardEl.getBoundingClientRect();
                const cardH = cardRect.height;
                const rawProgress = (viewH - cardRect.bottom) / cardH;
                const t = Math.max(0, Math.min(1, rawProgress));
                const easedT = easeInOutCubic(t);

                // Apply flip, glow, float animations
                const flipDeg = easedT * 180;
                const floatIntensity = 1 - easedT;
                const glowTrail = Math.sin(easedT * Math.PI);

                const flipper = cardEl.querySelector('[data-card-flipper]');
                if (flipper) flipper.style.transform = `rotateY(${flipDeg}deg)`;

                const glowEl = cardEl.querySelector('[data-card-glow]');
                if (glowEl) {
                    glowEl.style.opacity = 0.3 + glowTrail * 0.7;
                    glowEl.style.transform = `scale(${0.8 + glowTrail * 0.2})`;
                }

                const floatEl = cardEl.querySelector('[data-card-float]');
                if (floatEl) {
                    floatEl.style.animationPlayState = floatIntensity > 0.05 ? "running" : "paused";
                }
            });
        };

        window.addEventListener("scroll", handleMobileScroll, { passive: true });
        handleMobileScroll(); // Initial run

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleMobileScroll);
            if (mobileRafIdRef.current) cancelAnimationFrame(mobileRafIdRef.current);
        };
    }, [isMobile, easeInOutCubic]);



    // Typing animations (proper top-level hook calls)
    const htext = useTypingAnimation("ISSION_");
    const missioncomplete = useTypewriter(MISSIONS.length.toString());
    const efficiencyRating = useTypewriter("9.8%");

    // Card scale + rotation (static per breakpoint, not scroll-dependent)
    const cardScale = isMobile ? 1 : isTablet ? 1.05 : 1.2;
    const cardRotateZ = 6;

    // Card dimensions based on viewport
    const { cardWidth, cardHeight } = useMemo(() => {
        if (isMobile) return { cardWidth: "180px", cardHeight: "278px" };
        if (isTablet) return { cardWidth: "190px", cardHeight: "294px" };
        return { cardWidth: "208px", cardHeight: "322px" };
    }, [isMobile, isTablet]);

    const scrollToSection = useCallback((sectionRef) => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <>
            <Navbar className="w-[90%] max-w-[1600px] fixed top-0 left-0 right-0 mx-auto flex justify-self-center z-50" />

            {/* Laser line telemetry scan grid */}
            <div className="fixed inset-0 pointer-events-none hud-grid z-40"></div>

            {/* Screen CRT scan lines */}
            <div className="fixed inset-0 scanline pointer-events-none z-50"></div>

            {/* Top glowing laser line overlay */}
            <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FB3641] to-transparent opacity-70 z-40"></div>

            {/* ═══════════════════════════════════════════════════════════════
                PARALLAX CARD OVERLAY — fixed position, scroll-driven.
                Desktop/Tablet only. On mobile, the card lives inside a
                dedicated container section in the document flow.
                
                Position is updated directly via RAF (no React re-render).
                Uses transform: translate3d for GPU-accelerated compositing.
            ═══════════════════════════════════════════════════════════════ */}
            {!isMobile && (
                <div
                    ref={cardContainerRef}
                    className="fixed top-0 left-0 z-[30] pointer-events-none"
                    style={{
                        transform: `translate3d(calc(${isTablet ? 80 : 72}vw - 50%), calc(50vh - 50%), 0)`,
                        willChange: "transform",
                    }}
                >
                    <CardVisual
                        flipDeg={0}
                        cardScale={cardScale}
                        cardRotateZ={cardRotateZ}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                        floatIntensity={1}
                        glowTrail={0}
                        showGlow={true}
                    />
                </div>
            )}

            <main className="w-full bg-black relative text-white">
                <div ref={heroSectionRef} data-section="HERO">
                    <HeroSection
                        ref={heroRef}
                        className=""
                        htext1={htext}
                        missionsCompleted={missioncomplete}
                        efficiencyRating={efficiencyRating}
                        htext2="PORTFOLIO"
                        isMobile={isMobile}
                        onInitiateContact={() => scrollToSection(contactRef)}
                        onViewMyWork={() => scrollToSection(missionsRef)}
                    />
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    MOBILE CARD CONTAINER — sits between Hero and Profile.
                    Card is in the document flow, no overlap with hero.
                    Scroll-driven parallax animation triggers only when
                    this container enters the viewport (IntersectionObserver).
                ═══════════════════════════════════════════════════════════ */}
                {isMobile && (
                    <section
                        ref={mobileCardSectionRef}
                        className="w-full flex justify-center items-center relative z-[15]"
                        style={{ minHeight: "400px" }}
                    >
                        <div ref={mobileCardRef} className="relative">
                            <CardVisual
                                flipDeg={0}
                                cardScale={cardScale}
                                cardRotateZ={cardRotateZ}
                                cardWidth={cardWidth}
                                cardHeight={cardHeight}
                                floatIntensity={1}
                                glowTrail={0}
                                showGlow={true}
                            />
                        </div>
                    </section>
                )}
                <div ref={profileSectionRef} data-section="PROFILE">
                    <Profile
                        ref={profileRef}
                        isMobile={isMobile}
                    />
                </div>
                <div ref={capabilitiesRef} data-section="CAPABILITIES">
                    <Capabilities />
                </div>
                <div ref={missionsRef} data-section="MISSIONS">
                    <Missions />
                </div>
                <div ref={certificatesRef} data-section="CERTIFICATES">
                    <Certificates />
                </div>
                <div ref={educationRef} data-section="EDUCATION">
                    <Education />
                </div>
                <div ref={contactRef} data-section="CONTACT">
                    <Contact />
                </div>
                <div className="">
                    <BottomProgressBar progress={scrollProgress} activeSection={activeSection} className="" />
                </div>
            </main>
        </>
    )
}

export default Home