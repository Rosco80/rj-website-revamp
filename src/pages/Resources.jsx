import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, X, ArrowRight, ShieldCheck, TreePine, Droplets, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const whitepapers = [
    {
        id: 'eudr-compliance-guide',
        title: 'The Ultimate Guide to EUDR Compliance in Tropical Hardwoods',
        subtitle: 'Everything importers need to know about the EU Deforestation Regulation',
        description: 'A comprehensive technical guide covering the EU Deforestation Regulation (EUDR) and its impact on tropical hardwood imports. Covers due diligence obligations, geolocation requirements, risk assessment frameworks, and how to verify your supply chain meets the new legal thresholds. Essential reading for procurement managers and compliance officers.',
        icon: ShieldCheck,
        category: 'Compliance & Regulation',
        pages: '24 pages',
        readTime: '15 min read',
        topics: ['EUDR due diligence obligations', 'Geolocation & traceability requirements', 'Risk assessment frameworks', 'Supply chain verification', 'Country-specific benchmarks', 'Penalties & enforcement timeline'],
        color: 'brand-moss',
        downloadFile: '/resources/eudr-compliance-guide.pdf',
    },
    {
        id: 'merbau-vs-balau',
        title: 'Merbau vs. Balau: Load-Bearing Capabilities for Commercial Decking',
        subtitle: 'A data-driven comparison for architects and structural engineers',
        description: 'A head-to-head technical comparison of two of Southeast Asia\'s most popular heavy hardwoods. Includes Janka hardness ratings, modulus of rupture (MOR), modulus of elasticity (MOE), dimensional stability data, and real-world performance benchmarks for commercial decking, marine, and structural applications.',
        icon: TreePine,
        category: 'Technical Specification',
        pages: '18 pages',
        readTime: '12 min read',
        topics: ['Janka hardness comparison', 'Modulus of rupture (MOR)', 'Modulus of elasticity (MOE)', 'Dimensional stability data', 'Marine & outdoor durability', 'Cost-performance analysis'],
        color: 'brand-clay',
        downloadFile: '/resources/merbau-vs-balau-comparison.pdf',
    },
    {
        id: 'agarwood-sourcing',
        title: 'Sourcing Pure Agarwood Oil: Plantation vs. Wild Harvest',
        subtitle: 'Why plantation-grown Aquilaria Malaccensis produces superior Oud',
        description: 'An in-depth look at the global Agarwood oil market, the critical differences between wild-harvested and plantation-grown Oud, and why sustainably cultivated Aquilaria Malaccensis from Malaysian private plantations delivers a more consistent, traceable, and ethically sound product for luxury perfumeries and wellness brands.',
        icon: Droplets,
        category: 'Market Intelligence',
        pages: '14 pages',
        readTime: '10 min read',
        topics: ['Wild vs. plantation Oud', 'Aquilaria Malaccensis profile', 'Oil grading & quality markers', 'CITES compliance', 'Sustainable cultivation methods', 'Global market pricing trends'],
        color: 'brand-charcoal',
        downloadFile: '/resources/agarwood-sourcing-guide.pdf',
    }
];

