import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Utensils, History as HistoryIcon, Camera, Award, Heart, Sparkles, Compass } from 'lucide-react';
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
            <div className="flex items-center justify-center min-h-[70vh] text-[#F3E8D0]">
                <div className="glass-card p-12 text-center border border-[#F3E8D0]/20">
                    <p className="text-2xl font-bold text-white mb-6">{t('region_not_found')}</p>
                    <button onClick={() => navigate('/regions')} className="btn-primary">
                        {t('back')}
                    </button>
                </div>
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
            className="bg-[#071A2B] min-h-screen pb-24"
        >
            {/* Hero Section */}
            <section className="relative min-h-[75vh] w-full overflow-hidden flex items-end">
                <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={region.image}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
                    alt={name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-[#071A2B]/30" />

                {/* Floating Top Nav Buttons */}
                <div className="absolute top-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center z-20 max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/regions')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#071A2B]/75 backdrop-blur-md rounded-full text-white border border-[#F3E8D0]/20 hover:bg-[#071A2B] hover:border-[#087EA4] transition-all shadow-xl font-medium text-sm"
                    >
                        <ArrowLeft size={18} />
                        <span>{t('back')}</span>
                    </button>

                    <button
                        onClick={() => toggleFavorite(region.id)}
                        className="p-3 bg-[#071A2B]/75 backdrop-blur-md rounded-full border border-[#F3E8D0]/20 hover:bg-[#071A2B] transition-all z-20 shadow-xl"
                    >
                        <Heart size={20} className={isFavorite(region.id) ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                </div>

                {/* Hero Overlay Content */}
                <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 max-w-7xl w-full">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/20 backdrop-blur-md rounded-full text-[#087EA4] font-bold text-xs tracking-widest uppercase mb-4 border border-[#087EA4]/30"
                            >
                                <MapPin size={14} className="text-[#D8A84E]" />
                                <span>{capital}</span>
                            </motion.div>
                            
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-6xl md:text-8xl lg:text-9xl font-black font-heading text-white tracking-tight leading-none"
                            >
                                {name}
                            </motion.h1>
                        </div>

                        {/* Top Quick Stats Pills */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap gap-4"
                        >
                            <div className="glass-morphism p-5 md:p-6 rounded-3xl text-center min-w-[130px] border border-[#F3E8D0]/20 bg-[#071A2B]/80 backdrop-blur-xl">
                                <p className="text-[#F3E8D0]/50 text-[10px] font-extrabold uppercase mb-1 tracking-widest">{t('pop')}</p>
                                <p className="text-white text-xl font-bold">{region.population}</p>
                            </div>
                            <div className="glass-morphism p-5 md:p-6 rounded-3xl text-center min-w-[130px] border border-[#F3E8D0]/20 bg-[#071A2B]/80 backdrop-blur-xl">
                                <p className="text-[#F3E8D0]/50 text-[10px] font-extrabold uppercase mb-1 tracking-widest">{t('est')}</p>
                                <p className="text-white text-xl font-bold">{region.stats.established}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Body */}
            <div className="container mx-auto px-6 md:px-12 py-16 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    
                    {/* Left Column (2 Cols) */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Historical Context */}
                        <section className="glass-card p-8 md:p-10 border border-[#F3E8D0]/15 bg-[#071A2B]/70">
                            <h2 className="text-3xl font-black font-heading text-white mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#087EA4]/20 border border-[#087EA4]/40 flex items-center justify-center text-[#087EA4]">
                                    <HistoryIcon size={24} />
                                </div>
                                <span>{t('hist_context')}</span>
                            </h2>
                            <p className="text-lg md:text-xl text-[#F3E8D0]/90 leading-relaxed font-light">
                                {history}
                            </p>
                        </section>

                        {/* Main Attractions */}
                        <section>
                            <h2 className="text-3xl font-black font-heading text-white mb-8 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#D8A84E]/20 border border-[#D8A84E]/40 flex items-center justify-center text-[#D8A84E]">
                                    <Camera size={24} />
                                </div>
                                <span>{t('main_attract')}</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {region.details.attractions.map((attr, index) => (
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        key={index}
                                        className="p-6 bg-[#071A2B]/80 border border-[#F3E8D0]/15 hover:border-[#087EA4]/50 rounded-[2rem] flex items-center gap-5 group cursor-default shadow-xl transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-[#087EA4]/15 border border-[#087EA4]/30 flex items-center justify-center text-[#087EA4] font-black text-lg group-hover:bg-[#087EA4] group-hover:text-white transition-all flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <span className="text-lg text-white font-semibold leading-snug">{attr}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Culinary Specialties */}
                        <section className="glass-card p-8 md:p-10 border border-[#F3E8D0]/15 bg-[#071A2B]/70">
                            <h2 className="text-3xl font-black font-heading text-white mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#1EA84C]/20 border border-[#1EA84C]/40 flex items-center justify-center text-[#1EA84C]">
                                    <Utensils size={24} />
                                </div>
                                <span>{t('culinary')}</span>
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {region.details.food.map((food, index) => (
                                    <span 
                                        key={index} 
                                        className="px-6 py-3 bg-[#D8A84E]/15 text-[#D8A84E] rounded-full border border-[#D8A84E]/30 font-bold text-sm md:text-base shadow-lg"
                                    >
                                        🍽️ {food}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-10">
                        {/* Quick Facts Box */}
                        <div className="glass-card p-8 relative overflow-hidden border border-[#F3E8D0]/15 bg-[#071A2B]/80 shadow-2xl">
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#087EA4]/15 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="flex items-center gap-2 mb-6 text-[#D8A84E] font-bold text-xs uppercase tracking-widest">
                                <Sparkles size={16} />
                                <h3>{t('quick_facts')}</h3>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center py-3.5 border-b border-[#F3E8D0]/10">
                                    <span className="text-[#F3E8D0]/60 text-sm font-medium">{t('area')}</span>
                                    <span className="text-white font-bold">{region.stats.area}</span>
                                </div>
                                <div className="flex justify-between items-center py-3.5 border-b border-[#F3E8D0]/10">
                                    <span className="text-[#F3E8D0]/60 text-sm font-medium">{t('est')}</span>
                                    <span className="text-white font-bold">{region.stats.established}</span>
                                </div>
                                <div className="flex justify-between items-center py-3.5 border-b border-[#F3E8D0]/10">
                                    <span className="text-[#F3E8D0]/60 text-sm font-medium">{t('wildlife')}</span>
                                    <span className="text-white font-bold text-right text-sm">{wildlife}</span>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-[#087EA4]/10 rounded-2xl border border-[#087EA4]/20">
                                <h4 className="text-[#087EA4] font-extrabold text-xs uppercase mb-3 tracking-widest">{t('cultural_note')}</h4>
                                <p className="text-[#F3E8D0]/80 text-sm leading-relaxed italic">
                                    "{culture}"
                                </p>
                            </div>
                        </div>

                        {/* Quiz Banner Card */}
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#087EA4] via-[#066686] to-[#071A2B] text-white shadow-2xl border border-[#F3E8D0]/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8A84E]/20 rounded-full blur-2xl pointer-events-none" />
                            
                            <Award className="mb-6 text-[#D8A84E]" size={44} />
                            <h3 className="text-2xl font-black font-heading mb-3">{t('edu_trivia')}</h3>
                            <p className="text-[#F3E8D0]/80 text-sm leading-relaxed mb-6 font-light">
                                {t('edu_desc')}
                            </p>
                            <button 
                                onClick={() => navigate('/quiz')}
                                className="btn-gold w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl"
                            >
                                <Compass size={18} />
                                <span>{t('test_btn')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RegionDetails;

