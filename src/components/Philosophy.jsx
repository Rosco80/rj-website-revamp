import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const containerRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(leftColRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
            .fromTo(rightColRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            );
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-brand-moss text-brand-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                <div className="mb-16">
                    <p className="font-mono text-brand-clay text-sm uppercase tracking-widest mb-4">Our Philosophy</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium max-w-3xl">
                        Beyond the cut. A standard rooted in ecosystem stewardship.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-y border-brand-cream/20">

                    <div ref={leftColRef} className="py-12 md:py-16 md:pr-12 border-b md:border-b-0 md:border-r border-brand-cream/20">
                        <h3 className="text-xl font-sans font-medium mb-6 text-brand-cream/60">Most focus on...</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 opacity-70">
                                <span className="font-mono mt-1 text-sm bg-brand-charcoal text-white px-2 py-0.5 rounded">01</span>
                                <p className="font-sans text-lg">Yield at any cost, prioritizing volume over sustainability.</p>
                            </li>
                            <li className="flex items-start gap-4 opacity-70">
                                <span className="font-mono mt-1 text-sm bg-brand-charcoal text-white px-2 py-0.5 rounded">02</span>
                                <p className="font-sans text-lg">Short-term gains, ignoring long-term environmental impacts.</p>
                            </li>
                            <li className="flex items-start gap-4 opacity-70">
                                <span className="font-mono mt-1 text-sm bg-brand-charcoal text-white px-2 py-0.5 rounded">03</span>
                                <p className="font-sans text-lg">Opaque supply chains with limited traceability.</p>
                            </li>
                        </ul>
                    </div>

                    <div ref={rightColRef} className="py-12 md:py-16 md:pl-12">
                        <h3 className="text-xl font-sans font-medium mb-6 text-brand-clay">We focus on...</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <span className="font-mono mt-1 text-sm bg-brand-clay text-white px-2 py-0.5 rounded">01</span>
                                <div>
                                    <h4 className="font-sans font-medium text-xl mb-1">Ecosystem Stewardship</h4>
                                    <p className="font-sans text-brand-cream/80">Selective harvesting and replanting initiatives to maintain ecological balance.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="font-mono mt-1 text-sm bg-brand-clay text-white px-2 py-0.5 rounded">02</span>
                                <div>
                                    <h4 className="font-sans font-medium text-xl mb-1">Uncompromising Standards</h4>
                                    <p className="font-sans text-brand-cream/80">Carefully selected and inspected materials delivering premium quality.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="font-mono mt-1 text-sm bg-brand-clay text-white px-2 py-0.5 rounded">03</span>
                                <div>
                                    <h4 className="font-sans font-medium text-xl mb-1">Absolute Traceability</h4>
                                    <p className="font-sans text-brand-cream/80">From certified forest to final delivery, ensuring eco-responsible positioning.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Philosophy;
