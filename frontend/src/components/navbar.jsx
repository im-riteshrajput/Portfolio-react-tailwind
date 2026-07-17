import { useState } from "react";
import ValoButton from "./ValoButton";
import ResumeModal from "./ResumeModal";
import resumePdf from "../assets/documents/Ritesh_Rajput_Resume.pdf";

const navbarItems = ['Home', 'About', 'Projects', 'Contact']

function Navbar(props) {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const resumePdfUrl = resumePdf;

    return (
        <>
            <nav className={`px-4 sm:px-12 md:px-20 py-5 sm:py-8 md:py-10 flex justify-between items-center ${props.className}`}>
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#FB3641]">R<sup className="text-[#FFFFFF]">2</sup></h1>
                {/* <ul className="flex gap-10">
                    {navbarItems.map((item, index) => (
                         <li key={index} className="text-white font-mono cursor-pointer relative inline-block
                        after:content-['']
                        after:absolute
                        after:left-0
                        after:bottom-0
                        after:h-[2px]
                        after:w-full
                        after:bg-red-500
                        after:scale-x-0
                        after:origin-left
                        after:transition-transform
                        after:duration-300
                        hover:after:scale-x-100">{item}</li>
                    ))}
                </ul> */}
                <ValoButton
                    text="MY RESUME"
                    onClick={() => setIsResumeOpen(true)}
                    className="w-24 sm:w-28 md:w-32 text-[9px] sm:text-xs bg-[#FB3641] hover:bg-[#CD040E] text-[#FFFFFF] py-3 font-mono text-xs font-bold tracking-wider uppercase mb-4 cursor-pointer transition-all active:scale-95 duration-100 relative overflow-hidden group"
                />
            </nav>

            {isResumeOpen && (
                <ResumeModal
                    onClose={() => setIsResumeOpen(false)}
                    pdfUrl={resumePdfUrl}
                />
            )}
        </>
    )
}

export default Navbar