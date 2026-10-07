import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Utensils, History as HistoryIcon, Camera, Award, Heart, Sparkles, Compass, Sun, ShieldCheck, ArrowRight, Share2 } from 'lucide-react';
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
                    <p className="text-2xl font-bold text-[#FFFFFF] mb-6">{t('region_not_found')}</p>
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

    // Gallery images: main image + 2 curated high-res Somali landscape photos
    const galleryImages = [
        region.image,
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#071A2B] min-h-screen pb-24"
        >
            {/* Navigation Header */}
            <div className="container mx-auto px-6 md:px-12 pt-8 pb-4 max-w-7xl flex justify-between items-center z-20">
                <button
                    onClick={() => navigate('/regions')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#071A2B]/80 backdrop-blur-md rounded-full text-white border border-[#F3E8D0]/20 hover:bg-[#071A2B] hover:border-[#087EA4] transition-all shadow-xl font-medium text-sm"
                >
                    <ArrowLeft size={18} />
                    <span>{t('back')}</span>
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: name, url: window.location.href });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied!');
                            }
                        }}
                        className="p-3 bg-[#071A2B]/80 backdrop-blur-md rounded-full border border-[#F3E8D0]/20 hover:bg-[#087EA4]/20 transition-all shadow-xl text-white"
                        title="Share"
                    >
                        <Share2 size={18} />
                    </button>
                    <button
                        onClick={() => toggleFavorite(region.id)}
                        className="p-3 bg-[#071A2B]/80 backdrop-blur-md rounded-full border border-[#F3E8D0]/20 hover:bg-[#071A2B] transition-all shadow-xl"
                    >
                        <Heart size={18} className={isFavorite(region.id) ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                </div>
            </div>

            {/* Header Title & Quick Badges */}
            <div className="container mx-auto px-6 md:px-12 py-4 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/20 backdrop-blur-md rounded-full text-[#087EA4] font-bold text-xs tracking-widest uppercase mb-3 border border-[#087EA4]/30">
                            <MapPin size={14} className="text-[#D8A84E]" />
                            <span>{capital}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight">
                            {name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#071A2B]/80 border border-[#F3E8D0]/15 px-5 py-2.5 rounded-2xl">
                            <p className="text-[#F3E8D0]/50 text-[10px] uppercase tracking-widest font-bold">{t('pop')}</p>
                            <p className="text-white font-bold text-lg">{region.population}</p>
                        </div>
                        <div className="bg-[#071A2B]/80 border border-[#F3E8D0]/15 px-5 py-2.5 rounded-2xl">
                            <p className="text-[#F3E8D0]/50 text-[10px] uppercase tracking-widest font-bold">{t('est')}</p>
                            <p className="text-white font-bold text-lg">{region.stats.established}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern 3-Image Gallery Grid: [Large Image] [Small Image] [Small Image] */}
            <section className="container mx-auto px-6 md:px-12 py-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[380px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#F3E8D0]/15">
                    {/* Large Main Image (2 cols on md+) */}
                    <div className="md:col-span-2 relative group overflow-hidden h-full">
                        <img
                            src={galleryImages[0]}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* 2 Small Images stacked vertically on right */}
                    <div className="hidden md:flex flex-col gap-4 h-full">
                        <div className="relative group overflow-hidden h-1/2 rounded-[1.5rem]">
                            <img
                                src={galleryImages[1]}
                                alt={`${name} scenery`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative group overflow-hidden h-1/2 rounded-[1.5rem]">
                            <img
                                src={galleryImages[2]}
                                alt={`${name} coast`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Body */}
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    
                    {/* Left Column (2 Cols) */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* About this Destination / Historical Context */}
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

                        {/* Top Attractions */}
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

                        {/* Culinary & Local Cuisine */}
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

                        {/* Best Time to Visit & Travel Tips */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass-card p-8 border border-[#F3E8D0]/15 bg-[#071A2B]/70">
                                <div className="w-12 h-12 rounded-2xl bg-[#D8A84E]/20 border border-[#D8A84E]/40 flex items-center justify-center text-[#D8A84E] mb-5">
                                    <Sun size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {language === 'so' ? 'Wakhtiga Ugu Fiican Bisaylka' : 'Best Time to Visit'}
                                </h3>
                                <p className="text-[#F3E8D0]/80 text-sm leading-relaxed">
                                    {language === 'so'
                                        ? 'Billeaha Oktoobar ilaa Abriil waxay bixiyaan jawi kuleyl ah oo dhexdhexaad ah iyo mowjado badda oo degan.'
                                        : 'October to April offers pleasant tropical breezes, clear coastal waters, and optimal conditions for exploration.'}
                                </p>
                            </div>

                            <div className="glass-card p-8 border border-[#F3E8D0]/15 bg-[#071A2B]/70">
                                <div className="w-12 h-12 rounded-2xl bg-[#087EA4]/20 border border-[#087EA4]/40 flex items-center justify-center text-[#087EA4] mb-5">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {language === 'so' ? 'Talooyinka Safarka' : 'Traveler Tips'}
                                </h3>
                                <p className="text-[#F3E8D0]/80 text-sm leading-relaxed">
                                    {language === 'so'
                                        ? 'Khaarajka lacagta: Shilling Somali ama USD cash. Xiriir la sameey hagayaal maxalli ah si aad u hesho waayo-aragnimo buuxda.'
                                        : 'Currency: US Dollars & Somali Shillings. Engage local certified guides for authentic, safe cultural immersion.'}
                                </p>
                            </div>
                        </div>

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
                                className="btn-gold w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl font-bold"
                            >
                                <Compass size={18} />
                                <span>{t('test_btn')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Banner */}
                <div className="mt-20 p-10 md:p-14 rounded-[3rem] bg-gradient-to-r from-[#071A2B] via-[#087EA4] to-[#071A2B] border border-[#D8A84E]/30 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#D8A84E]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
                            {language === 'so' 
                                ? `Diyaar ma u tahay in aad baarto ${name}?` 
                                : `Ready to Explore ${name}?`}
                        </h2>
                        <p className="text-[#F3E8D0]/80 text-base md:text-lg font-light">
                            {language === 'so'
                                ? 'Kala duwanaanshaha, taariikhda iyo xeebaha quruxda badan ee Soomaaliya ayaad hadda ka bilaabi kartaa.'
                                : 'Start your journey today and experience the breathtaking coastal heritage, culture, and hospitality.'}
                        </p>
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => navigate('/explore')}
                                className="btn-gold px-10 py-4 text-base font-bold rounded-2xl flex items-center gap-3 shadow-2xl"
                            >
                                <span>{language === 'so' ? 'Bilaab sahaminta' : 'Start Exploring'}</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default RegionDetails;


