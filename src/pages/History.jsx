import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, BookOpen } from 'lucide-react';
import historyData from '../data/history.json';
import { useLanguage } from '../context/LanguageContext';

const History = () => {
    const { t, language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 max-w-5xl pb-24 pt-6"
        >
            {/* Header Section */}
            <div className="text-center mb-24 max-w-3xl mx-auto bg-[#071A2B]/60 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-[#F3E8D0]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#087EA4]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{language === 'so' ? 'Sooyaalka Qarniyada' : 'Chronicles of Time'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white mb-6 tracking-tight">
                    {t('hist_title')} <span className="text-gradient-somalia">{t('hist_gradient')}</span>
                </h1>
                <p className="text-[#F3E8D0]/80 text-base md:text-xl font-light leading-relaxed">
                    {t('hist_desc')}
                </p>
            </div>

            {/* Timeline Feed Container */}
            <div className="relative pl-4 md:pl-8 space-y-20 border-l-2 border-gradient-to-b from-[#087EA4] via-[#D8A84E] to-[#087EA4]/30 ml-2 md:ml-6">
                {historyData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-80px" }}
                        className="relative pl-6 md:pl-10"
                    >
                        {/* Glowing Timeline Marker */}
                        <div className="absolute -left-[17px] md:-left-[25px] top-1.5 w-8 h-8 rounded-full bg-[#071A2B] border-2 border-[#D8A84E] flex items-center justify-center shadow-lg shadow-[#D8A84E]/30 z-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#087EA4] animate-pulse" />
                        </div>

                        {/* Event Header Pill */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4] text-white font-heading font-black text-2xl md:text-3xl rounded-2xl shadow-lg border border-white/20">
                                <Calendar size={18} className="text-[#D8A84E]" />
                                <span>{item.year}</span>
                            </div>
                            <span className="text-[#D8A84E] text-xs font-bold uppercase tracking-widest bg-[#D8A84E]/10 px-3.5 py-1.5 rounded-full border border-[#D8A84E]/25">
                                {item.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-4xl font-black font-heading text-white mb-6 tracking-tight leading-snug">
                            {language === 'so' ? item.event_so : item.event_en}
                        </h2>

                        {/* Featured Image */}
                        {item.image && (
                            <div className="w-full h-[260px] md:h-[480px] overflow-hidden rounded-[2.5rem] shadow-2xl mb-8 relative border border-[#F3E8D0]/15 group">
                                <img
                                    src={item.image}
                                    alt={item.event_en}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.05]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-80" />
                            </div>
                        )}

                        {/* Event Text Description */}
                        <div className="glass-card p-6 md:p-8 border border-[#F3E8D0]/15 bg-[#071A2B]/75 mb-10">
                            <p className="text-[#F3E8D0]/90 text-base md:text-lg leading-relaxed font-light text-justify">
                                {language === 'so' ? item.description_so : item.description_en}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Callout Section */}
            <section className="mt-28">
                <div className="glass-card p-10 md:p-16 relative overflow-hidden text-center border border-[#D8A84E]/30 bg-gradient-to-br from-[#071A2B] via-[#066686]/30 to-[#071A2B] shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gold-glow opacity-30 pointer-events-none" />
                    <BookOpen size={48} className="text-[#D8A84E] mx-auto mb-6 opacity-90" />
                    <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-6 relative z-10">
                        {t('read_more')}
                    </h2>
                    <p className="text-base md:text-lg text-[#F3E8D0]/80 max-w-2xl mx-auto leading-relaxed relative z-10 font-light">
                        {t('hist_desc')}
                    </p>
                </div>
            </section>
        </motion.div>
    );
};

export default History;

