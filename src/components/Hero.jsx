import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const containerRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const subtitleRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(containerRef.current, {
            opacity: 1,
            duration: 0.1,
        })
            .fromTo(title1Ref.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
            .fromTo(title2Ref.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.7"
            )
            .fromTo(subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(imageContainerRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                "-=1"
            )
            .fromTo(imageRef.current,
                { scale: 1.2 },
                { scale: 1, duration: 1.5, ease: "power2.out" },
                "-=1.2"
            );
    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-screen bg-brand-cream flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-12 relative opacity-0"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                <div className="flex flex-col gap-6 z-10 lg:col-span-7">
                    <p ref={subtitleRef} className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium">
                        R&J Wood Trading — Sustainable Malaysian Timber
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-brand-charcoal leading-tight">
                        <div className="overflow-hidden">
                            <span ref={title1Ref} className="block font-sans font-medium tracking-tight">Preserving heritage through</span>
                        </div>
                        <div className="overflow-hidden">
                            <span ref={title2Ref} className="block font-display italic text-brand-moss mt-2">ethical timber.</span>
                        </div>
                    </h1>
                    <div className="mt-4 max-w-lg">
                        <p className="font-sans text-brand-charcoal/80 text-lg leading-relaxed">
                            Sourced directly from our managed reserves via <span className="font-medium text-brand-clay">Vitrex Timber Industries</span>. Supplying export-grade hardwoods compliant with strict MGR parameters, defined air-dry densities, and absolute supply chain traceability.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-5 w-full">
                    <div ref={imageContainerRef} className="relative h-[400px] lg:h-[600px] w-full overflow-hidden rounded-[2rem] lg:rounded-bl-[6rem] lg:rounded-tr-[6rem] shadow-2xl">
                        <img
                            ref={imageRef}
                            src="/hero-home.jpg"
                            alt="Raw Malaysian timber logs and planks"
                            className="w-full h-full object-cover"
                            fetchpriority="high"
                            loading="eager"
                        />
                        {/* Overlay for aesthetic tint */}
                        <div className="absolute inset-0 bg-brand-moss/10 mix-blend-multiply transition-opacity hover:opacity-0 duration-700"></div>
                    </div>
                </div>

            </div>

            {/* Decorative vertical line */}
            <div className="absolute left-6 md:left-12 lg:left-24 bottom-0 w-[1px] h-32 bg-brand-moss/20 hidden lg:block"></div>
        </section>
    );
};

export default Hero;
