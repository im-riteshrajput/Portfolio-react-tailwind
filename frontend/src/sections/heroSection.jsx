import { forwardRef, useState, useEffect, memo } from "react";
import ValoButton from "../components/ValoButton";

const HeroSection = forwardRef((props, ref) => {
    const { isMobile } = props;
    const [localTimeStr, setLocalTimeStr] = useState("00:00:00");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setLocalTimeStr(now.toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={ref} className={`${props.className} w-full min-h-[70vh] md:min-h-screen bg-transparent max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0 flex justify-center items-center relative overflow-hidden bg-black sticky top-0 z-10`}>

            {/* <div className="w-full sm:w-[80vw] md:w-[75vw] flex flex-col md:grid md:grid-cols-3"> */}
            <div className="w-[90%] font-mono col-span-2">

                {/* STATUS combat ready label with pulse dot */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-[#00e29d] rounded-full animate-ping"></span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.3em] text-[#00e29d]">STATUS: COMBAT_READY</span>
                </div>

                {/* Huge headings */}
                <h1 className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tighter text-white uppercase mb-6 select-text">
                    M{props.htext1}<span className="text-[#FB3641] block mt-1">{props.htext2}</span>
                </h1>

                <p className="text-xs sm:text-sm md:text-md md:w-[60%] text-[#b9cbbf] mb-8 md:mb-4 max-w-xl leading-relaxed select-text font-sans">
                    Precision deployment of digital assets and strategic architectural protocols. Executing high-impact solutions for mission-critical objectives in the tech ecosystem.
                </p>

                {/* Action buttons */}
                <div className="flex flex-row gap-4 sm:gap-5 w-full sm:w-auto">
                    <ValoButton
                        id="btn-initiate-contact"
                        onClick={props.onInitiateContact}
                        className="px-6 sm:px-10 py-3 sm:py-4 bg-[#FB3641] text-[#002113] font-bold tracking-widest text-[10px] sm:text-xs uppercase duration-150 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,226,157,0.3)] transition-all text-center"
                        text="INITIATE_CONTACT"
                    />
                    <button
                        id="btn-view-records"
                        onClick={props.onViewMyWork}
                        className="px-6 sm:px-10 py-3 sm:py-4 border border-[#FB3641] hover:bg-[#FB3641]/10 text-[#FB3641] font-bold tracking-widest text-[10px] sm:text-xs uppercase duration-150 active:scale-95 cursor-pointer transition-all text-center"
                        style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%)" }}
                    >
                        VIEW_MY_WORK
                    </button>
                </div>

                {/* Metrics summary */}
                <div className="md:w-[65%] lg:w-[70%] grid grid-cols-3 gap-2 sm:gap-6 border-t border-[#3b4a41]/20 pt-8 text-left select-text">
                    <div>
                        <div className="text-[7px] sm:text-[9px] text-[#84958a] uppercase tracking-wider mb-1 font-mono leading-none">MISSIONS_COMPLETED</div>
                        <div className="text-lg sm:text-2xl md:text-3xl font-bold font-mono text-[#FB3641]">{props.missionsCompleted}</div>
                    </div>
                    <div>
                        <div className="text-[7px] sm:text-[9px] text-[#84958a] uppercase tracking-wider mb-1 font-mono leading-none">EFFICIENCY_RATING</div>
                        <div className="text-lg sm:text-2xl md:text-3xl font-bold font-mono text-[#FB3641]">9{props.efficiencyRating}</div>
                    </div>
                    <div>
                        <div className="text-[7px] sm:text-[9px] text-[#84958a] uppercase tracking-wider mb-1 font-mono leading-none">LOCAL_TIME</div>
                        <div className="text-lg sm:text-2xl md:text-3xl font-bold font-mono text-[#FB3641]">{localTimeStr}</div>
                    </div>
                </div>

            </div>

            {/* Desktop: empty placeholder column (card is rendered by fixed overlay in home.jsx) */}
            {!isMobile && (
                <div className="heroimgcont flex justify-center items-center relative py-12">
                </div>
            )}
        </section>
    );
});

HeroSection.displayName = "HeroSection";

export default memo(HeroSection);