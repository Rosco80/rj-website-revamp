import React, { useState } from 'react';
import { X } from 'lucide-react';

const LeadCaptureModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-clay hover:text-brand-charcoal transition-colors">
          <X size={24} />
        </button>
        <h3 className="font-display text-3xl italic text-brand-charcoal mb-2">Download Quote</h3>
        <p className="text-sm font-sans text-brand-charcoal/70 mb-6">Please provide your details to receive your indicative quote PDF.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-brand-clay mb-2">Name *</label>
            <input required type="text" className="w-full bg-brand-surface border border-brand-clay/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-moss"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-brand-clay mb-2">Email *</label>
            <input required type="email" className="w-full bg-brand-surface border border-brand-clay/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-moss"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-brand-clay mb-2">Company *</label>
            <input required type="text" className="w-full bg-brand-surface border border-brand-clay/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-moss"
              value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-brand-moss text-white font-mono uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-clay transition-colors mt-4">
            Download PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
