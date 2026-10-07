import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MapPin, Star, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import regionsData from '../data/regions.json';
import { useLanguage } from '../context/LanguageContext';
import { regionsTranslations } from '../data/regionsTranslations';

const factsEN = [
    "Somalia has the longest coastline in mainland Africa (over 3,000 km).",
    "Somalia is known as the 'Nation of Poets' due to its rich oral history.",
    "Ancient Mogadishu was a major hub for gold, ivory, and spice trade.",
    "The Laas Geel cave paintings are some of the oldest in the Horn of Africa.",
    "Somalia is home to the frankincense tree, used globally for perfumes."
];

const factsSO = [
    "Soomaaliya waxay leedahay xeebta ugu dheer qaaradda Afrika (in ka badan 3,000 km).",
    "Soomaaliya waxaa loo yaqaan 'Millaad-ka Gabayaaga' sababo la xiriira taariikhda hodanka ah ee hadalka afka ah.",
    "Muqdisho tii qadiimiga ahayd waxay aheyd xarun weyn oo ganacsi oo dahabka, fool-maroodiga, iyo udugga ah.",
    "Cave-sawirada Laas Geel waa qaar ka mid ah kuwa ugu da'da weyn Geeska Afrika.",
    "Soomaaliya waa hoyga geedka beeyada, oo adduunka oo dhan looga isticmaalo barafuunada."
];

