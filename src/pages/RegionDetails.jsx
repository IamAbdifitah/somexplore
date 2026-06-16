import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Wind, Utensils, History as HistoryIcon, Camera, Award, Heart } from 'lucide-react';
import regionsData from '../data/regions.json';
import { useLanguage } from '../context/LanguageContext';
import { regionsTranslations } from '../data/regionsTranslations';

const RegionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language, toggleFavorite, isFavorite } = useLanguage();
    const region = regionsData.find(r => r.id === id);

    if (!region) {
        return (
            <div className="flex items-center justify-center h-screen text-somalia-text-main">
                {t('region_not_found')}
            </div>
        );
    }

    const name = language === 'so' ? regionsTranslations[region.id]?.name || region.name : region.name;
    const capital = language === 'so' ? regionsTranslations[region.id]?.capital || region.capital : region.capital;
    const history = language === 'so' ? regionsTranslations[region.id]?.history || region.details.history : region.details.history;
    const culture = language === 'so' ? regionsTranslations[region.id]?.culture || region.details.culture : region.details.culture;
    const wildlife = language === 'so' ? regionsTranslations[region.id]?.wildlife || region.details.wildlife : region.details.wildlife;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-somalia-dark min-h-screen"
        >
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={region.image}
                    className="w-full h-full object-cover"
                    alt={name}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-somalia-dark/40 via-transparent to-somalia-dark" />

                <button
                    onClick={() => navigate('/regions')}
                    className="absolute top-10 left-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-all z-20"
                >
                    <ArrowLeft size={24} />
                </button>

                <button
                    onClick={() => toggleFavorite(region.id)}
                    className="absolute top-10 right-10 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all z-20"
                >
                    <Heart size={24} className={isFavorite(region.id) ? "fill-red-500 text-red-500" : "text-white"} />
                </button>

                <div className="absolute bottom-20 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <MapPin className="text-somalia-blue" size={20} />
                            <span className="text-somalia-blue font-bold tracking-widest uppercase">{capital}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-7xl md:text-9xl font-black text-white tracking-tighter"
                        >
                            {name}
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex gap-4"
                    >
                        <div className="glass-morphism p-6 rounded-3xl text-center min-w-[120px]">
                            <p className="text-somalia-soft/40 text-xs font-bold uppercase mb-1">{t('pop')}</p>
                            <p className="text-somalia-text-main text-xl font-bold">{region.population}</p>
                        </div>
                        <div className="glass-morphism p-6 rounded-3xl text-center min-w-[120px]">
                            <p className="text-somalia-soft/40 text-xs font-bold uppercase mb-1">{t('est')}</p>
                            <p className="text-somalia-text-main text-xl font-bold">{region.stats.established}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-20">
                        <section>
                            <h2 className="text-3xl font-bold text-somalia-text-main mb-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-somalia-blue/10 flex items-center justify-center"><HistoryIcon className="text-somalia-blue" /></div>
                                {t('hist_context')}
                            </h2>
                            <p className="text-xl text-somalia-soft/80 leading-relaxed font-light">
                                {history}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-somalia-text-main mb-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-somalia-green/10 flex items-center justify-center"><Camera className="text-somalia-green" /></div>
                                {t('main_attract')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {region.details.attractions.map((attr, index) => (
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        key={index}
                                        className="p-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[2rem] flex items-center gap-4 group cursor-default"
                                    >
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-somalia-blue/20 group-hover:text-somalia-blue transition-all text-somalia-text-main">
                                            {index + 1}
                                        </div>
                                        <span className="text-lg text-somalia-text-main font-medium">{attr}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-somalia-text-main mb-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-somalia-accent/10 flex items-center justify-center"><Utensils className="text-somalia-accent" /></div>
                                {t('culinary')}
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {region.details.food.map((food, index) => (
                                    <span key={index} className="px-6 py-3 bg-somalia-accent/10 text-somalia-accent rounded-full border border-somalia-accent/20 font-semibold">
                                        {food}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Stats */}
                    <div className="space-y-12">
                        <div className="glass-card p-10 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-somalia-blue/10 rounded-full blur-3xl" />
                            <h3 className="text-xl font-bold text-somalia-text-main mb-6">{t('quick_facts')}</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <span className="text-somalia-soft/40">{t('area')}</span>
                                    <span className="text-somalia-text-main font-medium">{region.stats.area}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <span className="text-somalia-soft/40">{t('est')}</span>
                                    <span className="text-somalia-text-main font-medium">{region.stats.established}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <span className="text-somalia-soft/40">{t('wildlife')}</span>
                                    <span className="text-somalia-text-main font-medium text-right text-sm">{wildlife}</span>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-somalia-blue/5 rounded-3xl border border-somalia-blue/10">
                                <h4 className="text-somalia-blue font-bold text-sm uppercase mb-4 tracking-widest">{t('cultural_note')}</h4>
                                <p className="text-somalia-soft/70 text-sm leading-relaxed italic">
                                    {culture}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-somalia-blue to-somalia-green text-white shadow-2xl">
                            <Award className="mb-6 opacity-50" size={40} />
                            <h3 className="text-2xl font-bold mb-4">{t('edu_trivia')}</h3>
                            <p className="opacity-80 leading-relaxed mb-6">
                                {t('edu_desc')}
                            </p>
                            <button 
                                onClick={() => navigate('/quiz')}
                                className="w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl font-bold hover:bg-white/30 transition-all text-white"
                            >
                                {t('test_btn')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RegionDetails;
