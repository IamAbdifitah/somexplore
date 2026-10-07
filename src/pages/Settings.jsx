import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages, Volume2, Heart, Shield, Info, ExternalLink, ChevronDown, Trash2, Eye, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import regionsData from '../data/regions.json';
import { regionsTranslations } from '../data/regionsTranslations';

const Settings = () => {
    const navigate = useNavigate();
    const { language, setLanguage, darkMode, setDarkMode, favorites, toggleFavorite, t } = useLanguage();
    const [audio, setAudio] = useState(true);
    const [showFavList, setShowFavList] = useState(false);

    const favoritedRegionsData = regionsData.filter(r => favorites.includes(r.id));

    const sections = [
        {
            title: t('set_app'),
            items: [
                {
                    label: t('set_dark'),
                    desc: t('set_dark_desc'),
                    icon: darkMode ? Moon : Sun,
                    action: () => setDarkMode(!darkMode),
                    type: "toggle",
                    value: darkMode
                },
                {
                    label: t('set_lang'),
                    desc: t('set_lang_desc'),
                    icon: Languages,
                    action: () => setLanguage(language === 'en' ? 'so' : 'en'),
                    type: "text",
                    value: language === 'en' ? 'English (EN)' : 'Soomaali (SO)'
                }
            ]
        },
        {
            title: t('set_audio'),
            items: [
                {
                    label: t('set_sound'),
                    desc: t('set_sound_desc'),
                    icon: Volume2,
                    action: () => setAudio(!audio),
                    type: "toggle",
                    value: audio
                }
            ]
        },
        {
            title: t('set_content'),
            items: [
                {
                    label: t('set_fav'),
                    desc: t('set_fav_desc'),
                    icon: Heart,
                    action: () => setShowFavList(!showFavList),
                    type: "expandable",
                    value: showFavList
                },
                {
                    label: t('set_privacy'),
                    desc: t('set_privacy_desc'),
                    icon: Shield,
                    type: "link"
                }
            ]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 py-10 max-w-4xl pt-6"
        >
            {/* Header Section */}
            <div className="mb-12 bg-[#071A2B]/60 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-[#F3E8D0]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#087EA4]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{language === 'so' ? 'Dookhyada Aaladda' : 'User Preferences'}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-heading text-white mb-3 tracking-tight">{t('set_title')}</h1>
                <p className="text-[#F3E8D0]/80 text-base md:text-lg font-light">{t('set_desc')}</p>
            </div>

            <div className="space-y-10">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="text-[#D8A84E] font-extrabold uppercase tracking-widest text-xs px-4 flex items-center gap-2">
                            <span>{section.title}</span>
                        </h3>
                        
                        <div className="glass-card divide-y divide-[#F3E8D0]/10 overflow-hidden border border-[#F3E8D0]/15 bg-[#071A2B]/75 shadow-xl rounded-[2rem]">
                            {section.items.map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-all">
                                        <div className="flex items-center gap-5 md:gap-6">
                                            <div className="w-12 h-12 bg-[#087EA4]/15 border border-[#087EA4]/30 rounded-2xl flex items-center justify-center text-[#087EA4]">
                                                <item.icon size={22} />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-black font-heading text-lg md:text-xl">{item.label}</h4>
                                                <p className="text-[#F3E8D0]/60 text-xs md:text-sm font-light mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>

                                        <div>
                                            {item.type === 'toggle' && (
                                                <button
                                                    onClick={item.action}
                                                    className={`w-14 h-8 rounded-full transition-all relative p-1 border shadow-inner ${
                                                        item.value ? 'bg-[#087EA4] border-[#087EA4]' : 'bg-[#071A2B] border-white/20'
                                                    }`}
                                                >
                                                    <motion.div
                                                        animate={{ x: item.value ? 24 : 2 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                        className="w-5 h-5 bg-white rounded-full shadow-md"
                                                    />
                                                </button>
                                            )}
                                            {item.type === 'text' && (
                                                <button
                                                    onClick={item.action}
                                                    className="px-5 py-2.5 bg-white/5 border border-[#F3E8D0]/20 rounded-xl text-white font-bold text-sm hover:bg-[#087EA4] hover:border-[#087EA4] transition-all shadow-md"
                                                >
                                                    {item.value}
                                                </button>
                                            )}
                                            {item.type === 'expandable' && (
                                                <button
                                                    onClick={item.action}
                                                    className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
                                                >
                                                    <ChevronDown 
                                                        size={22} 
                                                        className={`text-[#F3E8D0]/60 transition-transform duration-300 ${item.value ? 'rotate-180 text-[#D8A84E]' : ''}`} 
                                                    />
                                                </button>
                                            )}
                                            {item.type === 'link' && (
                                                <ExternalLink className="text-[#F3E8D0]/40" size={20} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expandable Favorites Drawer */}
                                    {item.type === 'expandable' && item.value && (
                                        <div className="bg-[#071A2B]/90 p-6 md:p-8 space-y-4 border-t border-[#F3E8D0]/10">
                                            {favoritedRegionsData.length === 0 ? (
                                                <p className="text-[#F3E8D0]/50 text-sm italic text-center py-6">
                                                    {language === 'so' ? "Weli ma aadan kaydsan gobollo aad jeceshahay." : "You haven't saved any favorite regions yet."}
                                                </p>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {favoritedRegionsData.map((favRegion) => {
                                                        const name = language === 'so' ? regionsTranslations[favRegion.id]?.name || favRegion.name : favRegion.name;
                                                        const capital = language === 'so' ? regionsTranslations[favRegion.id]?.capital || favRegion.capital : favRegion.capital;

                                                        return (
                                                            <div key={favRegion.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#087EA4]/40 transition-all">
                                                                <div className="flex items-center gap-4">
                                                                    <img 
                                                                        src={favRegion.image} 
                                                                        alt={name} 
                                                                        className="w-12 h-12 object-cover rounded-xl border border-white/20"
                                                                    />
                                                                    <div>
                                                                        <h5 className="text-white font-bold text-sm">{name}</h5>
                                                                        <p className="text-[#F3E8D0]/50 text-xs">{capital}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <button
                                                                        onClick={() => navigate(`/region/${favRegion.id}`)}
                                                                        className="p-2 hover:bg-[#087EA4]/20 rounded-xl text-[#087EA4] transition-all"
                                                                        title={language === 'so' ? "Arag" : "View"}
                                                                    >
                                                                        <Eye size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => toggleFavorite(favRegion.id)}
                                                                        className="p-2 hover:bg-red-500/20 rounded-xl text-red-500 transition-all"
                                                                        title={language === 'so' ? "Ka saar" : "Remove"}
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Footer Tag */}
                <div className="pt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#071A2B]/80 border border-[#F3E8D0]/15 rounded-full text-[#F3E8D0]/60 text-xs md:text-sm shadow-xl font-medium">
                        <Info size={16} className="text-[#087EA4]" /> 
                        <span>{t('set_footer')}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;

