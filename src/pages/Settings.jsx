import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages, Volume2, Heart, Shield, Info, ExternalLink, ChevronDown, Trash2, Eye } from 'lucide-react';
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
                    value: language === 'en' ? 'English' : 'Soomaali'
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
            className="container mx-auto px-6 py-10 max-w-4xl"
        >
            <div className="mb-16">
                <h1 className="text-5xl font-black text-somalia-text-main mb-4">{t('set_title')}</h1>
                <p className="text-somalia-soft/60">{t('set_desc')}</p>
            </div>

            <div className="space-y-12">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-6">
                        <h3 className="text-somalia-blue font-bold uppercase tracking-widest text-sm px-4">{section.title}</h3>
                        <div className="glass-card divide-y divide-white/5 overflow-hidden">
                            {section.items.map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="p-8 flex items-center justify-between hover:bg-white/5 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                                                <item.icon size={22} />
                                            </div>
                                            <div>
                                                <h4 className="text-somalia-text-main font-bold text-lg">{item.label}</h4>
                                                <p className="text-somalia-soft/40 text-sm">{item.desc}</p>
                                            </div>
                                        </div>

                                        <div>
                                            {item.type === 'toggle' && (
                                                <button
                                                    onClick={item.action}
                                                    className={`w-14 h-8 rounded-full transition-all relative ${item.value ? 'bg-somalia-blue' : 'bg-white/10'}`}
                                                >
                                                    <motion.div
                                                        animate={{ x: item.value ? 24 : 4 }}
                                                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                                                    />
                                                </button>
                                            )}
                                            {item.type === 'text' && (
                                                <button
                                                    onClick={item.action}
                                                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-somalia-text-main font-medium hover:bg-white/10"
                                                >
                                                    {item.value}
                                                </button>
                                            )}
                                            {item.type === 'expandable' && (
                                                <button
                                                    onClick={item.action}
                                                    className="p-2 hover:bg-white/10 rounded-xl transition-all"
                                                >
                                                    <ChevronDown 
                                                        size={22} 
                                                        className={`text-somalia-soft/40 transition-transform duration-300 ${item.value ? 'rotate-180 text-somalia-blue' : ''}`} 
                                                    />
                                                </button>
                                            )}
                                            {item.type === 'link' && (
                                                <ExternalLink className="text-somalia-soft/20" size={20} />
                                            )}
                                        </div>
                                    </div>

                                    {item.type === 'expandable' && item.value && (
                                        <div className="bg-black/20 p-8 space-y-4 border-t border-white/5">
                                            {favoritedRegionsData.length === 0 ? (
                                                <p className="text-somalia-soft/40 text-sm italic text-center py-6">
                                                    {language === 'so' ? "Weli ma aadan kaydsan gobollo aad jeceshahay." : "You haven't saved any favorite regions yet."}
                                                </p>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {favoritedRegionsData.map((favRegion) => {
                                                        const name = language === 'so' ? regionsTranslations[favRegion.id]?.name || favRegion.name : favRegion.name;
                                                        const capital = language === 'so' ? regionsTranslations[favRegion.id]?.capital || favRegion.capital : favRegion.capital;

                                                        return (
                                                            <div key={favRegion.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                                                                <div className="flex items-center gap-4">
                                                                    <img 
                                                                        src={favRegion.image} 
                                                                        alt={name} 
                                                                        className="w-12 h-12 object-cover rounded-xl border border-white/10"
                                                                    />
                                                                    <div>
                                                                        <h5 className="text-somalia-text-main font-bold text-sm">{name}</h5>
                                                                        <p className="text-somalia-soft/40 text-xs">{capital}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <button
                                                                        onClick={() => navigate(`/region/${favRegion.id}`)}
                                                                        className="p-2 hover:bg-somalia-blue/20 rounded-xl text-somalia-blue transition-all"
                                                                        title={language === 'so' ? "Arag" : "View"}
                                                                    >
                                                                        <Eye size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => toggleFavorite(favRegion.id)}
                                                                        className="p-2 hover:bg-red-500/20 rounded-xl text-red-500 transition-all"
                                                                        title={language === 'so' ? "Ka saar" : "Remove"}
                                                                    >
                                                                        <Trash2 size={16} />
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

                <div className="pt-20 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full text-somalia-soft/40 text-sm">
                        <Info size={16} /> {t('set_footer')}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
