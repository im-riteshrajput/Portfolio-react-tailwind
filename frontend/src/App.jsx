import { useState, useEffect } from 'react';
import './App.css'
import Home from './pages/home'
import LoadingScreen from './components/LoadingScreen';

// Determine which Tailwind breakpoint a width falls into
const getBreakpoint = (w) => {
    if (w < 640) return 'xs';
    if (w < 768) return 'sm';
    if (w < 1024) return 'md';
    if (w < 1280) return 'lg';
    if (w < 1536) return 'xl';
    return '2xl';
};

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [isGateOpen, setIsGateOpen] = useState(false);

    // Auto-reload when the viewport crosses a Tailwind breakpoint
    useEffect(() => {
        let currentBreakpoint = getBreakpoint(window.innerWidth);
        let debounceTimer = null;

        const handleResize = () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newBreakpoint = getBreakpoint(window.innerWidth);
                if (newBreakpoint !== currentBreakpoint) {
                    window.location.reload();
                }
            }, 300);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (debounceTimer) clearTimeout(debounceTimer);
        };
    }, []);

    useEffect(() => {
        // Wait for the window load event (all images, fonts, sub-resources)
        const handleLoad = () => {
            setIsLoaded(true);
        };

        if (document.readyState === 'complete') {
            setIsLoaded(true);
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    // Lock body scroll while loader is showing
    useEffect(() => {
        if (showLoader) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showLoader]);

    const handleEnterComplete = () => {
        // Unmount the loader after the gate + fog animation fully completes
        setShowLoader(false);
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-black min-h-screen">
            {showLoader && (
                <LoadingScreen 
                    isLoaded={isLoaded} 
                    onEnterStart={() => setIsGateOpen(true)}
                    onEnterComplete={handleEnterComplete} 
                />
            )}
            {/* 
                Home renders underneath the loader. Fades in as soon as the
                gates start opening (isGateOpen), so there's no white flash.
            */}
            <div style={{
                opacity: isGateOpen ? 1 : 0,
                pointerEvents: isGateOpen ? 'auto' : 'none',
                transition: 'opacity 0.6s ease-in',
            }}>
                <Home />
            </div>
        </div>
    );
}

export default App
