import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Globe, ArrowRight, Heart } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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
            className="container mx-auto px-6 pb-20"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-bold text-somalia-text-main mb-4">
                        {t('regions_title')} <span className="text-somalia-blue">{t('regions_gradient')}</span>
                    </h1>
                    <p className="text-somalia-soft/60 max-w-xl text-lg">
                        {t('regions_desc')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                    {/* Favorite Filter Toggle */}
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-semibold transition-all duration-300 w-full sm:w-auto justify-center ${
                            showFavoritesOnly
                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-somalia-soft/60 hover:bg-white/10'
                        }`}
                    >
                        <Heart size={18} className={showFavoritesOnly ? "fill-red-500 text-red-500" : ""} />
                        <span>{language === 'so' ? "Gobollada Aad Jeceshahay" : "Favorite Regions"}</span>
                    </button>

                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                            type="text"
                            placeholder={t('regions_search')}
                            className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl py-3 pl-12 pr-4 text-somalia-text-main focus:outline-none focus:ring-2 focus:ring-somalia-blue/50 transition-all"
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="glass-card overflow-hidden group cursor-pointer"
                            onClick={() => navigate(`/region/${region.id}`)}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={region.image}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt={name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-somalia-dark/95 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 bg-somalia-blue/20 backdrop-blur-md rounded-full text-somalia-blue text-xs font-bold uppercase tracking-widest border border-somalia-blue/30">
                                        {capital}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(region.id);
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all z-10"
                                >
                                    <Heart
                                        size={18}
                                        className={isFavorite(region.id) ? "fill-red-500 text-red-500" : "text-white"}
                                    />
                                </button>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-somalia-text-main mb-3 group-hover:text-somalia-blue transition-colors">
                                    {name}
                                </h3>
                                <p className="text-somalia-soft/60 text-sm mb-6 line-clamp-2 min-h-[40px]">
                                    {description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-somalia-blue/10 flex items-center justify-center">
                                            <Users size={14} className="text-somalia-blue" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-somalia-soft/40 font-bold tracking-wider">{t('pop')}</p>
                                            <p className="text-xs text-somalia-text-main font-medium">{region.population}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-somalia-green/10 flex items-center justify-center">
                                            <Globe size={14} className="text-somalia-green" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-somalia-soft/40 font-bold tracking-wider">{t('area')}</p>
                                            <p className="text-xs text-somalia-text-main font-medium">{region.stats.area}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-center w-full py-3 rounded-xl bg-white/5 group-hover:bg-somalia-blue group-hover:text-white transition-all text-somalia-soft/60 font-medium gap-2">
                                    {t('learn_more')} <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredRegions.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-somalia-soft/40 text-xl italic">{t('regions_no_results')} "{searchTerm}"</p>
                </div>
            )}
        </motion.div>
    );
};

export default Regions;
