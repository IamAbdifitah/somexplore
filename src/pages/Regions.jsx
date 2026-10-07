import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Globe, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import regionsData from '../data/regions.json';
import { useLanguage } from '../context/LanguageContext';
import { regionsTranslations } from '../data/regionsTranslations';

const Regions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, language, toggleFavorite, isFavorite } = useLanguage();
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const filteredRegions = regionsData.filter(region => {
        const nameTranslation = language === 'so' ? regionsTranslations[region.id]?.name || region.name : region.name;
        const capitalTranslation = language === 'so' ? regionsTranslations[region.id]?.capital || region.capital : region.capital;
        const matchesSearch = nameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            capitalTranslation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFavorite = !showFavoritesOnly || isFavorite(region.id);
        return matchesSearch && matchesFavorite;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-7xl pt-6"
        >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 bg-[#071A2B]/60 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-[#F3E8D0]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#087EA4]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles size={14} className="text-[#D8A84E]" />
                        <span>{language === 'so' ? 'Qaybaha Dalka' : 'Territories & States'}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-heading text-white mb-4 tracking-tight">
                        {t('regions_title')} <span className="text-gradient-ocean">{t('regions_gradient')}</span>
                    </h1>
                    <p className="text-[#F3E8D0]/80 text-base md:text-lg font-light leading-relaxed">
                        {t('regions_desc')}
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
                    {/* Favorite Toggle */}
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border font-bold text-sm transition-all duration-300 w-full sm:w-auto justify-center shadow-lg ${
                            showFavoritesOnly
                                ? 'bg-red-500/20 border-red-500 text-red-400 shadow-red-500/20'
                                : 'bg-[#071A2B]/90 border-[#F3E8D0]/20 text-[#F3E8D0]/80 hover:bg-white/10'
                        }`}
                    >
                        <Heart size={18} className={showFavoritesOnly ? "fill-red-500 text-red-500" : "text-[#D8A84E]"} />
                        <span>{language === 'so' ? "Gobollada Aad Jeceshahay" : "Favorite Regions"}</span>
                    </button>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]" size={18} />
                        <input
                            type="text"
                            placeholder={t('regions_search')}
                            className="w-full bg-[#071A2B]/90 border border-[#F3E8D0]/20 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-[#F3E8D0]/40 focus:outline-none focus:border-[#087EA4] transition-all font-medium text-sm shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Regions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRegions.map((region, index) => {
                    const name = language === 'so' ? regionsTranslations[region.id]?.name || region.name : region.name;
                    const capital = language === 'so' ? regionsTranslations[region.id]?.capital || region.capital : region.capital;
                    const description = language === 'so' ? regionsTranslations[region.id]?.description || region.description : region.description;

                    return (
                        <motion.div
                            key={region.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="glass-card overflow-hidden group cursor-pointer border border-[#F3E8D0]/15 hover:border-[#087EA4]/60 shadow-xl flex flex-col justify-between"
                            onClick={() => navigate(`/region/${region.id}`)}
                        >
                            {/* Card Top Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={region.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-transparent" />
                                
                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3.5 py-1.5 bg-[#071A2B]/85 backdrop-blur-md rounded-full text-[#F3E8D0] text-xs font-bold uppercase tracking-widest border border-[#F3E8D0]/20 shadow-md">
                                        {capital}
                                    </span>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(region.id);
                                    }}
                                    className="absolute top-4 right-4 p-2.5 bg-[#071A2B]/70 backdrop-blur-md rounded-full border border-white/20 hover:bg-[#071A2B] transition-all z-10 shadow-lg"
                                >
                                    <Heart
                                        size={18}
                                        className={isFavorite(region.id) ? "fill-red-500 text-red-500" : "text-white"}
                                    />
                                </button>
                            </div>

                            {/* Card Body */}
                            <div className="p-7 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-black font-heading text-white mb-3 group-hover:text-[#087EA4] transition-colors">
                                        {name}
                                    </h3>
                                    <p className="text-[#F3E8D0]/70 text-sm mb-6 line-clamp-2 min-h-[42px] leading-relaxed font-light">
                                        {description}
                                    </p>
                                </div>

                                <div>
                                    {/* Stats grid */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F3E8D0]/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#087EA4]/15 border border-[#087EA4]/30 flex items-center justify-center">
                                                <Users size={16} className="text-[#087EA4]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase text-[#F3E8D0]/50 font-bold tracking-wider">{t('pop')}</p>
                                                <p className="text-xs text-white font-bold">{region.population}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#D8A84E]/15 border border-[#D8A84E]/30 flex items-center justify-center">
                                                <Globe size={16} className="text-[#D8A84E]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase text-[#F3E8D0]/50 font-bold tracking-wider">{t('area')}</p>
                                                <p className="text-xs text-white font-bold">{region.stats.area}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="mt-6 flex items-center justify-center w-full py-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#087EA4] group-hover:text-white group-hover:border-[#087EA4] transition-all text-[#F3E8D0] font-bold text-sm gap-2">
                                        <span>{t('learn_more')}</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredRegions.length === 0 && (
                <div className="text-center py-20 glass-card border border-[#F3E8D0]/15 max-w-lg mx-auto">
                    <p className="text-[#F3E8D0]/60 text-lg font-medium">{t('regions_no_results')} "{searchTerm}"</p>
                </div>
            )}
        </motion.div>
    );
};

export default Regions;

