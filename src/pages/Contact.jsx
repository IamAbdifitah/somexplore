import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t, language } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 4000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-5xl pt-6"
        >
            {/* Header Section */}
            <div className="text-center mb-16 bg-[#071A2B]/70 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-[#F3E8D0]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#087EA4]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{language === 'so' ? 'Wada Xiriirka' : 'Get In Touch'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white mb-4 tracking-tight">
                    {t('contact_title')}
                </h1>
                <p className="text-[#F3E8D0]/80 text-base md:text-lg max-w-xl mx-auto font-light">
                    {t('contact_sub')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Contact Form */}
                <div className="md:col-span-2 glass-card p-8 md:p-10 border border-[#F3E8D0]/15 bg-[#071A2B]/80 shadow-2xl">
                    {submitted ? (
                        <div className="text-center py-12 space-y-4">
                            <CheckCircle2 className="text-[#1EA84C] mx-auto" size={56} />
                            <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                            <p className="text-[#F3E8D0]/70 text-sm">Thank you for reaching out to SomExplore. We will respond shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E8D0]/70 mb-2">
                                    {t('contact_name')}
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-[#F3E8D0]/20 rounded-2xl py-3.5 px-4 text-white text-base focus:outline-none focus:border-[#087EA4]"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E8D0]/70 mb-2">
                                    {t('contact_email')}
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-[#F3E8D0]/20 rounded-2xl py-3.5 px-4 text-white text-base focus:outline-none focus:border-[#087EA4]"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E8D0]/70 mb-2">
                                    {t('contact_msg')}
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full bg-white/5 border border-[#F3E8D0]/20 rounded-2xl py-3.5 px-4 text-white text-base focus:outline-none focus:border-[#087EA4]"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-xl">
                                <span>{t('contact_send')}</span>
                                <Send size={18} />
                            </button>
                        </form>
                    )}
                </div>

                {/* Right Info Box */}
                <div className="space-y-6">
                    <div className="glass-card p-8 border border-[#F3E8D0]/15 bg-[#071A2B]/80 shadow-2xl">
                        <h3 className="text-xl font-bold font-heading text-white mb-6">{t('contact_info_title')}</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#087EA4]/15 border border-[#087EA4]/30 flex items-center justify-center text-[#087EA4] flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-[#F3E8D0]/50 font-bold tracking-wider">Email Us</p>
                                    <p className="text-white font-semibold text-sm">info@somexplore.so</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#D8A84E]/15 border border-[#D8A84E]/30 flex items-center justify-center text-[#D8A84E] flex-shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-[#F3E8D0]/50 font-bold tracking-wider">Location</p>
                                    <p className="text-white font-semibold text-sm">Mogadishu, Somalia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
