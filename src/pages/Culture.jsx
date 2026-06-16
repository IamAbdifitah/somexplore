import React from 'react';
import { motion } from 'framer-motion';
import { Music, Utensils, Heart } from 'lucide-react';
import cultureData from '../data/culture.json';
import { useLanguage } from '../context/LanguageContext';

const Culture = () => {
    const { t, language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 pb-20"
        >
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    {t('cult_title')} <span className="text-gradient">{t('cult_gradient')}</span> {t('cult_title2')}
                </h1>
                <p className="text-somalia-soft/60 text-lg">
                    {t('cult_desc')}
                </p>
            </div>

            {/* Traditions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                {cultureData.traditions.map((trad, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="group relative h-[600px] rounded-[3rem] overflow-hidden"
                    >
                        <img src={trad.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={language === 'so' ? trad.name_so : trad.name_en} />
                        <div className="absolute inset-0 bg-gradient-to-t from-somalia-dark via-somalia-dark/20 to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12">
                            <h3 className="text-4xl font-bold text-white mb-4">
                                {language === 'so' ? trad.name_so : trad.name_en}
                            </h3>
                            <p className="text-xl text-somalia-soft/80 font-light leading-relaxed mb-6">
                                {language === 'so' ? trad.description_so : trad.description_en}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Culinary Section */}
            <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-somalia-accent/20 rounded-2xl flex items-center justify-center">
                        <Utensils className="text-somalia-accent" size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-white">{t('cult_cuisine')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cultureData.food.map((food, index) => (
                        <div key={index} className="glass-card p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-somalia-accent" />
                                    <span className="text-somalia-accent text-xs font-bold uppercase tracking-widest">{t('nav_culture')}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    {language === 'so' ? food.name_so : food.name_en}
                                </h3>
                                <p className="text-somalia-soft/70 mb-8 leading-relaxed italic">
                                    {`"${language === 'so' ? food.description_so : food.description_en}"`}
                                </p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <span className="text-xs font-bold text-somalia-soft/40 uppercase mb-3 block tracking-wider">{t('cult_ingredients')}</span>
                                <p className="text-somalia-blue font-medium">
                                    {language === 'so' ? food.recipe_so : food.recipe_en}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Poetry Quote */}
            <section className="relative h-[400px] rounded-[3rem] flex items-center justify-center text-center px-4 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-somalia-blue/40 to-somalia-green/40 opacity-20" />
                <div className="absolute inset-0 bg-somalia-mesh opacity-10" />
                <div className="relative z-10 max-w-4xl">
                    <Heart className="text-somalia-blue mb-8 mx-auto opacity-50" size={48} />
                    <h2 className="text-2xl md:text-4xl font-light italic text-white leading-snug">
                        {`"${t('cult_quote')}"`}
                    </h2>
                    <p className="mt-8 text-somalia-soft/60 font-bold tracking-widest uppercase text-sm">{t('cult_poet')}</p>
                </div>
            </section>
        </motion.div>
    );
};

export default Culture;