const Resources = () => {
    const headerRef = useRef(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', company: '', role: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        const cards = gsap.utils.toArray('.resource-card');
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: 'power2.out'
                }
            );
        });
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedPaper) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedPaper]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "abc3b632-0b91-419d-8f11-070476427b7c",
                    subject: `New Lead: Downloaded ${selectedPaper?.title}`,
                    from_name: "R&J Lead Capture",
                    name: formData.name,
                    email: formData.email,
                    company: formData.company || "Not provided",
                    role: formData.role || "Not provided",
                    resource_downloaded: selectedPaper?.title
                }),
            });

            const result = await response.json();
            
            if (result.success) {
                setIsSubmitted(true);
                
                // After showing success, trigger the download
                setTimeout(() => {
                    if (selectedPaper?.downloadFile) {
                        const link = document.createElement('a');
                        link.href = selectedPaper.downloadFile;
                        link.download = '';
                        link.click();
                    }
                }, 1500);
            } else {
                console.error("Web3Forms error:", result);
                // Still allow download so user isn't blocked by a server error
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            // Still allow download so user isn't blocked
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setSelectedPaper(null);
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', role: '' });
    };

    return (
        <div className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">
            <SEO
                title="Technical Resources & Whitepapers"
                description="Download expert guides on EUDR compliance, Malaysian hardwood specifications, and Agarwood oil sourcing. Free technical resources for architects, procurement managers, and compliance officers."
                canonical="/resources"
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Technical Resources & Whitepapers — R&J Wood Trading",
                        "description": "Expert technical resources on EUDR compliance, tropical hardwood specifications, and sustainable Agarwood oil sourcing.",
                        "url": "https://rjwoodtrading.com/resources"
                    }
                ]}
            />

            {/* Lead Capture Modal */}
            {selectedPaper && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8" onClick={closeModal}>
                    <div 
                        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-brand-charcoal p-8 pb-6 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[url('/wood-grain-pattern.png')] bg-cover"></div>
                            <button 
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>
                            <div className="relative z-10">
                                <p className="font-mono text-brand-clay text-xs uppercase tracking-widest mb-3">
                                    {selectedPaper.category}
                                </p>
                                <h3 className="text-xl font-display italic text-white mb-2 leading-snug">
                                    {selectedPaper.title}
                                </h3>
                                <p className="text-white/60 text-sm font-sans">
                                    {selectedPaper.pages} · {selectedPaper.readTime}
                                </p>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8">
                            {isSubmitted ? (
                                /* Success State */
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-brand-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} className="text-brand-moss" />
                                    </div>
                                    <h4 className="text-2xl font-display text-brand-charcoal mb-3">You're all set!</h4>
                                    <p className="text-brand-charcoal/70 font-sans mb-2">
                                        Your download will begin automatically.
                                    </p>
                                    <p className="text-brand-charcoal/50 font-sans text-sm">
                                        We've also sent a copy to <strong>{formData.email}</strong>
                                    </p>
                                </div>
                            ) : (
                                /* Form State */
                                <>
                                    <p className="text-brand-charcoal/70 font-sans text-sm mb-6 leading-relaxed">
                                        Enter your details below to instantly download this resource. We respect your privacy and will never share your information.
                                    </p>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="lead-name" className="block text-xs font-mono uppercase tracking-widest text-brand-charcoal/60 mb-1.5">Full Name *</label>
                                            <input
                                                id="lead-name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-surface/50 font-sans text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-moss/30 focus:border-brand-moss/40 transition-all"
                                                placeholder="Andrea Rossi"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lead-email" className="block text-xs font-mono uppercase tracking-widest text-brand-charcoal/60 mb-1.5">Business Email *</label>
                                            <input
                                                id="lead-email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-surface/50 font-sans text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-moss/30 focus:border-brand-moss/40 transition-all"
                                                placeholder="name@company.com"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="lead-company" className="block text-xs font-mono uppercase tracking-widest text-brand-charcoal/60 mb-1.5">Company</label>
                                                <input
                                                    id="lead-company"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-surface/50 font-sans text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-moss/30 focus:border-brand-moss/40 transition-all"
                                                    placeholder="Company name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lead-role" className="block text-xs font-mono uppercase tracking-widest text-brand-charcoal/60 mb-1.5">Role</label>
                                                <input
                                                    id="lead-role"
                                                    type="text"
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-surface/50 font-sans text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-moss/30 focus:border-brand-moss/40 transition-all"
                                                    placeholder="e.g. Architect"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-2 bg-brand-charcoal text-brand-cream px-6 py-4 rounded-full font-sans font-medium flex items-center justify-center gap-3 hover:bg-brand-moss transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-brand-cream/30 border-t-brand-cream rounded-full animate-spin"></div>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <>
                                                    <Download size={18} />
                                                    Download Free Guide
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-[11px] text-brand-charcoal/40 font-sans mt-3">
                                            By downloading, you agree to our <Link to="/privacy" className="underline hover:text-brand-moss">Privacy Policy</Link>. No spam, ever.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-20 opacity-0">
                    <p className="font-mono text-brand-moss tracking-widest uppercase text-sm font-medium mb-4">
                        Expert Knowledge, Free to Download
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-brand-charcoal mb-8">
                        Technical Resources
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-brand-charcoal/70 font-sans leading-relaxed">
                        In-depth guides on regulatory compliance, timber specifications, and sustainable sourcing. Built for architects, procurement managers, and compliance officers who need data, not marketing fluff.
                    </p>
                </div>

                {/* Resource Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                    {whitepapers.map((paper) => (
                        <div
                            key={paper.id}
                            className="resource-card group flex flex-col bg-brand-cream rounded-3xl overflow-hidden border border-brand-charcoal/5 hover:border-brand-moss/20 hover:shadow-2xl transition-all duration-500 opacity-0"
                        >
                            {/* Card Header */}
                            <div className={`p-8 pb-6 bg-${paper.color}/5 border-b border-brand-charcoal/5`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl bg-${paper.color}/10 text-${paper.color}`}>
                                        <paper.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="font-mono text-[11px] uppercase tracking-widest text-brand-charcoal/40">
                                        {paper.category}
                                    </span>
                                </div>
                                <h2 className="text-xl font-sans font-medium text-brand-charcoal leading-snug group-hover:text-brand-moss transition-colors">
                                    {paper.title}
                                </h2>
                                <p className="text-brand-charcoal/50 text-sm font-sans mt-2 italic">
                                    {paper.subtitle}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-brand-charcoal/70 font-sans text-sm leading-relaxed mb-6">
                                    {paper.description}
                                </p>

                                {/* Topics List */}
                                <div className="mb-8">
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal/40 mb-3">What's Inside</p>
                                    <ul className="space-y-2">
                                        {paper.topics.map((topic, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-brand-charcoal/70 font-sans">
                                                <span className="text-brand-moss mt-0.5 flex-shrink-0">›</span>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-3 text-xs font-mono text-brand-charcoal/40 mb-6 mt-auto">
                                    <span className="flex items-center gap-1"><FileText size={12} /> {paper.pages}</span>
                                    <span>·</span>
                                    <span>{paper.readTime}</span>
                                    <span>·</span>
                                    <span>PDF</span>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => setSelectedPaper(paper)}
                                    className="w-full bg-brand-charcoal text-brand-cream px-6 py-4 rounded-full font-sans font-medium flex items-center justify-center gap-3 hover:bg-brand-moss transition-colors group/btn"
                                >
                                    <Download size={18} />
                                    Download Free Guide
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center bg-brand-charcoal text-brand-cream rounded-3xl p-12 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-5 bg-[url('/wood-grain-pattern.png')] bg-cover mix-blend-overlay transition-opacity duration-700 group-hover:opacity-10"></div>
                    <div className="relative z-10">
                        <p className="font-mono text-brand-clay text-xs uppercase tracking-widest mb-4">
                            Need Something More Specific?
                        </p>
                        <h2 className="text-3xl md:text-4xl font-display italic mb-4">Custom Technical Documentation</h2>
                        <p className="text-brand-cream/70 max-w-xl mx-auto mb-8 font-sans">
                            We can provide tailored PEFC certification packets, EUDR compliance reports, species-specific engineering data, and geolocated harvesting documentation for your specific project.
                        </p>
                        <Link
                            to="/quote"
                            className="inline-flex items-center bg-brand-cream text-brand-charcoal px-8 py-4 rounded-full font-sans font-medium hover:bg-brand-moss hover:text-white transition-colors duration-300"
                        >
                            Request Custom Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
