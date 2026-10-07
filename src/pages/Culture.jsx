import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Heart, Sparkles, Quote, Flame } from 'lucide-react';
import cultureData from '../data/culture.json';
import { useLanguage } from '../context/LanguageContext';

const Culture = () => {
    const { t, language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-7xl pt-6"
        >
            {/* Header Section */}
            <div className="text-center mb-20 max-w-3xl mx-auto bg-[#071A2B]/60 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-[#F3E8D0]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8A84E]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8A84E]/15 rounded-full border border-[#D8A84E]/30 text-[#D8A84E] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{language === 'so' ? 'Dhaqanka & Hiddaha' : 'Heritage & Essence'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white mb-6 tracking-tight">
                    {t('cult_title')} <span className="text-gradient-gold">{t('cult_gradient')}</span> {t('cult_title2')}
                </h1>
                <p className="text-[#F3E8D0]/80 text-base md:text-xl font-light leading-relaxed">
                    {t('cult_desc')}
                </p>
            </div>

            {/* Traditions Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-28">
                {cultureData.traditions.map((trad, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="group relative h-[520px] md:h-[600px] rounded-[3rem] overflow-hidden border border-[#F3E8D0]/20 shadow-2xl hover:border-[#D8A84E]/50 transition-all duration-500"
                    >
                        <img 
                            src={trad.image} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85]" 
                            alt={language === 'so' ? trad.name_so : trad.name_en} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-transparent opacity-95 group-hover:opacity-90 transition-opacity" />
                        
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-1.5 bg-[#071A2B]/80 backdrop-blur-md rounded-full text-[#D8A84E] text-xs font-bold uppercase tracking-widest border border-[#D8A84E]/30">
                                {language === 'so' ? 'Dhaqan Hore' : 'Heritage Tradition'}
                            </span>
                        </div>

                        <div className="absolute bottom-10 left-8 right-8 md:left-12 md:right-12 z-10">
                            <h3 className="text-3xl md:text-5xl font-black font-heading text-white mb-4">
                                {language === 'so' ? trad.name_so : trad.name_en}
                            </h3>
                            <p className="text-base md:text-xl text-[#F3E8D0]/90 font-light leading-relaxed">
                                {language === 'so' ? trad.description_so : trad.description_en}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Culinary Section */}
            <section className="mb-28">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D8A84E]/20 to-[#087EA4]/20 rounded-2xl border border-[#D8A84E]/40 flex items-center justify-center text-[#D8A84E] shadow-xl">
                        <Utensils size={28} />
                    </div>
                    <div>
                        <span className="text-[#087EA4] text-xs font-bold uppercase tracking-widest block mb-1">{t('nav_culture')}</span>
                        <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">{t('cult_cuisine')}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cultureData.food.map((food, index) => (
                        <div key={index} className="glass-card p-8 md:p-10 flex flex-col justify-between border border-[#F3E8D0]/15 bg-[#071A2B]/75 hover:border-[#087EA4]/50 shadow-2xl">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3.5 py-1 bg-[#D8A84E]/15 text-[#D8A84E] text-xs font-bold uppercase tracking-widest rounded-full border border-[#D8A84E]/30 flex items-center gap-1.5">
                                        <Flame size={12} />
                                        {language === 'so' ? 'Cunto Dhaqameed' : 'Traditional Dish'}
                                    </span>
                                </div>

                                <h3 className="text-3xl font-black font-heading text-white mb-4">
                                    {language === 'so' ? food.name_so : food.name_en}
                                </h3>

                                <p className="text-[#F3E8D0]/80 mb-8 text-base md:text-lg leading-relaxed italic font-light">
                                    "{language === 'so' ? food.description_so : food.description_en}"
                                </p>
                            </div>

                            <div className="p-6 bg-[#071A2B]/90 rounded-2xl border border-[#F3E8D0]/15">
                                <span className="text-xs font-extrabold text-[#087EA4] uppercase mb-3 block tracking-widest">
                                    {t('cult_ingredients')}
                                </span>
                                <p className="text-[#F3E8D0] font-semibold text-sm md:text-base leading-snug">
                                    {language === 'so' ? food.recipe_so : food.recipe_en}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Poetry Quote Highlight */}
            <section className="relative min-h-[420px] rounded-[3.5rem] flex items-center justify-center text-center px-6 md:px-16 overflow-hidden shadow-2xl border border-[#D8A84E]/30 bg-gradient-to-br from-[#071A2B] via-[#066686]/30 to-[#071A2B]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8A84E]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 max-w-4xl py-12">
                    <Quote className="text-[#D8A84E] mb-6 mx-auto opacity-80" size={56} />
                    <h2 className="text-2xl md:text-4xl font-heading font-light italic text-white leading-relaxed">
                        "{t('cult_quote')}"
                    </h2>
                    <div className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#071A2B]/80 border border-[#D8A84E]/40 text-[#D8A84E] font-bold tracking-widest uppercase text-xs md:text-sm">
                        <Heart size={14} className="fill-[#D8A84E]" />
                        <span>{t('cult_poet')}</span>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Culture;

