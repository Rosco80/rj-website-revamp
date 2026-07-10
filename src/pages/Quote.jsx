import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ArrowLeft, Download, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateQuote } from '../utils/quoteCalculator';
import LeadCaptureModal from '../components/quote/LeadCaptureModal';
import QuotePDF from '../components/quote/QuotePDF';
import { pdf } from '@react-pdf/renderer';

// Comprehensive Fallback Data
const fallbackSpecies = [
    { species: 'Red Meranti', standardPrice: 3600, merchandablePrice: 2760, s4sAddon: 28, kdCategory: 'B' },
    { species: 'Membatu', standardPrice: 6720, merchandablePrice: null, s4sAddon: 13, kdCategory: 'C' },
    { species: 'Merbau', standardPrice: 6960, merchandablePrice: 6264, s4sAddon: 3, kdCategory: 'C' },
    { species: 'Chengal', standardPrice: 27840, merchandablePrice: null, s4sAddon: 28, kdCategory: 'C' },
    { species: 'Kempas', standardPrice: 5280, merchandablePrice: 4800, s4sAddon: 25, kdCategory: 'C' },
    { species: 'Keruing', standardPrice: 5280, merchandablePrice: 4800, s4sAddon: 25, kdCategory: 'C' },
    { species: 'Teak', standardPrice: 13920, merchandablePrice: null, s4sAddon: 28, kdCategory: 'C' },
    { species: 'Yellow Balau', standardPrice: 7200, merchandablePrice: null, s4sAddon: 28, kdCategory: 'C' },
    { species: 'Rubber Wood', standardPrice: 2520, merchandablePrice: 2394, s4sAddon: 25, kdCategory: 'D' },
    { species: 'Red Balau', standardPrice: 5400, merchandablePrice: null, s4sAddon: 25, kdCategory: 'C' },
    { species: 'Durian', standardPrice: 2760, merchandablePrice: 2760, s4sAddon: 25, kdCategory: 'D' },
    { species: 'Sentang', standardPrice: 3600, merchandablePrice: 3420, s4sAddon: 25, kdCategory: 'D' },
    { species: 'Kelat', standardPrice: 5400, merchandablePrice: 5130, s4sAddon: 25, kdCategory: 'D' },
];

const fallbackKdRates = [
    { category: 'B', rates: [
        { thickness: '1', pricePerTon: 190 },
        { thickness: '1.25', pricePerTon: 200 },
        { thickness: '1.5', pricePerTon: 215 },
        { thickness: '1.75', pricePerTon: 245 },
        { thickness: '2', pricePerTon: 315 },
        { thickness: '2.5', pricePerTon: 350 },
    ]},
    { category: 'C', rates: [
        { thickness: '1', pricePerTon: 235 },
        { thickness: '1.25', pricePerTon: 260 },
        { thickness: '1.5', pricePerTon: 280 },
        { thickness: '1.75', pricePerTon: 295 },
        { thickness: '2', pricePerTon: 380 },
        { thickness: '2.5', pricePerTon: 430 },
    ]},
    { category: 'D', rates: [
        { thickness: '1', pricePerTon: 220 },
        { thickness: '1.25', pricePerTon: 245 },
        { thickness: '1.5', pricePerTon: 265 },
        { thickness: '1.75', pricePerTon: 280 },
        { thickness: '2', pricePerTon: 345 },
    ]}
];

const fallbackFreight = [
    { region: 'Europe', cost40ft: 27000 },
    { region: 'US', cost40ft: 36000 },
    { region: 'Africa', cost40ft: 25000 },
    { region: 'Asia', cost40ft: 12000 }
];

const fallbackSettings = { exchangeRate: 4.04, containerCapacityTon: 26, containerCapacityM3: 36, contactEmail: 'info@rjwoodtrading.com' };

