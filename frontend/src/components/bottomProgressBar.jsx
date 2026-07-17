import { memo } from "react";

// All section labels in order
const SECTIONS = [
    { id: "PROFILE", label: "PROFILE" },
    { id: "CAPABILITIES", label: "SKILLS" },
    { id: "MISSIONS", label: "MISSIONS" },
    { id: "CERTIFICATES", label: "CERTS" },
    { id: "EDUCATION", label: "EDU" },
];

const bottomProgressBar = (props) => {
    const { progress = 0, activeSection = "HERO", className = "" } = props;
    const roundedProgress = Math.round(progress);

    // Safely calculate the inverse width factor for the inner overlay to align perfectly
    const innerWidthPercent = progress > 0 ? (100 / progress) * 100 : 100;

    // Build section indicators for both layers
    const renderSections = (textColor, borderColor) => (
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 skew-x-[20deg]">
            {SECTIONS.map((sec, i) => {
                const isActive = activeSection === sec.id;
                return (
                    <div key={sec.id} className="flex items-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5">
                        <span
                            className={`transition-[opacity,border-color] duration-200 whitespace-nowrap ${isActive
                                    ? `opacity-100 font-black border-b-[1.5px] sm:border-b-2 ${borderColor}`
                                    : 'opacity-40 font-medium'
                                }`}
                        >
                            {sec.label}
                        </span>
                        {i < SECTIONS.length - 1 && (
                            <span className="opacity-30 text-[6px] sm:text-[7px]">※</span>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className={`${className} w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] -skew-x-[20deg] h-11 sm:h-12 md:h-14 lg:h-15 fixed left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8 md:bottom-12 max-w-7xl flex border-[3px] sm:border-[4px] md:border-[5px] border-white overflow-hidden bg-white backdrop-blur-md shadow-[0_0_30px_rgba(251,54,65,0.15)] z-50`}>
            {/* Background ticks */}
            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
            </div>

            {/* Underlay / Background Text (shows on white bg - text is black) */}
            <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none font-mono text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold tracking-[0.08em] sm:tracking-[0.15em] text-black select-none z-10">
                <span className="skew-x-[20deg] text-[13px] sm:text-[16px] md:text-[19px] font-black w-8 sm:w-10">R<sup className="text-[#000000] font-bold">2</sup></span>

                {/* Section Indicators */}
                {renderSections("text-black", "border-black")}

                <div className="w-8 sm:w-10"></div>
            </div>

            <div
                className="absolute left-0 top-0 bottom-0 h-full bg-gradient-to-r from-[#FB3641]/70 to-[#FB3641] shadow-[0_0_15px_rgba(251,54,65,0.6)] overflow-hidden z-20"
                style={{ width: `${progress}%` }}
            >
                {/* Inverted Foreground Text (shows on red bg - text is white) */}
                <div
                    className="absolute inset-0 h-full flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none font-mono text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold tracking-[0.08em] sm:tracking-[0.15em] text-white select-none"
                    style={{ width: `${innerWidthPercent}%` }}
                >
                    <span className="skew-x-[20deg] text-[13px] sm:text-[16px] md:text-[19px] font-black w-8 sm:w-10">R<sup className="text-[#FFFFFF] font-bold">2</sup></span>

                    {/* Section Indicators */}
                    {renderSections("text-white", "border-white")}

                    <div className="w-8 sm:w-10"></div>
                </div>
            </div>
        </div>
    );
};

export default memo(bottomProgressBar);