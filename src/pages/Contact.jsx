import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    return (
        <div className="w-full bg-brand-cream pt-32 pb-24 min-h-screen">
            <SEO
                title="Contact Us"
                description="Get in touch with R&J Wood Trading. Send us your enquiry, ask a question, or request a custom timber solution tailored to your project."
                canonical="/contact"
            />
            <div ref={containerRef} className="max-w-4xl mx-auto px-6 md:px-12 opacity-0">

                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-brand-clay font-mono text-sm uppercase tracking-widest mb-12 hover:text-brand-moss transition-colors group">
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="text-center mb-16">
                    <p className="font-mono text-brand-clay tracking-widest uppercase text-sm font-medium mb-4">
                        Get in Touch
                    </p>
                    <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal mb-6">
                        Contact Us
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                        Have a question, need a custom solution, or want to discuss your timber requirements? Fill out the form below and our team will get back to you promptly.
                    </p>
                    <p className="max-w-2xl mx-auto text-sm text-brand-charcoal/50 font-sans mt-4">
                        Looking for an instant price estimate? Try our <Link to="/quote" className="text-brand-moss underline hover:text-brand-clay transition-colors">Quote Engine</Link>.
                    </p>
                </div>

                {/* Google Form Embed Container */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-charcoal/5 min-h-[800px] relative">
                    
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface z-10 transition-opacity duration-500">
                            {/* Minimalist Timber/Forest Wave Loader */}
                            <div className="flex gap-1.5 items-end mb-6 h-12">
                                <div className="w-1.5 bg-brand-moss/40 h-4 rounded-full animate-[pulse_1.2s_infinite_100ms]"></div>
                                <div className="w-1.5 bg-brand-moss/60 h-8 rounded-full animate-[pulse_1.2s_infinite_300ms]"></div>
                                <div className="w-1.5 bg-brand-moss h-12 rounded-full animate-[pulse_1.2s_infinite_500ms]"></div>
                                <div className="w-1.5 bg-brand-moss/60 h-8 rounded-full animate-[pulse_1.2s_infinite_700ms]"></div>
                                <div className="w-1.5 bg-brand-moss/40 h-4 rounded-full animate-[pulse_1.2s_infinite_900ms]"></div>
                            </div>
                            <p className="font-mono text-xs tracking-widest text-brand-moss uppercase animate-pulse">
                                Loading Contact Form...
                            </p>
                        </div>
                    )}

                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSf-t5HcvwiH2bJvFFge8KFp4TuQXeqLD0YcyPUe1LQpTo9nXQ/viewform?embedded=true"
                        width="100%"
                        height="800"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        className="w-full"
                        onLoad={() => setIsLoading(false)}
                    >
                        Loading enquiry form...
                    </iframe>
                </div>

                <div className="mt-12 text-center text-brand-charcoal/50 font-sans text-sm">
                    <p>Issues with the form? Contact us directly at <a href="mailto:info@rjwoodtrading.com" className="text-brand-moss hover:text-brand-clay transition-colors underline">info@rjwoodtrading.com</a></p>
                </div>

            </div>
        </div>
    );
};

export default Contact;
