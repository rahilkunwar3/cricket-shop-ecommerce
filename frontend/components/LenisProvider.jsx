'use client'
import { useEffect, useRef } from "react"
import Lenis from 'lenis'

export default function LenisProvider({children}) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard easing
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        });
        lenisRef.current = lenis;

        // Animate frame for smooth experience
        function raf(time){
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy()
        }
    }, []);
    return <>{children}</>;
}