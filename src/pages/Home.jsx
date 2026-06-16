import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MapPin, Star } from 'lucide-react';
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
            className="container mx-auto px-6 pb-20"
        >
            {/* Hero Section */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden rounded-[3rem] mb-20 shadow-2xl">
                <div className="absolute inset-0">
                    <img
                        src="/src/assets/images/mogadishu.png"
                        alt="Somalia Hero"
                        className="w-full h-full object-cover opacity-60 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-somalia-dark/60 via-transparent to-somalia-dark" />
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative z-10 max-w-4xl px-4 w-full"
                >
                    <span className="inline-block px-4 py-1.5 bg-somalia-blue/20 backdrop-blur-md rounded-full text-somalia-blue text-sm font-semibold mb-6">
                        {t('hero_tagline')}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-somalia-text-main mb-8 tracking-tight">
                        {t('hero_title')} <br /> <span className="text-gradient">{t('hero_gradient')}</span>
                    </h1>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Search className="text-somalia-soft/40" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            className="w-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-full py-5 pl-16 pr-24 text-somalia-text-main text-lg focus:outline-none focus:ring-2 focus:ring-somalia-blue/50 transition-all shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-somalia-blue hover:bg-somalia-blue/90 text-white rounded-full p-3 font-semibold transition-all shadow"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/regions')}
                        className="btn-primary flex items-center gap-3 mx-auto text-lg px-8 py-4"
                    >
                        {t('start_btn')} <ArrowRight size={20} />
                    </button>
                </motion.div>
            </section>

            {/* Daily Fact Section */}
            <section className="mb-24">
                <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-8 border-l-4 border-l-somalia-blue">
                    <div className="w-20 h-20 bg-somalia-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                        <Star className="text-somalia-blue" size={32} />
                    </div>
                    <div>
                        <h3 className="text-somalia-blue font-bold uppercase tracking-widest text-sm mb-2">{t('fact_title')}</h3>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentFact}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-2xl md:text-3xl font-light text-somalia-soft"
                            >
                                {facts[currentFact]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Featured Regions */}
            <section className="mb-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-somalia-text-main mb-2">{t('featured_title')}</h2>
                        <p className="text-somalia-soft/60">{t('featured_subtitle')}</p>
                    </div>
                    <Link to="/regions" className="text-somalia-blue flex items-center gap-2 hover:gap-3 transition-all">
                        {t('see_all')} <ArrowRight size={18} />
                    </Link>
                </div>

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
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer"
                                onClick={() => navigate(`/region/${region.id}`)}
                            >
                                <img
                                    src={region.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-somalia-dark via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={16} className="text-somalia-blue" />
                                        <span className="text-somalia-blue text-xs font-bold uppercase tracking-widest">{capital}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-somalia-text-main mb-3">{name}</h3>
                                    <p className="text-somalia-soft/80 text-sm line-clamp-2 mb-6 group-hover:opacity-100 transition-opacity">
                                        {description}
                                    </p>
                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                        <span className="text-somalia-text-main font-medium flex items-center gap-2">{t('explored')} <Star size={14} /></span>
                                        <div className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center">
                                            <ArrowRight size={20} className="text-somalia-text-main" />
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
