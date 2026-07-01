import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    {
        id: 1,
        author: "John D.",
        company: "Architecture Firm, UK",
        rating: 5,
        text: "R&J Wood Trading delivered exceptional Balau for our marine decking project. The quality and adherence to sustainability standards were exactly what our clients demanded."
    },
    {
        id: 2,
        author: "Sarah W.",
        company: "Timber Distributor, UAE",
        rating: 5,
        text: "Reliable global shipping and top-tier Merbau. Their timber traceability system provided immense peace of mind and simplified our import compliance."
    },
    {
        id: 3,
        author: "Michael T.",
        company: "Furniture Manufacturer, Italy",
        rating: 5,
        text: "Their commitment to sustainable forestry is unmatched. The Keruing we received was flawless, perfectly milled, and arrived right on schedule."
    }
];

const Reviews = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-brand-surface px-6 md:px-12 lg:px-24 border-t border-brand-charcoal/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-4">
                        Client Feedback
                    </p>
                    <h2 className="text-4xl md:text-5xl font-display italic text-brand-charcoal">
                        Trusted Worldwide
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-brand-cream p-8 lg:p-10 rounded-2xl flex flex-col relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-brand-charcoal/5 hover:border-brand-clay/20"
                        >
                            <Quote className="absolute top-8 right-8 text-brand-clay/5 w-20 h-20 transform -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700 ease-out" />
                            
                            <div className="flex gap-1 mb-8 relative z-10">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-brand-clay text-brand-clay drop-shadow-sm" />
                                ))}
                            </div>
                            
                            <p className="text-brand-charcoal/80 font-sans leading-relaxed text-lg md:text-xl flex-grow italic mb-10 relative z-10 font-light">
                                "{review.text}"
                            </p>
                            
                            <div className="mt-auto relative z-10 border-t border-brand-charcoal/10 pt-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-surface border border-brand-charcoal/10 flex items-center justify-center text-brand-clay font-display text-xl font-medium shrink-0 group-hover:bg-brand-clay group-hover:text-white transition-colors duration-500">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-sans font-medium text-brand-charcoal text-lg">
                                        {review.author}
                                    </p>
                                    <p className="font-mono text-brand-moss text-xs tracking-widest uppercase mt-1">
                                        {review.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
