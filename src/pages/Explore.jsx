import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, ArrowRight, Star, Compass, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import regionsData from '../data/regions.json';
import experiencesData from '../data/experiences.json';
import eventsData from '../data/events.json';

const Explore = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { t, language } = useLanguage();
    
    const initialQuery = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState('All');
    const [selectedRegion, setSelectedRegion] = useState('All');

    const isSomali = language === 'so';

    // Combine all explore items into a unified searchable dataset
    const allItems = [
        ...regionsData.map(r => ({
            id: r.id,
            type: 'Destinations',
            title: isSomali ? r.name : r.name,
            subtitle: r.capital,
            desc: isSomali ? r.description : r.description,
            image: r.image,
            link: `/region/${r.id}`,
            rating: "4.9"
        })),
        ...experiencesData.map(e => ({
            id: e.id,
            type: 'Experiences',
            title: isSomali ? e.title_so : e.title_en,
            subtitle: e.category,
            desc: isSomali ? e.desc_so : e.desc_en,
            image: e.image,
            link: `/culture`,
            rating: "4.85"
        })),
        ...eventsData.map(ev => ({
            id: ev.id,
            type: 'Events',
            title: isSomali ? ev.title_so : ev.title_en,
            subtitle: ev.location_en + " • " + ev.date,
            desc: isSomali ? ev.desc_so : ev.desc_en,
            image: ev.image,
            link: `/events`,
            rating: "4.9"
        }))
    ];

    const filteredItems = allItems.filter(item => {
        const matchesTab = activeTab === 'All' || item.type === activeTab;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-7xl pt-6"
        >
            {/* Top Header */}
            <div className="bg-[#071A2B]/70 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-[#F3E8D0]/15 shadow-2xl mb-12 relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#087EA4]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{isSomali ? 'Katalogga Sahanka' : 'Travel Discovery Engine'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white mb-4 tracking-tight">
                    {t('exp_page_title')}
                </h1>
                <p className="text-[#F3E8D0]/80 text-base md:text-lg max-w-2xl mx-auto font-light mb-8">
                    {t('exp_page_sub')}
                </p>

                {/* Big Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#087EA4]" size={22} />
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        className="w-full bg-[#071A2B]/90 border border-[#F3E8D0]/25 rounded-full py-4 pl-14 pr-6 text-white text-lg placeholder:text-[#F3E8D0]/40 focus:outline-none focus:border-[#087EA4] shadow-inner font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Main Section with Sidebar & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Left Sidebar Filter */}
                <div className="space-y-6">
                    <div className="glass-card p-6 border border-[#F3E8D0]/15 bg-[#071A2B]/80 shadow-xl">
                        <div className="flex items-center gap-2 text-[#D8A84E] font-bold text-xs uppercase tracking-widest mb-6">
                            <Filter size={16} />
                            <h3>Filter Directory</h3>
                        </div>

                        {/* Category Tabs */}
                        <div className="space-y-2 mb-6">
                            <p className="text-[11px] font-bold uppercase text-[#F3E8D0]/50 tracking-wider">Categories</p>
                            {['All', 'Destinations', 'Experiences', 'Events'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                                        activeTab === tab
                                            ? 'bg-[#087EA4] text-white shadow-md'
                                            : 'bg-white/5 text-[#F3E8D0]/70 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span>{tab}</span>
                                    {activeTab === tab && <ArrowRight size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right 3-Column Grid */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id + index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card overflow-hidden group cursor-pointer border border-[#F3E8D0]/15 hover:border-[#087EA4]/50 shadow-xl flex flex-col justify-between"
                                onClick={() => navigate(item.link)}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-90" />
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#071A2B]/80 backdrop-blur-md rounded-full text-[#D8A84E] text-[11px] font-extrabold uppercase tracking-widest border border-[#D8A84E]/30">
                                        {item.type}
                                    </span>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-[#087EA4] text-xs font-bold mb-2">
                                            <MapPin size={12} />
                                            <span>{item.subtitle}</span>
                                        </div>
                                        <h3 className="text-xl font-black font-heading text-white mb-2 group-hover:text-[#087EA4] transition-colors leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-[#F3E8D0]/70 text-xs line-clamp-2 leading-relaxed font-light mb-4">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-[#F3E8D0]/10 flex items-center justify-between">
                                        <span className="text-xs font-bold text-white flex items-center gap-1">
                                            <Star size={12} className="text-[#D8A84E] fill-[#D8A84E]" />
                                            {item.rating}
                                        </span>
                                        <span className="text-xs font-bold text-[#087EA4] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Explore →
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 glass-card border border-[#F3E8D0]/15">
                            <p className="text-[#F3E8D0]/60 text-lg font-light">No items found matching your filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Explore;
