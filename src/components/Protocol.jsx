import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        title: "Sourcing",
        description: "We partner exclusively with forests certified under recognized sustainability schemes like FSC and PEFC to guarantee responsible harvesting."
    },
    {
        num: "02",
        title: "Processing",
        description: "Every piece undergoes tailored wood processing, employing low-impact practices to meet your exact specifications without compromising the environment."
    },
    {
        num: "03",
        title: "Delivery",
        description: "A secure, traceable supply chain ensures that your quality wood arrives consistently, fortifying your project's ESG credentials."
    }
];

const Protocol = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const fillRef = useRef(null);
    const stepRefs = useRef([]);

    useEffect(() => {
        // Fill line on scroll
        gsap.fromTo(fillRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom 75%",
                    scrub: true,
                }
            }
        );

        // Fade in steps
        stepRefs.current.forEach((step, index) => {
            gsap.fromTo(step,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-brand-cream text-brand-charcoal relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">The Methodology</h2>
                    <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto font-sans">
                        A meticulous approach ensuring consistency and accountability at every stage.
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Background Line */}
                    <div ref={lineRef} className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-brand-charcoal/10"></div>
                    {/* Foreground Fill Line */}
                    <div ref={fillRef} className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-brand-clay transform scale-y-0"></div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={el => stepRefs.current[index] = el}
                                className="relative pl-16 md:pl-28"
                            >
                                {/* Number node */}
                                <div className="absolute left-0 left-[0.85rem] md:left-[1.85rem] top-1 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-cream border-2 border-brand-clay flex items-center justify-center font-mono text-xs md:text-sm text-brand-clay font-medium z-10">
                                    {step.num}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-sans font-medium mb-3">{step.title}</h3>
                                <p className="text-brand-charcoal/70 text-lg leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Protocol;
