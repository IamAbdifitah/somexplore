import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MapPin, Star, Sparkles, Compass, ShieldCheck, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import regionsData from '../data/regions.json';
import experiencesData from '../data/experiences.json';
import hiddenGemsData from '../data/hiddenGems.json';
import eventsData from '../data/events.json';
import thingsToDoData from '../data/thingsToDo.json';
import InteractiveMap from '../components/InteractiveMap';
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
    const [eventFilter, setEventFilter] = useState('All');

    const isSomali = language === 'so';
    const facts = isSomali ? factsSO : factsEN;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFact((prev) => (prev + 1) % facts.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [facts.length]);

    const popularDestinations = regionsData.slice(0, 6);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    const filteredEvents = eventsData.filter(evt => eventFilter === 'All' || evt.filter === eventFilter);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-7xl"
        >
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] mb-20 border border-[#F3E8D0]/20 shadow-2xl my-2">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/mogadishu.png"
                        alt="Somalia Landscape"
                        className="w-full h-full object-cover scale-105 filter brightness-[0.65] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#071A2B]/85 via-[#071A2B]/40 to-[#071A2B]" />
                </div>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative z-10 max-w-5xl px-6 w-full py-16"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#071A2B]/80 backdrop-blur-xl border border-[#D8A84E]/40 rounded-full text-[#F3E8D0] text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-xl">
                        <Sparkles size={15} className="text-[#D8A84E]" />
                        <span>{t('hero_tagline')}</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading text-white mb-6 tracking-tight leading-[1.05]">
                        {t('hero_title')} <br /> 
                        <span className="text-gradient-somalia">{t('hero_gradient')}</span>
                    </h1>

                    <p className="text-base sm:text-xl md:text-2xl text-[#F3E8D0]/90 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                        {t('hero_subtitle')}
                    </p>

                    {/* Hero Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 items-center mb-12">
                        <button
                            onClick={() => navigate('/explore')}
                            className="btn-gold flex items-center gap-3 text-base md:text-lg px-8 py-4 shadow-xl"
                        >
                            <span>{t('start_btn')}</span>
                        </button>
                        <button
                            onClick={() => navigate('/regions')}
                            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-[#F3E8D0]/30 hover:bg-white/20 text-white font-bold text-base md:text-lg transition-all"
                        >
                            <span>{t('disc_dest_btn')}</span>
                        </button>
                    </div>

                    {/* Search Box Bar */}
                    <div className="bg-[#071A2B]/85 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-[#F3E8D0]/25 shadow-2xl max-w-3xl mx-auto text-left">
                        <p className="text-[#D8A84E] font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Compass size={16} />
                            <span>{t('where_explore')}</span>
                        </p>

                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#087EA4]" size={22} />
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="w-full bg-white/5 border border-[#F3E8D0]/20 rounded-full py-4 pl-14 pr-28 text-white placeholder:text-[#F3E8D0]/40 focus:outline-none focus:border-[#087EA4] text-base md:text-lg font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-3 px-6 text-sm font-extrabold flex items-center gap-2 shadow-lg"
                            >
                                <span>{isSomali ? 'Raadi' : 'Search'}</span>
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </section>

            {/* Daily Fact Banner */}
            <section className="mb-24">
                <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-[#D8A84E]/30 bg-gradient-to-r from-[#071A2B]/90 via-[#071A2B]/60 to-[#071A2B]/90 relative overflow-hidden">
                    <div className="w-20 h-20 bg-[#D8A84E]/15 border border-[#D8A84E]/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Star className="text-[#D8A84E] fill-[#D8A84E]" size={36} />
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
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-xl md:text-3xl font-heading font-medium text-white leading-snug"
                            >
                                "{facts[currentFact]}"
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 2. POPULAR DESTINATIONS */}
            <section className="mb-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-wider mb-3">
                            <MapPin size={14} />
                            <span>{isSomali ? 'Goobaha Ugu Caansan' : 'Top Destinations'}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
                            {t('featured_title')}
                        </h2>
                        <p className="text-[#F3E8D0]/70 text-base md:text-lg mt-2">
                            {t('featured_subtitle')}
                        </p>
                    </div>
                    <Link to="/regions" className="btn-primary py-3 px-6 text-sm font-bold flex items-center gap-2 w-fit">
                        <span>{t('see_all')}</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {popularDestinations.map((region, index) => {
                        const name = isSomali ? regionsTranslations[region.id]?.name || region.name : region.name;
                        return (
                            <motion.div
                                key={region.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group relative h-[460px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-[#F3E8D0]/15 hover:border-[#D8A84E]/50 shadow-2xl transition-all duration-500"
                                onClick={() => navigate(`/region/${region.id}`)}
                            >
                                <img
                                    src={region.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-transparent opacity-90" />

                                <div className="absolute bottom-8 left-8 right-8 z-10">
                                    <h3 className="text-3xl font-black font-heading text-white mb-1">{name}</h3>
                                    <p className="text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-4">Somalia</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-[#F3E8D0]/10">
                                        <span className="text-xs font-bold text-[#F3E8D0] flex items-center gap-1 group-hover:text-[#D8A84E] transition-colors">
                                            {t('explored')}
                                        </span>
                                        <div className="w-9 h-9 rounded-full bg-[#087EA4] text-white flex items-center justify-center group-hover:bg-[#D8A84E] group-hover:text-[#071A2B] transition-all">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 3. FEATURED EXPERIENCES */}
            <section className="mb-28">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-3">{t('feat_exp_title')}</h2>
                    <p className="text-[#F3E8D0]/70 text-base md:text-lg font-light">{t('feat_exp_sub')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {experiencesData.map((exp, index) => (
                        <div key={exp.id} className="glass-card overflow-hidden group cursor-pointer border border-[#F3E8D0]/15 hover:border-[#087EA4]/50 shadow-xl flex flex-col justify-between" onClick={() => navigate('/culture')}>
                            <div className="relative h-56 overflow-hidden">
                                <img src={exp.image} alt={exp.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-80" />
                                <span className="absolute top-4 left-4 px-3.5 py-1 bg-[#071A2B]/80 backdrop-blur-md rounded-full text-[#D8A84E] text-xs font-extrabold uppercase tracking-widest border border-[#D8A84E]/30 flex items-center gap-1.5">
                                    <span>{exp.icon}</span>
                                    <span>{exp.category}</span>
                                </span>
                            </div>

                            <div className="p-7 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-black font-heading text-white mb-3 group-hover:text-[#087EA4] transition-colors leading-snug">
                                        {isSomali ? exp.title_so : exp.title_en}
                                    </h3>
                                    <p className="text-[#F3E8D0]/70 text-sm line-clamp-2 leading-relaxed font-light mb-6">
                                        {isSomali ? exp.desc_so : exp.desc_en}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-[#087EA4] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Explore Experience →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. HIDDEN GEMS */}
            <section className="mb-28">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D8A84E]/15 rounded-full border border-[#D8A84E]/30 text-[#D8A84E] text-xs font-bold uppercase tracking-wider mb-3">
                        <Sparkles size={14} />
                        <span>{isSomali ? 'Qaybta Qarsoon' : 'Secret Landmarks'}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight">{t('hidden_gems_title')}</h2>
                    <p className="text-[#F3E8D0]/70 text-base md:text-lg mt-2 font-light">{t('hidden_gems_sub')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hiddenGemsData.map((gem) => (
                        <div key={gem.id} className="glass-card p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center border border-[#F3E8D0]/15 bg-[#071A2B]/80 hover:border-[#D8A84E]/50 transition-all shadow-2xl">
                            <img src={gem.image} alt={gem.name_en} className="w-full sm:w-44 h-44 object-cover rounded-2xl border border-white/10" />
                            <div className="space-y-2 text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <span className="text-xs font-bold text-[#087EA4] uppercase tracking-wider">{isSomali ? gem.location_so : gem.location_en}</span>
                                    <span className="text-xs font-bold text-[#D8A84E] flex items-center gap-0.5">⭐ {gem.rating}</span>
                                </div>
                                <h3 className="text-2xl font-black font-heading text-white">{isSomali ? gem.name_so : gem.name_en}</h3>
                                <p className="text-[#F3E8D0]/70 text-xs md:text-sm font-light leading-relaxed">{isSomali ? gem.desc_so : gem.desc_en}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. INTERACTIVE EXPLORE MAP */}
            <section className="mb-28">
                <InteractiveMap />
            </section>

            {/* 6. THINGS TO DO GRID */}
            <section className="mb-28">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-3">{t('things_to_do_title')}</h2>
                    <p className="text-[#F3E8D0]/70 text-base md:text-lg font-light">Explore Somalia by your favorite travel style.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {thingsToDoData.map((todo) => (
                        <div key={todo.id} onClick={() => navigate('/explore')} className="glass-card p-6 text-center border border-[#F3E8D0]/15 hover:border-[#087EA4] cursor-pointer transition-all shadow-xl group">
                            <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{todo.icon}</span>
                            <h4 className="text-white font-bold text-base mb-1">{isSomali ? todo.category_so : todo.category_en}</h4>
                            <p className="text-[#F3E8D0]/50 text-xs font-light">{isSomali ? todo.subtitle_so : todo.subtitle_en}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. EVENTS ("WHAT'S HAPPENING") */}
            <section className="mb-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight">{t('events_title')}</h2>
                        <p className="text-[#F3E8D0]/70 text-base md:text-lg mt-2 font-light">{t('events_sub')}</p>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
                        {['All', 'Upcoming', 'This Week', 'This Month'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setEventFilter(filter)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    eventFilter === filter ? 'bg-[#087EA4] text-white shadow-md' : 'text-[#F3E8D0]/60 hover:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEvents.map((evt) => (
                        <div key={evt.id} className="glass-card p-6 md:p-8 flex flex-col sm:flex-row gap-6 border border-[#F3E8D0]/15 bg-[#071A2B]/80 hover:border-[#087EA4]/50 shadow-2xl">
                            <img src={evt.image} alt={evt.title_en} className="w-full sm:w-44 h-44 object-cover rounded-2xl border border-white/10" />
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-[#087EA4]/20 text-[#087EA4] rounded-full text-xs font-bold uppercase border border-[#087EA4]/30">📍 {isSomali ? evt.location_so : evt.location_en}</span>
                                    <span className="text-xs font-bold text-[#D8A84E] flex items-center gap-1"><Calendar size={13} /> {evt.date}</span>
                                </div>
                                <h3 className="text-2xl font-black font-heading text-white">{isSomali ? evt.title_so : evt.title_en}</h3>
                                <p className="text-[#F3E8D0]/70 text-xs md:text-sm font-light leading-relaxed">{isSomali ? evt.desc_so : evt.desc_en}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

export default Home;


