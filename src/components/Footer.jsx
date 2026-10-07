import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-[#071A2B] border-t border-[#F3E8D0]/15 text-[#F3E8D0] pt-16 pb-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#087EA4]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D8A84E]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
                    
                    {/* Brand Info */}
                    <div className="md:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#087EA4] to-[#065A76] flex items-center justify-center shadow-lg border border-[#F3E8D0]/30">
                                <Star size={18} className="text-[#D8A84E] fill-[#D8A84E]" />
                            </div>
                            <span className="font-heading font-black text-2xl tracking-tight text-white">
                                Som<span className="text-[#087EA4]">Explore</span>
                            </span>
                        </Link>
                        
                        <p className="text-[#F3E8D0]/70 text-sm max-w-md font-light leading-relaxed">
                            Discover. Experience. Explore Somalia. Showcase the natural beauty, rich culture, coastline, and ancient heritage of the Horn of Africa to the world.
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#D8A84E]">
                            <Heart size={14} className="fill-[#D8A84E]" />
                            <span>Built with pride for Somalia</span>
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="space-y-3">
                        <h4 className="text-white font-heading font-bold text-base tracking-wider uppercase">{t('nav_explore')}</h4>
                        <ul className="space-y-2 text-sm font-medium text-[#F3E8D0]/70">
                            <li><Link to="/regions" className="hover:text-white transition-colors">{t('nav_destinations')}</Link></li>
                            <li><Link to="/culture" className="hover:text-white transition-colors">{t('nav_experiences')}</Link></li>
                            <li><Link to="/explore" className="hover:text-white transition-colors">{t('nav_events')}</Link></li>
                            <li><Link to="/explore" className="hover:text-white transition-colors">Places & Hidden Gems</Link></li>
                        </ul>
                    </div>

                    {/* Company & Content Links */}
                    <div className="space-y-3">
                        <h4 className="text-white font-heading font-bold text-base tracking-wider uppercase">Company & Learn</h4>
                        <ul className="space-y-2 text-sm font-medium text-[#F3E8D0]/70">
                            <li><Link to="/about" className="hover:text-white transition-colors">{t('nav_about')}</Link></li>
                            <li><Link to="/history" className="hover:text-white transition-colors">{t('nav_history')}</Link></li>
                            <li><Link to="/quiz" className="hover:text-white transition-colors">{t('nav_quiz')}</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav_contact')}</Link></li>
                            <li><Link to="/settings" className="hover:text-white transition-colors">{t('set_privacy')}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#F3E8D0]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F3E8D0]/50 font-medium">
                    <p>© 2026 SomExplore. All rights reserved.</p>
                    <p>{language === 'so' ? 'Hormarinta SomExplore' : 'Designed & Powered by SomExplore'}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
