import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Menu, X, Star, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [quickSearch, setQuickSearch] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/', label: t('nav_home') },
        { path: '/explore', label: t('nav_explore') },
        { path: '/regions', label: t('nav_destinations') },
        { path: '/culture', label: t('nav_experiences') },
        { path: '/history', label: t('nav_history') },
        { path: '/quiz', label: t('nav_quiz') },
        { path: '/about', label: t('nav_about') },
        { path: '/contact', label: t('nav_contact') },
        { path: '/settings', label: t('nav_settings') },
    ];

    const handleQuickSearchSubmit = (e) => {
        e.preventDefault();
        if (!quickSearch.trim()) return;
        setShowSearchModal(false);
        navigate(`/explore?q=${encodeURIComponent(quickSearch.trim())}`);
        setQuickSearch('');
    };

    return (
        <>
            <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled 
                    ? 'bg-[#071A2B]/95 backdrop-blur-xl border-b border-[#F3E8D0]/15 shadow-2xl shadow-[#071A2B]/80 py-3' 
                    : 'bg-gradient-to-b from-[#071A2B]/90 via-[#071A2B]/50 to-transparent py-5'
            }`}>
                <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between gap-4">
                    
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#087EA4] to-[#065A76] flex items-center justify-center shadow-lg shadow-[#087EA4]/40 border border-[#F3E8D0]/30 group-hover:scale-105 transition-transform">
                            <Star size={20} className="text-[#D8A84E] fill-[#D8A84E]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-black text-2xl tracking-tight text-white leading-none">
                                Som<span className="text-[#087EA4]">Explore</span>
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.25em] text-[#D8A84E] uppercase">Horn of Africa</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1.5 bg-[#071A2B]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F3E8D0]/15">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                                        isActive
                                            ? 'bg-[#087EA4] text-white shadow-md shadow-[#087EA4]/30 border border-white/20'
                                            : 'text-[#F3E8D0]/80 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2.5">
                        {/* Search Trigger */}
                        <button
                            onClick={() => setShowSearchModal(true)}
                            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#F3E8D0]/15 text-[#F3E8D0] transition-all"
                            title="Search"
                        >
                            <Search size={18} />
                        </button>

                        {/* Language Switcher */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'so' : 'en')}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-[#F3E8D0]/15 text-[#F3E8D0] font-bold text-xs transition-all"
                        >
                            <Globe size={15} className="text-[#087EA4]" />
                            <span>{language.toUpperCase()}</span>
                        </button>

                        {/* Explore Now Button */}
                        <button
                            onClick={() => navigate('/explore')}
                            className="hidden sm:flex btn-primary items-center gap-2 text-xs font-extrabold py-2.5 px-5 shadow-lg"
                        >
                            <span>{language === 'so' ? 'Bilow Sahanka' : 'Explore Now'}</span>
                            <ArrowRight size={14} />
                        </button>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2.5 rounded-full bg-white/5 border border-[#F3E8D0]/15 text-white"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden bg-[#071A2B] border-b border-[#F3E8D0]/15 px-6 py-6"
                        >
                            <div className="flex flex-col gap-2">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                                                isActive
                                                    ? 'bg-[#087EA4] text-white border border-white/20'
                                                    : 'text-[#F3E8D0] hover:bg-white/5'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate('/explore');
                                    }}
                                    className="btn-gold mt-4 py-3 text-center w-full font-bold flex items-center justify-center gap-2"
                                >
                                    <Compass size={18} />
                                    <span>{language === 'so' ? 'Bilow Sahanka' : 'Explore Now'}</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Quick Search Modal */}
            <AnimatePresence>
                {showSearchModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#071A2B]/80 backdrop-blur-xl flex items-start justify-center pt-24 px-4"
                        onClick={() => setShowSearchModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: -20 }}
                            className="bg-[#071A2B] border border-[#F3E8D0]/25 rounded-3xl p-6 w-full max-w-2xl shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-[#D8A84E] font-bold text-xs uppercase tracking-widest">
                                    <Sparkles size={16} />
                                    <span>{language === 'so' ? 'Raadinta Degdegga ah' : 'Quick Search'}</span>
                                </div>
                                <button onClick={() => setShowSearchModal(false)} className="text-[#F3E8D0]/60 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleQuickSearchSubmit} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]" size={20} />
                                <input
                                    type="text"
                                    placeholder={t('search_placeholder')}
                                    autoFocus
                                    className="w-full bg-white/5 border border-[#F3E8D0]/20 rounded-2xl py-4 pl-12 pr-28 text-white placeholder:text-[#F3E8D0]/40 focus:outline-none focus:border-[#087EA4] text-lg font-medium"
                                    value={quickSearch}
                                    onChange={(e) => setQuickSearch(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 btn-primary py-2 px-5 text-xs font-bold"
                                >
                                    {language === 'so' ? 'Raadi' : 'Search'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;


