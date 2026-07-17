import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CloseIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const DownloadIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ResumeModal = ({ onClose, pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [containerWidth, setContainerWidth] = useState(800);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";

        // Update width on resize
        const updateWidth = () => {
            setContainerWidth(Math.min(window.innerWidth * 0.9, 800));
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            document.removeEventListener("keydown", handleKey);
            window.removeEventListener("resize", updateWidth);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" style={{ WebkitBackdropFilter: 'blur(12px)' }}></div>

            {/* Modal Content */}
            <div
                className="relative z-10 max-w-4xl w-full h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header bar */}
                <div className="w-full flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-1 lg:gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#00e29d] animate-pulse"></span>
                        <span className="text-[8px] sm:text-xs text-[#FB3641] tracking-[0.2em] font-bold font-mono uppercase">
                            RESUME_FILE
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href={pdfUrl}
                            download="Ritesh_Rajput_Resume.pdf"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#00e29d]/30 hover:border-[#00e29d] hover:bg-[#00e29d]/10 transition-all duration-200 cursor-pointer"
                            style={{ background: 'rgba(10, 20, 30, 0.6)' }}
                            aria-label="Download Resume"
                        >
                            <DownloadIcon size={14} className="text-[#00e29d]" />
                            <span className="text-[10px] text-[#00e29d] font-bold font-mono tracking-widest uppercase">
                                DOWNLOAD
                            </span>
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-sm border border-white/10 hover:border-[#FB3641]/50 hover:bg-[#FB3641]/10 transition-all duration-200 cursor-pointer"
                            style={{ background: 'rgba(10, 20, 30, 0.6)' }}
                            aria-label="Close preview"
                        >
                            <CloseIcon size={16} className="text-[#84958a] hover:text-white" />
                        </button>
                    </div>
                </div>

                {/* PDF container wrapper */}
                <div
                    className="relative w-full h-full rounded-lg border border-white/10 overflow-hidden"
                    style={{
                        background: 'rgba(10, 20, 30, 0.5)',
                        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(251, 54, 65, 0.08)',
                    }}
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00e29d] z-20 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00e29d] z-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00e29d] z-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00e29d] z-20 pointer-events-none"></div>

                    {/* Scrollable PDF Area */}
                    <div className="w-full h-full overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="w-full flex justify-center p-4">
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="flex flex-col items-center gap-4"
                                loading={
                                    <div className="text-white font-mono text-xs tracking-widest flex items-center gap-3 py-20">
                                        <span className="w-2 h-2 rounded-full bg-[#00e29d] animate-pulse"></span>
                                        LOADING_DOCUMENT...
                                    </div>
                                }
                                error={
                                    <div className="text-[#FB3641] font-mono text-xs tracking-widest py-20">
                                        ERROR: FAILED_TO_LOAD_DOCUMENT
                                    </div>
                                }
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={containerWidth}
                                        className="rounded shadow-xl overflow-hidden"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                ))}
                            </Document>
                        </div>
                    </div>

                    {/* Scanlines overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
