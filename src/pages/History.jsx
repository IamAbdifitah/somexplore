import React from 'react';
import { motion } from 'framer-motion';
import historyData from '../data/history.json';
import { useLanguage } from '../context/LanguageContext';

const History = () => {
    const { t, language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 max-w-4xl pb-20"
        >
            {/* Header Section */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    {t('hist_title')} <span className="text-gradient">{t('hist_gradient')}</span>
                </h1>
                <p className="text-somalia-soft/60 text-xl font-light leading-relaxed">
                    {t('hist_desc')}
                </p>
            </div>

            {/* Stacked Chronological Feed */}
            <div className="space-y-24">
                {historyData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col items-start w-full"
                    >
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl md:text-5xl font-black text-somalia-blue tracking-tighter">
                                {item.year}
                            </span>
                            <div className="h-6 w-px bg-white/20" />
                            <span className="text-somalia-soft/40 text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                {item.category}
                            </span>
                        </div>

                        {/* Event Title */}
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight hover:text-gradient transition-all duration-300">
                            {language === 'so' ? item.event_so : item.event_en}
                        </h2>

                        {/* Large Sequential Image */}
                        {item.image && (
                            <div className="w-full h-[250px] md:h-[450px] overflow-hidden rounded-[2rem] shadow-2xl mb-8 relative border border-white/10 group">
                                <img
                                    src={item.image}
                                    alt={item.event}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-somalia-dark/60 via-transparent to-transparent" />
                            </div>
                        )}

                        {/* Description Paragraph */}
                        <p className="text-somalia-soft/80 text-lg leading-relaxed text-justify mb-12 font-light">
                            {language === 'so' ? item.description_so : item.description_en}
                        </p>

                        {/* Sequential Separator */}
                        {index < historyData.length - 1 && (
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Bottom Book Section */}
            <section className="mt-32">
                <div className="glass-card p-12 md:p-20 relative overflow-hidden text-center border border-white/15">
                    <div className="absolute top-0 left-0 w-full h-full bg-somalia-mesh opacity-20" />
                    <h2 className="text-4xl font-black text-white mb-6 relative z-10">{t('read_more')}</h2>
                    <p className="text-lg text-somalia-soft/60 max-w-3xl mx-auto leading-relaxed relative z-10 mb-10">
                        {t('hist_desc')}
                    </p>
                </div>
            </section>
        </motion.div>
    );
};

export default History;
