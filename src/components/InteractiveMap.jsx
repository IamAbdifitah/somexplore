import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Star, ArrowRight, Compass, Sparkles, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import regionsData from '../data/regions.json';

const mapLocations = [
  { id: "banadir", name: "Mogadishu", tag: "Banadir", rating: "4.9", x: 65, y: 78, desc: "Capital city on the Indian Ocean" },
  { id: "maroodijeex", name: "Hargeisa", tag: "Somaliland", rating: "4.8", x: 38, y: 35, desc: "Cultural & trading metropolis" },
  { id: "jubbada-hoose", name: "Kismayo", tag: "Jubaland", rating: "4.85", x: 55, y: 90, desc: "Port city with lush archipelago beaches" },
  { id: "sahil", name: "Berbera", tag: "Somaliland", rating: "4.8", x: 44, y: 28, desc: "Historic Red Sea port & coral beaches" },
  { id: "maroodijeex", name: "Laas Geel", tag: "Somaliland", rating: "4.95", x: 42, y: 33, desc: "Ancient 5000-year-old rock art cave complex" },
  { id: "bari", name: "Bosaso", tag: "Puntland", rating: "4.75", x: 72, y: 18, desc: "Gulf of Aden commercial hub & mountains" },
  { id: "mudug", name: "Hobyo", tag: "Galmudug", rating: "4.87", x: 74, y: 55, desc: "Sultanate coastal port with golden dunes" }
];

const InteractiveMap = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [selectedLoc, setSelectedLoc] = useState(mapLocations[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredLocations = mapLocations.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.tag.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || loc.tag === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-[#071A2B]/80 backdrop-blur-xl border border-[#F3E8D0]/15 rounded-[3rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Controls & Directory */}
                <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-wider mb-3">
                            <Compass size={14} className="text-[#D8A84E]" />
                            <span>{language === 'so' ? 'Khariidada Sahanka' : 'Interactive Navigation'}</span>
                        </div>

                        <h3 className="text-3xl font-black font-heading text-white mb-2">{t('map_title')}</h3>
                        <p className="text-[#F3E8D0]/70 text-sm font-light mb-6">{t('map_sub')}</p>

                        {/* Search Input */}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]" size={18} />
                            <input
                                type="text"
                                placeholder={language === 'so' ? "Raadi magaalo ama gobol..." : "Filter places on map..."}
                                className="w-full bg-white/5 border border-[#F3E8D0]/20 rounded-2xl py-3 pl-11 pr-4 text-white text-sm placeholder:text-[#F3E8D0]/40 focus:outline-none focus:border-[#087EA4]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {['All', 'Banadir', 'Somaliland', 'Puntland', 'Jubaland', 'Galmudug'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                        activeFilter === filter
                                            ? 'bg-[#087EA4] text-white border border-white/20'
                                            : 'bg-white/5 border border-[#F3E8D0]/10 text-[#F3E8D0]/70 hover:text-white'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location List Items */}
                    <div className="space-y-3 max-h-[260px] overflow-y-auto hide-scrollbar pr-2">
                        {filteredLocations.map((loc) => (
                            <div
                                key={loc.name}
                                onClick={() => setSelectedLoc(loc)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                                    selectedLoc.name === loc.name
                                        ? 'bg-[#087EA4]/20 border-[#087EA4] shadow-lg shadow-[#087EA4]/20'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#087EA4]/20 border border-[#087EA4]/40 flex items-center justify-center text-[#087EA4]">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm leading-tight">{loc.name}</h4>
                                        <span className="text-[11px] text-[#D8A84E] font-medium">{loc.tag}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-white flex items-center gap-1">
                                    <Star size={12} className="text-[#D8A84E] fill-[#D8A84E]" />
                                    {loc.rating}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Interactive Visual Map Graphic */}
                <div className="w-full lg:w-2/3 h-[420px] md:h-[500px] bg-gradient-to-br from-[#04121F] via-[#071A2B] to-[#06243A] rounded-[2.5rem] border border-[#F3E8D0]/20 relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
                    {/* Horn of Africa Outline Graphic Silhouette */}
                    <svg className="absolute inset-0 w-full h-full opacity-25 text-[#087EA4]" viewBox="0 0 500 500" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeDasharray="4 4" d="M120,80 Q250,50 350,120 T420,280 Q320,420 180,450 T100,280 Z" />
                        <path strokeWidth="1" d="M150,100 Q280,80 380,150 T400,290" />
                    </svg>

                    {/* Ambient Mesh Glow */}
                    <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#087EA4]/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Location Pin Markers */}
                    {mapLocations.map((loc) => {
                        const isSelected = selectedLoc.name === loc.name;
                        return (
                            <motion.button
                                key={loc.name}
                                style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setSelectedLoc(loc)}
                                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                            >
                                <div className={`relative flex items-center justify-center p-2 rounded-full transition-all ${
                                    isSelected 
                                        ? 'bg-[#D8A84E] text-[#071A2B] shadow-2xl shadow-[#D8A84E]' 
                                        : 'bg-[#087EA4] text-white shadow-lg'
                                }`}>
                                    <Navigation size={isSelected ? 20 : 16} />
                                    {isSelected && (
                                        <span className="absolute -inset-2 rounded-full border border-[#D8A84E] animate-ping opacity-75" />
                                    )}
                                </div>
                                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider text-white bg-[#071A2B]/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 whitespace-nowrap shadow-md">
                                    {loc.name}
                                </span>
                            </motion.button>
                        );
                    })}

                    {/* Selected Location Popup Card */}
                    <AnimatePresence mode="wait">
                        {selectedLoc && (
                            <motion.div
                                key={selectedLoc.name}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 bg-[#071A2B]/95 backdrop-blur-xl p-6 rounded-3xl border border-[#D8A84E]/40 shadow-2xl z-30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2.5 py-0.5 bg-[#087EA4]/20 text-[#087EA4] border border-[#087EA4]/40 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            📍 {selectedLoc.tag}
                                        </span>
                                        <span className="text-[#D8A84E] font-bold text-xs flex items-center gap-1">
                                            <Star size={12} className="fill-[#D8A84E]" />
                                            {selectedLoc.rating}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black font-heading text-white">{selectedLoc.name}</h4>
                                    <p className="text-[#F3E8D0]/80 text-xs font-light">{selectedLoc.desc}</p>
                                </div>

                                <button
                                    onClick={() => navigate(`/region/${selectedLoc.id}`)}
                                    className="btn-gold py-3 px-6 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg w-full md:w-auto"
                                >
                                    <span>{language === 'so' ? 'Arag Goobta' : 'View Destination'}</span>
                                    <ArrowRight size={14} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;
