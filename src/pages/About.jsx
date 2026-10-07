import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Heart, Shield, Globe, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t, language } = useLanguage();

    const stats = [
        { label: t('about_stat_dest'), value: "18+", desc: "Curated Destinations" },
        { label: t('about_stat_places'), value: "50+", desc: "Historic Landmarks" },
        { label: t('about_stat_regions'), value: "6", desc: "Federal Member States" },
        { label: t('about_stat_exp'), value: "100+", desc: "Cultural Experiences" },
    ];

    const pillars = [
        {
            title: t('about_discover_t'),
            desc: t('about_discover_d'),
            icon: Compass,
            color: "#087EA4"
        },
        {
            title: t('about_exp_t'),
            desc: t('about_exp_d'),
            icon: Heart,
            color: "#D8A84E"
        },
        {
            title: t('about_explore_t'),
            desc: t('about_explore_d'),
            icon: Globe,
            color: "#1EA84C"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 pb-24 max-w-6xl pt-6"
        >
            {/* Hero Section */}
            <div className="text-center mb-20 bg-[#071A2B]/70 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-[#F3E8D0]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#087EA4]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{language === 'so' ? 'Ujeeddada SomExplore' : 'About Our Platform'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white mb-6 tracking-tight">
                    {t('about_hero_title')}
                </h1>
                
                <div className="max-w-3xl mx-auto space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#D8A84E]">{t('about_mission_title')}</h3>
                    <p className="text-[#F3E8D0]/90 text-lg md:text-xl font-light leading-relaxed">
                        {t('about_mission_desc')}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 text-center border border-[#F3E8D0]/15 bg-[#071A2B]/80 shadow-xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-[#087EA4] mb-2">{stat.value}</h2>
                        <p className="text-white font-bold text-base mb-1">{stat.label}</p>
                        <p className="text-[#F3E8D0]/50 text-xs font-light">{stat.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Why SomExplore Pillars */}
            <section className="mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-3">{t('about_why_title')}</h2>
                    <p className="text-[#F3E8D0]/70 text-base md:text-lg">Redefining Horn of Africa tourism and cultural storytelling.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className="glass-card p-10 border border-[#F3E8D0]/15 bg-[#071A2B]/75 hover:border-[#087EA4]/50 transition-all shadow-xl">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#D8A84E]">
                                <pillar.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-black font-heading text-white mb-3">{pillar.title}</h3>
                            <p className="text-[#F3E8D0]/80 text-base font-light leading-relaxed">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

export default About;