const Home = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [currentFact, setCurrentFact] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const facts = language === 'so' ? factsSO : factsEN;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFact((prev) => (prev + 1) % facts.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [facts.length]);

    const featuredRegions = regionsData.slice(0, 3);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (!searchQuery.trim()) return;

        const query = searchQuery.toLowerCase().trim();

        // Search in regions list
        const matchedRegion = regionsData.find(
            (region) =>
                region.name.toLowerCase().includes(query) ||
                region.capital.toLowerCase().includes(query) ||
                region.details.attractions.some(attr => attr.toLowerCase().includes(query)) ||
                region.details.landmarks.some(mark => mark.toLowerCase().includes(query))
        );

        if (matchedRegion) {
            navigate(`/region/${matchedRegion.id}`);
        } else {
            // Navigate to regions list and filter
            navigate('/regions', { state: { searchTerm: searchQuery } });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-7xl"
        >
            {/* Hero Section */}
            <section className="relative min-h-[82vh] flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] mb-20 border border-[#F3E8D0]/20 shadow-2xl shadow-[#071A2B]/80 my-4">
                {/* Background Image & Overlays */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/mogadishu.png"
                        alt="Somalia Hero"
                        className="w-full h-full object-cover scale-105 filter brightness-[0.7] contrast-[1.15]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#071A2B]/80 via-[#071A2B]/40 to-[#071A2B]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#071A2B]/30 to-[#071A2B]" />
                </div>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative z-10 max-w-4xl px-6 w-full py-16"
                >
                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#071A2B]/70 backdrop-blur-xl border border-[#D8A84E]/40 rounded-full text-[#F3E8D0] text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-xl">
                        <Sparkles size={15} className="text-[#D8A84E]" />
                        <span>{t('hero_tagline')}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading text-white mb-8 tracking-tight leading-[1.05]">
                        {t('hero_title')} <br /> 
                        <span className="text-gradient-somalia">{t('hero_gradient')}</span>
                    </h1>

                    {/* Search Bar - Visit Dubai style floating bar */}
                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#087EA4] via-[#D8A84E] to-[#087EA4] rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
                        <div className="relative flex items-center bg-[#071A2B]/90 backdrop-blur-2xl border border-[#F3E8D0]/25 rounded-full p-2 shadow-2xl">
                            <div className="pl-5 pr-2 text-[#F3E8D0]/60">
                                <Search size={22} className="text-[#087EA4]" />
                            </div>
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="w-full bg-transparent py-3 text-white text-base md:text-lg placeholder:text-[#F3E8D0]/50 focus:outline-none font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn-primary flex items-center gap-2 px-6 py-3.5 rounded-full text-sm md:text-base font-bold shadow-lg"
                            >
                                <span>{language === 'so' ? 'Raadi' : 'Search'}</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>

                    {/* Quick Explore Pill CTA */}
                    <div className="flex flex-wrap justify-center gap-4 items-center">
                        <button
                            onClick={() => navigate('/regions')}
                            className="btn-gold flex items-center gap-3 text-base md:text-lg px-8 py-4 shadow-xl"
                        >
                            <Compass size={22} />
                            <span>{t('start_btn')}</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Daily Fact Section */}
            <section className="mb-24">
                <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-[#D8A84E]/30 bg-gradient-to-r from-[#071A2B]/90 via-[#071A2B]/60 to-[#071A2B]/90 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8A84E]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="w-20 h-20 bg-gradient-to-br from-[#D8A84E]/20 to-[#087EA4]/20 rounded-2xl border border-[#D8A84E]/40 flex items-center justify-center flex-shrink-0 shadow-inner">
                        <Star className="text-[#D8A84E] fill-[#D8A84E]/20 animate-pulse" size={36} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <ShieldCheck size={16} className="text-[#087EA4]" />
                            <h3 className="text-[#D8A84E] font-extrabold uppercase tracking-widest text-xs md:text-sm">
                                {t('fact_title')}
                            </h3>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentFact}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl md:text-3xl font-heading font-medium text-white leading-snug"
                            >
                                "{facts[currentFact]}"
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Featured Regions Header & Grid */}
            <section className="mb-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-wider mb-3">
                            <MapPin size={14} />
                            <span>{language === 'so' ? 'Laga Soo Doortay' : 'Curated Destinations'}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
                            {t('featured_title')}
                        </h2>
                        <p className="text-[#F3E8D0]/70 text-base md:text-lg mt-2">
                            {t('featured_subtitle')}
                        </p>
                    </div>
                    <Link 
                        to="/regions" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-[#F3E8D0]/15 hover:border-[#087EA4] text-white hover:text-[#087EA4] font-bold text-sm transition-all group w-fit"
                    >
                        <span>{t('see_all')}</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredRegions.map((region, index) => {
                        const name = language === 'so' ? regionsTranslations[region.id]?.name || region.name : region.name;
                        const capital = language === 'so' ? regionsTranslations[region.id]?.capital || region.capital : region.capital;
                        const description = language === 'so' ? regionsTranslations[region.id]?.description || region.description : region.description;

                        return (
                            <motion.div
                                key={region.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-[#F3E8D0]/15 hover:border-[#D8A84E]/50 shadow-2xl transition-all duration-500"
                                onClick={() => navigate(`/region/${region.id}`)}
                            >
                                {/* Region Image */}
                                <img
                                    src={region.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

                                {/* Floating Header Badges */}
                                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                                    <span className="px-3.5 py-1.5 bg-[#071A2B]/80 backdrop-blur-md rounded-full text-[#F3E8D0] text-xs font-bold uppercase tracking-widest border border-[#F3E8D0]/20 flex items-center gap-1.5 shadow-lg">
                                        <MapPin size={12} className="text-[#087EA4]" />
                                        {capital}
                                    </span>
                                    <span className="w-9 h-9 rounded-full bg-[#071A2B]/70 backdrop-blur-md border border-[#D8A84E]/40 flex items-center justify-center text-[#D8A84E]">
                                        <Star size={16} className="fill-[#D8A84E]" />
                                    </span>
                                </div>

                                {/* Content Details */}
                                <div className="absolute bottom-8 left-8 right-8 z-10">
                                    <h3 className="text-3xl font-black font-heading text-white mb-2 group-hover:text-[#F3E8D0] transition-colors">
                                        {name}
                                    </h3>
                                    <p className="text-[#F3E8D0]/80 text-sm line-clamp-2 mb-6 leading-relaxed font-light">
                                        {description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-[#F3E8D0]/10">
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#087EA4] flex items-center gap-1.5">
                                            {t('explored')}
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-[#087EA4] text-white flex items-center justify-center group-hover:bg-[#D8A84E] group-hover:text-[#071A2B] transition-all duration-300 shadow-lg">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </motion.div>
    );
};

export default Home;

