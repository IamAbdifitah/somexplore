import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Sparkles, Trophy, Settings as SettingsIcon, Compass as HomeIcon, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const location = useLocation();
    const { t } = useLanguage();

    const navItems = [
        { path: '/', icon: HomeIcon, label: t('nav_home') },
        { path: '/regions', icon: Compass, label: t('nav_regions') },
        { path: '/history', icon: BookOpen, label: t('nav_history') },
        { path: '/culture', icon: Sparkles, label: t('nav_culture') },
        { path: '/quiz', icon: Trophy, label: t('nav_quiz') },
        { path: '/settings', icon: SettingsIcon, label: t('nav_settings') },
    ];

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
            <div className="glass-morphism rounded-full px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl border border-[#F3E8D0]/15 bg-[#071A2B]/75 backdrop-blur-xl">
                
                {/* Brand Badge */}
                <Link to="/" className="flex items-center gap-2 pl-3 pr-2 py-1 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#087EA4] to-[#065A76] flex items-center justify-center shadow-lg shadow-[#087EA4]/30 group-hover:scale-105 transition-transform border border-[#F3E8D0]/30">
                        <Star size={16} className="text-[#D8A84E] fill-[#D8A84E]" />
                    </div>
                    <span className="font-heading font-black text-lg tracking-tight text-white hidden sm:inline-block">
                        Som<span className="text-[#087EA4]">Explore</span>
                    </span>
                </Link>

                {/* Nav Items */}
                <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-0.5">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="relative group px-1 py-0.5 transition-all duration-300"
                            >
                                <div className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-[#087EA4] to-[#066686] text-white shadow-lg shadow-[#087EA4]/30 border border-white/20' 
                                        : 'text-[#F3E8D0]/70 hover:text-white hover:bg-white/10'
                                }`}>
                                    <Icon size={16} className={isActive ? 'text-[#D8A84E]' : 'group-hover:text-[#087EA4]'} />
                                    <span className={isActive ? 'inline-block' : 'hidden md:inline-block'}>
                                        {item.label}
                                    </span>
                                </div>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute -inset-0.5 bg-gradient-to-r from-[#087EA4]/30 to-[#D8A84E]/20 blur-md rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

