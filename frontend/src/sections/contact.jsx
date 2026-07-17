import { memo } from "react";

const email = "riteshrajput9a40@gmail.com";

const GithubIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96C23 15.87 23 12 23 12s0-3.87-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
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

const playSuccessSound = () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [600, 800, 1000].forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now + index * 0.06);

            gain.gain.setValueAtTime(0.04, now + index * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.005, now + index * 0.06 + 0.12);

            osc.start(now + index * 0.06);
            osc.stop(now + index * 0.06 + 0.12);
        });
    } catch (e) {
        // Safe fall-through
    }
};

const executeTerminalCommand = (command) => {
    console.log(`Executing terminal command: ${command}`);
};

const contact = () => {
    return (
        <section className="py-12 sm:py-20 bg-[#17202b] text-center relative overflow-hidden border border-[#3b4a41]/20 font-mono sticky top-0 z-30 min-h-screen flex flex-col justify-center">

            {/* Outline grids background details */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div className="grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="border-r border-[#00e29d]/20 h-full"></div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 select-text flex flex-col items-center">
                <h2 className="font-display font-black text-[18px] min-[340px]:text-2xl min-[380px]:text-2xl sm:text-4xl md:text-4xl text-white tracking-tighter uppercase mb-4 sm:mb-6 leading-none">
                    READY_FOR_DEPLOYMENT?
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-[#b9cbbf] max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed font-sans px-4 sm:px-0">
                    Looking to deploy a high-performance web application or cut high-impact visual content? I am ready for mobilization. Transmit your coordinates below to establish a secure channel and initiate our briefing.
                </p>

                <div className="inline-flex flex-col items-center gap-4">
                    <button
                        id="btn-establish-link"
                        onClick={() => {
                            playSuccessSound();
                            executeTerminalCommand("/contact headquarters secure encryption mode");
                            window.location.href = `mailto:${email}?subject=Briefing Request - Portfolio&body=Hello Ritesh,%0D%0A%0D%0AI would like to establish a secure channel to initiate our briefing.`;
                        }}
                        className="bg-[#FB3641] hover:bg-[#CD040E] text-[#FFFFFF] px-6 sm:px-16 py-3.5 sm:py-6 font-display font-black text-sm sm:text-xl hover:scale-105 active:scale-95 transition-all duration-100 cursor-pointer shadow-[0_12px_25px_rgba(17,251,176,0.3)] block"
                        style={{ clipPath: "polygon(0% 0%, 95% 0%, 100% 20%, 100% 100%, 5% 100%, 0% 80%)" }}
                    >
                        ESTABLISH_LINK
                    </button>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-12 justify-center z-20">
                    <a
                        href="https://github.com/im-riteshrajput"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-0 hover:gap-2 max-w-[40px] hover:max-w-[200px] h-[40px] px-2.5 overflow-hidden border border-white/10 hover:border-[#FB3641]/30 rounded bg-[#0a141e]/40 text-[#84958a] hover:text-[#FB3641] transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    >
                        <GithubIcon size={18} className="flex-shrink-0" />
                        <span className="text-[10px] font-bold font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            github/im-riteshrajput
                        </span>
                    </a>
                    <a
                        href="https://linkedin.com/in/ritesh-rajput-08ba8434b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-0 hover:gap-2 max-w-[40px] hover:max-w-[200px] h-[40px] px-2.5 overflow-hidden border border-white/10 hover:border-[#FB3641]/30 rounded bg-[#0a141e]/40 text-[#84958a] hover:text-[#FB3641] transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    >
                        <LinkedinIcon size={18} className="flex-shrink-0" />
                        <span className="text-[10px] font-bold font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            linkedin/riteshrajput
                        </span>
                    </a>
                    <a
                        href="https://www.instagram.com/im_ritesh_rajputt/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-0 hover:gap-2 max-w-[40px] hover:max-w-[200px] h-[40px] px-2.5 overflow-hidden border border-white/10 hover:border-[#FB3641]/30 rounded bg-[#0a141e]/40 text-[#84958a] hover:text-[#FB3641] transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    >
                        <InstagramIcon size={18} className="flex-shrink-0" />
                        <span className="text-[10px] font-bold font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            @im_ritesh_rajputt
                        </span>
                    </a>
                    {/* <a
                        href="https://youtube.com/@riteshrajput"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-0 hover:gap-2 max-w-[40px] hover:max-w-[200px] h-[40px] px-2.5 overflow-hidden border border-white/10 hover:border-[#FB3641]/30 rounded bg-[#0a141e]/40 text-[#84958a] hover:text-[#FB3641] transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    >
                        <YoutubeIcon size={18} className="flex-shrink-0" />
                        <span className="text-[10px] font-bold font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            yt/@riteshrajput
                        </span>
                    </a> */}
                </div>
            </div>
        </section>
    )
}

export default memo(contact);