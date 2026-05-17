import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';

const Privacy = () => {
    useEffect(() => {
        gsap.fromTo(".privacy-content",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    return (
        <div className="w-full bg-brand-surface pt-32 pb-24 min-h-screen">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for R&J Wood Trading."
                canonical="/privacy"
            />
            <div className="max-w-3xl mx-auto px-6 md:px-12 privacy-content opacity-0">
                <h1 className="text-4xl md:text-5xl font-display italic text-brand-charcoal mb-8">
                    Privacy Policy
                </h1>
                
                <div className="prose prose-stone prose-brand max-w-none text-brand-charcoal/80 font-sans">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    
                    <h2 className="text-2xl font-display text-brand-charcoal mt-8 mb-4">1. Introduction</h2>
                    <p>
                        Welcome to R&J Wood Trading. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.
                    </p>

                    <h2 className="text-2xl font-display text-brand-charcoal mt-8 mb-4">2. The Data We Collect About You</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you when you request a quote or contact us, which we have grouped together as follows:
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                    </ul>

                    <h2 className="text-2xl font-display text-brand-charcoal mt-8 mb-4">3. How We Use Your Personal Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling a timber order).</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>

                    <h2 className="text-2xl font-display text-brand-charcoal mt-8 mb-4">4. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        <br />
                        Email: <a href="mailto:info@rjwoodtrading.com" className="text-brand-moss hover:text-brand-clay underline">info@rjwoodtrading.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
