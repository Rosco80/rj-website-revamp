import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-brand-charcoal text-brand-cream border-t border-brand-charcoal/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                {/* CTA Section */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-24">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display italic font-medium mb-6">
                            Start building responsibly.
                        </h2>
                        <p className="text-brand-cream/70 text-lg font-sans">
                            Enhance your ESG credentials with our premium, sustainability-certified timber. Let's discuss your custom cuts and processing needs.
                        </p>
                    </div>

                    <button className="group relative overflow-hidden rounded-full bg-brand-clay text-white px-8 py-4 font-sans font-medium flex items-center gap-3 transition-transform hover:scale-105">
                        <span className="relative z-10">Request a quote</span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
                    </button>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-brand-cream/10 text-sm text-brand-cream/50 font-sans">
                    <p>© {new Date().getFullYear()} R&J Wood Trading. All rights reserved.</p>

                    <div className="flex gap-6">
                        <Link to="/" className="hover:text-brand-clay transition-colors">Timber Solutions</Link>
                        <Link to="/vitrex" className="hover:text-brand-clay transition-colors">Vitrex (Sister Company)</Link>
                        <a href="#" className="hover:text-brand-clay transition-colors">Privacy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