const Quote = () => {
    const [speciesIdx, setSpeciesIdx] = useState(0);
    const [grade, setGrade] = useState('Standard & Better');
    
    // Dimension inputs constrained by grade
    const [thicknessIn, setThicknessIn] = useState('0.5');
    const [widthIn, setWidthIn] = useState('3.5');
    const [lengthFt, setLengthFt] = useState('10');
    const [quantity, setQuantity] = useState('1000');
    const [computedVolume, setComputedVolume] = useState(0);

    const [isS4S, setIsS4S] = useState(false);
    const [isKD, setIsKD] = useState(false);
    const [regionIdx, setRegionIdx] = useState(0);

    const [quoteResult, setQuoteResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadData, setLeadData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Update available dimensions when grade changes
    useEffect(() => {
        if (grade === 'Standard & Better') {
            setThicknessIn('0.5');
            setWidthIn('3.5'); // Default to 3.5
            // Length constraint handled in input attributes (7-16)
            if (parseFloat(lengthFt) < 7 || parseFloat(lengthFt) > 16) {
                setLengthFt('10');
            }
        } else {
            setThicknessIn('2.25');
            setWidthIn('4.75'); // Default to 4.75
            // Length constraint handled in input attributes (3-20)
            if (parseFloat(lengthFt) < 3 || parseFloat(lengthFt) > 20) {
                setLengthFt('10');
            }
        }
    }, [grade]);

    // Calculate volume automatically
    useEffect(() => {
        const t = parseFloat(thicknessIn) || 0;
        const w = parseFloat(widthIn) || 0;
        const l = parseFloat(lengthFt) || 0;
        const q = parseFloat(quantity) || 0;
        
        // Convert to meters: inch * 0.0254, ft * 0.3048
        const volM3 = (t * 0.0254) * (w * 0.0254) * (l * 0.3048) * q;
        setComputedVolume(volM3);
    }, [thicknessIn, widthIn, lengthFt, quantity]);

    const handleCalculate = (e) => {
        e.preventDefault();
        const selectedSpecies = fallbackSpecies[speciesIdx];
        const selectedRegion = fallbackFreight[regionIdx];
        const kdRates = fallbackKdRates.find(r => r.category === selectedSpecies.kdCategory)?.rates || [];

        const result = calculateQuote({
            volumeM3: computedVolume,
            thicknessInches: parseFloat(thicknessIn) || 1,
            species: selectedSpecies,
            grade,
            isS4S,
            isKD,
            kdRates,
            freightCost: selectedRegion,
            settings: fallbackSettings
        });

        setQuoteResult({
            inputs: {
                species: selectedSpecies,
                grade,
                dimensions: `${thicknessIn}" x ${widthIn}" x ${lengthFt}'`,
                quantity,
                volumeM3: computedVolume,
                isS4S,
                isKD,
                region: selectedRegion
            },
            calculation: result
        });
        
        setTimeout(() => {
            document.getElementById('quote-result')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleLeadSubmit = async (data) => {
        setLeadData(data);
        setIsModalOpen(false);
        setIsDownloading(true);

        try {
            const blob = await pdf(
                <QuotePDF quoteData={{...quoteResult, lead: data}} contactEmail={fallbackSettings.contactEmail} />
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `RJ_Quote_${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF generation failed:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleRedownload = async () => {
        if (!leadData || !quoteResult) return;
        setIsDownloading(true);
        try {
            const blob = await pdf(
                <QuotePDF quoteData={{...quoteResult, lead: leadData}} contactEmail={fallbackSettings.contactEmail} />
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `RJ_Quote_${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF generation failed:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    const hasMerchandable = fallbackSpecies[speciesIdx].merchandablePrice !== null;

    return (
        <div className="w-full bg-brand-cream pt-32 pb-24 min-h-screen">
            <SEO title="Automated Quote Engine" description="Calculate indicative pricing for premium Malaysian timber." />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-clay font-mono text-sm uppercase tracking-widest mb-12 hover:text-brand-moss transition-colors group">
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display italic text-brand-charcoal mb-6">Quote Engine</h1>
                    <p className="max-w-2xl mx-auto text-lg text-brand-charcoal/70 font-sans">
                        Calculate indicative pricing for your custom timber orders instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* INPUT FORM */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-charcoal/5">
                        <h2 className="text-2xl font-display text-brand-charcoal mb-6 flex items-center gap-2">
                            <Calculator size={24} className="text-brand-moss" /> 
                            Requirements
                        </h2>
                        
                        <form onSubmit={handleCalculate} className="space-y-6 font-sans">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">Species</label>
                                    <select className="w-full bg-brand-surface border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-moss"
                                        value={speciesIdx} onChange={(e) => {
                                            setSpeciesIdx(Number(e.target.value));
                                            if (fallbackSpecies[Number(e.target.value)].merchandablePrice === null) {
                                                setGrade('Standard & Better');
                                            }
                                        }}>
                                        {fallbackSpecies.map((s, idx) => (
                                            <option key={s.species} value={idx}>{s.species}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">Grade</label>
                                    <select className="w-full bg-brand-surface border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-moss disabled:opacity-50"
                                        value={grade} onChange={(e) => setGrade(e.target.value)} disabled={!hasMerchandable}>
                                        <option value="Standard & Better">Standard & Better</option>
                                        {hasMerchandable && <option value="Merchandable Grade">Merchandable Grade</option>}
                                    </select>
                                    {!hasMerchandable && <p className="text-xs text-brand-clay mt-1">Merchandable grade not available for this species.</p>}
                                </div>
                            </div>

                            <div className="border-t border-brand-charcoal/5 pt-6">
                                <label className="block text-sm font-semibold text-brand-charcoal mb-4">Dimensions & Quantity</label>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs text-brand-clay mb-1">Thickness (inch)</label>
                                        <select className="w-full bg-brand-surface border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-moss"
                                            value={thicknessIn} onChange={(e) => setThicknessIn(e.target.value)} disabled>
                                            {grade === 'Standard & Better' ? (
                                                <option value="0.5">0.5" (1/2")</option>
                                            ) : (
                                                <option value="2.25">2.25"</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-brand-clay mb-1">Width (inch)</label>
                                        <select className="w-full bg-brand-surface border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-moss"
                                            value={widthIn} onChange={(e) => setWidthIn(e.target.value)}>
                                            {grade === 'Standard & Better' ? (
                                                <>
                                                    <option value="3.5">3.5"</option>
                                                    <option value="4.5">4.5"</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="4.75">4.75"</option>
                                                    <option value="5.75">5.75"</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-brand-clay mb-1">
                                            Length ({grade === 'Standard & Better' ? '7-16 ft' : '3-20 ft'})
                                        </label>
                                        <input required type="number" 
                                            min={grade === 'Standard & Better' ? 7 : 3} 
                                            max={grade === 'Standard & Better' ? 16 : 20} 
                                            step="0.1" className="w-full bg-brand-surface border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-moss"
                                            value={lengthFt} onChange={(e) => setLengthFt(e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-brand-clay mb-1">Quantity (Pieces)</label>
                                        <input required type="number" min="1" step="1" className="w-full bg-brand-surface border-none rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand-moss"
                                            value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div className={`${computedVolume > 0 && computedVolume < fallbackSettings.containerCapacityM3 ? 'bg-red-50 border border-red-200' : 'bg-brand-moss/10'} rounded-xl p-3 flex flex-col justify-center`}>
                                        <span className={`text-xs font-semibold uppercase tracking-wider ${computedVolume > 0 && computedVolume < fallbackSettings.containerCapacityM3 ? 'text-red-500' : 'text-brand-moss'}`}>Computed Volume</span>
                                        <span className="text-lg font-mono text-brand-charcoal">{computedVolume.toFixed(3)} m³</span>
                                    </div>
                                </div>
                                {computedVolume > 0 && computedVolume < fallbackSettings.containerCapacityM3 && (
                                    <p className="text-xs text-red-500 mt-2 bg-red-50 p-2 rounded-lg">
                                        ⚠ Minimum order is 1 full 40ft container ({fallbackSettings.containerCapacityM3} m³). Please increase quantity or dimensions.
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-brand-charcoal/5 pt-6">
                                <label className="block text-sm font-semibold text-brand-charcoal mb-2">Processing Options</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 bg-brand-surface rounded-xl cursor-pointer hover:bg-brand-moss/10 transition-colors">
                                        <input type="checkbox" className="w-5 h-5 text-brand-moss rounded focus:ring-brand-moss" 
                                            checked={isS4S} onChange={(e) => setIsS4S(e.target.checked)} />
                                        <span className="text-brand-charcoal">Surfaced 4 Sides (S4S) (<span className="text-brand-moss font-medium">+{fallbackSpecies[speciesIdx].s4sAddon}%</span>)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-brand-surface rounded-xl cursor-pointer hover:bg-brand-moss/10 transition-colors">
                                        <input type="checkbox" className="w-5 h-5 text-brand-moss rounded focus:ring-brand-moss" 
                                            checked={isKD} onChange={(e) => setIsKD(e.target.checked)} />
                                        <span className="text-brand-charcoal">Kiln Dried (KD)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="border-t border-brand-charcoal/5 pt-6">
                                <label className="block text-sm font-semibold text-brand-charcoal mb-2">Destination Region</label>
                                <select className="w-full bg-brand-surface border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-moss"
                                    value={regionIdx} onChange={(e) => setRegionIdx(Number(e.target.value))}>
                                    {fallbackFreight.map((r, idx) => (
                                        <option key={r.region} value={idx}>{r.region} (Indicative Freight)</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" 
                                disabled={computedVolume < fallbackSettings.containerCapacityM3}
                                className={`w-full font-mono uppercase tracking-widest text-sm py-4 rounded-xl transition-colors mt-8 ${computedVolume >= fallbackSettings.containerCapacityM3 ? 'bg-brand-moss text-white hover:bg-brand-clay shadow-lg shadow-brand-moss/20' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                                {computedVolume < fallbackSettings.containerCapacityM3 ? 'Min. 1 Container Required (36 m³)' : 'Calculate Quote'}
                            </button>
                        </form>
                    </div>

                    {/* RESULTS DISPLAY */}
                    <div>
                        {quoteResult ? (
                            <div id="quote-result" className="bg-brand-charcoal text-brand-cream rounded-3xl p-8 shadow-xl sticky top-8">
                                <h2 className="text-2xl font-display mb-8 pb-4 border-b border-brand-cream/10">Indicative Summary</h2>
                                
                                <div className="space-y-4 font-sans text-sm mb-8">
                                    <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                                        <span className="text-brand-cream/60">Base Timber ({quoteResult.inputs.species.species})</span>
                                        <span>RM {quoteResult.calculation.timberCostMYR.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                    </div>
                                    {quoteResult.inputs.isKD && (
                                        <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                                            <span className="text-brand-cream/60">Kiln Drying ({quoteResult.calculation.appliedKdRate} RM/Ton)</span>
                                            <span>RM {quoteResult.calculation.kdCostMYR.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                                        <span className="text-brand-cream/60">Freight ({quoteResult.inputs.region.region} - {quoteResult.calculation.numContainers} container/s)</span>
                                        <span>RM {quoteResult.calculation.totalFreightMYR.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                    </div>
                                    
                                    <div className="pt-4">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-lg font-display text-brand-moss">Total Value</span>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold">RM {quoteResult.calculation.totalCostMYR.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                                                <div className="text-sm text-brand-cream/40">≈ ${quoteResult.calculation.totalCostUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-brand-cream/5 rounded-xl border border-brand-cream/10 mb-8">
                                    <p className="text-xs text-brand-cream/60 italic leading-relaxed text-center">
                                        * This is not the final quotation. This is just an indicative price for a full detail quotation. Please get in touch at <a href={`mailto:${fallbackSettings.contactEmail}`} className="text-brand-moss">{fallbackSettings.contactEmail}</a>
                                    </p>
                                </div>

                                {isDownloading ? (
                                    <div className="flex items-center justify-center gap-2 w-full bg-brand-moss/70 text-white font-mono uppercase tracking-widest text-sm py-4 rounded-xl">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                        Generating PDF...
                                    </div>
                                ) : leadData ? (
                                    <button 
                                        onClick={handleRedownload}
                                        className="flex items-center justify-center gap-2 w-full bg-brand-moss text-white font-mono uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white hover:text-brand-charcoal transition-colors"
                                    >
                                        <Download size={18} /> Download PDF Again
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex items-center justify-center gap-2 w-full bg-brand-cream text-brand-charcoal font-mono uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white transition-colors"
                                    >
                                        <Download size={18} /> Generate PDF
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="bg-brand-surface rounded-3xl p-8 border border-brand-charcoal/5 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                                <div className="w-16 h-16 bg-brand-moss/10 rounded-full flex items-center justify-center mb-4 text-brand-moss">
                                    <Calculator size={32} />
                                </div>
                                <h3 className="font-display text-xl text-brand-charcoal mb-2">Ready to Calculate</h3>
                                <p className="text-brand-charcoal/50 font-sans text-sm max-w-sm">Fill out the requirements on the left to see an instant indicative quote and cost breakdown.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <LeadCaptureModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleLeadSubmit} 
            />
        </div>
    );
};

export default Quote;
