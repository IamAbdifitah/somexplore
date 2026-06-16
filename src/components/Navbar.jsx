import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, BookOpen, Sparkles, Trophy, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const location = useLocation();
    const { t } = useLanguage();

    const navItems = [
        { path: '/', icon: Home, label: t('nav_home') },
        { path: '/regions', icon: Compass, label: t('nav_regions') },
        { path: '/history', icon: BookOpen, label: t('nav_history') },
        { path: '/culture', icon: Sparkles, label: t('nav_culture') },
        { path: '/quiz', icon: Trophy, label: t('nav_quiz') },
        { path: '/settings', icon: Settings, label: t('nav_settings') },
    ];

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
            <div className="glass-morphism rounded-full px-6 py-3 flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative group p-2 transition-all duration-300"
                        >
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-somalia-blue text-white shadow-lg shadow-somalia-blue/30' : 'text-somalia-soft/60 hover:text-white hover:bg-white/5'
                                }`}>
                                <Icon size={18} />
                                <span className={`text-sm font-medium ${isActive ? 'block' : 'hidden group-hover:block transition-all'}`}>
                                    {item.label}
                                </span>
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute -inset-1 bg-somalia-blue/10 blur-md rounded-full -z-10"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
