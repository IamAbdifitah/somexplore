import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navbar
        nav_home: "Home",
        nav_regions: "Regions",
        nav_history: "History",
        nav_culture: "Culture",
        nav_quiz: "Quiz",
        nav_settings: "Settings",

        // Home
        hero_tagline: "E X P L O R E   T H E   U N E X P L O R E D",
        hero_title: "Journey Through",
        hero_gradient: "Somalia",
        search_placeholder: "Search regions, landmarks, history...",
        start_btn: "Start Exploring",
        fact_title: "Did You Know?",
        featured_title: "Featured Regions",
        featured_subtitle: "Discover the diverse states of Somalia",
        see_all: "See all Regions",
        explored: "Explored",

        // Regions
        regions_title: "Federal States &",
        regions_gradient: "Regions",
        regions_desc: "Explore the diverse administrative regions of Somalia, each with its own unique heritage, geography, and culture.",
        regions_search: "Search regions...",
        regions_no_results: "No regions found matching",
        pop: "Population",
        area: "Area",
        learn_more: "Learn More",

        // Region Details
        back: "Back",
        region_not_found: "Region not found",
        est: "Established",
        hist_context: "Historical Context",
        main_attract: "Main Attractions",
        culinary: "Culinary Specialties",
        quick_facts: "Quick Facts",
        wildlife: "Wildlife",
        cultural_note: "Cultural Note",
        edu_trivia: "Educational Trivia",
        edu_desc: "Did you know this region contributes significantly to Somalia's national identity through its local landmarks and historical legacy?",
        test_btn: "Test Knowledge",

        // History
        hist_title: "A Journey Through",
        hist_gradient: "Time",
        hist_desc: "Ka baro taariikhda guud ee dalka iyo dadka Soomaaliyeed cutubyadii laga soo qaatay buugga Daraasaadka ee Prof. Maxamed Cilmi Toxow.",
        read_more: "Baro Dhaqanka & Hiddaha",

        // Culture
        cult_title: "The",
        cult_gradient: "Soul",
        cult_title2: "of Somalia",
        cult_desc: "Experience the vibrant rhythms, legendary poetry, and deep-rooted hospitality that define Somali culture.",
        cult_cuisine: "Traditional Tastes",
        cult_ingredients: "Key Ingredients",
        cult_quote: "Poetry is the language of our ancestors, the soul of our identity, and the rhythm of our resilience.",
        cult_poet: "— Hadraawi, legendary Somali poet",

        // Quiz
        quiz_title: "Quiz",
        quiz_gradient: "Mania",
        quiz_desc: "Test your knowledge about Somali history, geography, and culture.",
        quiz_q: "Question",
        quiz_of: "of",
        quiz_score: "Score",
        quiz_complete: "Quiz Complete!",
        quiz_scored: "You scored",
        quiz_again: "Try Again",
        quiz_home: "Back to Home",

        // Settings
        set_title: "Settings",
        set_desc: "Customize your SomExplore experience.",
        set_app: "Appearance",
        set_dark: "Dark Mode",
        set_dark_desc: "Switch between dark and light themes",
        set_lang: "Language",
        set_lang_desc: "Choose your preferred language",
        set_audio: "Audio & Accessibility",
        set_sound: "Sound Effects",
        set_sound_desc: "Enable quiz and navigation sounds",
        set_content: "Content & Save",
        set_fav: "Favorite Regions",
        set_fav_desc: "Manage your saved destinations",
        set_privacy: "Privacy Policy",
        set_privacy_desc: "How we handle your local data",
        set_footer: "SomExplore Version 1.0.0 (Offline Mode)"
    },
    so: {
        // Navbar
        nav_home: "Hoyga",
        nav_regions: "Gobollada",
        nav_history: "Taariikhda",
        nav_culture: "Dhaqanka",
        nav_quiz: "Kediska",
        nav_settings: "Dejinta",

        // Home
        hero_tagline: "B A R O   W A X A A N   A A N   A Q O O N I N",
        hero_title: "Ku Socdaal Geyiga",
        hero_gradient: "Soomaaliya",
        search_placeholder: "Raadi gobollo, goobo taariikhi ah, taariikh...",
        start_btn: "Bilow Sahanka",
        fact_title: "Miyaad Ogayd?",
        featured_title: "Gobollada Caanka Ah",
        featured_subtitle: "Baro gobollada kala duwan ee Soomaaliya",
        see_all: "Arag Gobollada oo Dhan",
        explored: "La Sahmiyey",

        // Regions
        regions_title: "Gobollada & Dowlad",
        regions_gradient: "Goboleedyada",
        regions_desc: "Baro gobollada maamul ee kala duwan ee Soomaaliya, mid kastaana wuxuu leeyahay hidde, juqraafi, iyo dhaqan u gaar ah.",
        regions_search: "Raadi gobollo...",
        regions_no_results: "Lama helin gobol u dhigma",
        pop: "Dadka",
        area: "Bedka",
        learn_more: "Arag Faahfaahin",

        // Region Details
        back: "Dib u Laabo",
        region_not_found: "Gobolka lama helin",
        est: "La Aasaasay",
        hist_context: "Sooyaalka Taariikhda",
        main_attract: "Goobaha Caanka Ah",
        culinary: "Cuntada Dhaqanka",
        quick_facts: "Xaqiiqooyin Kooban",
        wildlife: "Duurjoogta",
        cultural_note: "Xusuus Dhaqameed",
        edu_trivia: "Kedis Aqooneed",
        edu_desc: "Miyaad ogayd in gobolkani uu si weyn uga qayb qaato aqoonsiga qaranka Soomaaliyeed asagoo caan ku ah goobo taariikhi ah?",
        test_btn: "Tijaabi Aqoontaada",

        // History
        hist_title: "Safarka Waqtiga iyo",
        hist_gradient: "Sooyaalka",
        hist_desc: "Ka baro taariikhda guud ee dalka iyo dadka Soomaaliyeed cutubyadii laga soo qaatay buugga Daraasaadka ee Prof. Maxamed Cilmi Toxow.",
        read_more: "Baro Dhaqanka & Hiddaha",

        // Culture
        cult_title: "Ruuxda iyo",
        cult_gradient: "Nafta",
        cult_title2: "Soomaaliya",
        cult_desc: "Khibrad u yeelo laxanka, gabayada qadiimiga ah, iyo marti-gelinta Soomaaliyeed ee saldhigga u ah dhaqankeena.",
        cult_cuisine: "Cuntada Dhaqanka",
        cult_ingredients: "Waxyaabaha Lagu Diyaariyo",
        cult_quote: "Gabaygu waa luqadda awowyaasheen, ruuxda aqoonsigeenna, iyo laxanka adkeysigeenna.",
        cult_poet: "— Hadraawi, gabayaagii caanka ahaa ee Soomaaliyeed",

        // Quiz
        quiz_title: "Kediska",
        quiz_gradient: "Aqoonta",
        quiz_desc: "Tijaabi aqoontaada ku saabsan taariikhda, juqraafiga, iyo dhaqanka Soomaaliya.",
        quiz_q: "Su'aasha",
        quiz_of: "ee",
        quiz_score: "Dhibcaha",
        quiz_complete: "Kediskii Wuu Dhamaaday!",
        quiz_scored: "Waxaad keentay",
        quiz_again: "Mar Kale Isku Day",
        quiz_home: "Dib u Laabo Hoyga",

        // Settings
        set_title: "Dejinta",
        set_desc: "Customize your SomExplore experience.",
        set_app: "Muuqaalka",
        set_dark: "Habka Habeenkii",
        set_dark_desc: "U kala beddel habka mugdiga iyo iftiinka",
        set_lang: "Luqadda",
        set_lang_desc: "Dooro luqadda aad doorbideyso",
        set_audio: "Codka & Helitaanka",
        set_sound: "Saamaynta Codka",
        set_sound_desc: "Daar codadka kediska iyo socodka",
        set_content: "Kaydka & Macluumaadka",
        set_fav: "Gobollada Aad Jeceshahay",
        set_fav_desc: "Maamul goobaha aad kaydsatay",
        set_privacy: "Siyaasadda Khaaska Ah",
        set_privacy_desc: "Sida aan u maamulno xogtaada maxaliga ah",
        set_footer: "SomExplore Nooca 1.0.0 (Aalad la'aan)"
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('somexplore_lang') || 'en';
    });

    const [darkMode, setDarkModeState] = useState(() => {
        const saved = localStorage.getItem('somexplore_dark');
        return saved !== null ? saved === 'true' : true;
    });

    const [favorites, setFavoritesState] = useState(() => {
        const saved = localStorage.getItem('somexplore_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const setLanguage = (lang) => {
        setLanguageState(lang);
        localStorage.setItem('somexplore_lang', lang);
    };

    const setDarkMode = (val) => {
        setDarkModeState(val);
        localStorage.setItem('somexplore_dark', val);
    };

    const toggleFavorite = (id) => {
        setFavoritesState((prev) => {
            const next = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
            localStorage.setItem('somexplore_favorites', JSON.stringify(next));
            return next;
        });
    };

    const isFavorite = (id) => favorites.includes(id);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const t = (key) => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ 
            language, 
            setLanguage, 
            darkMode, 
            setDarkMode, 
            favorites, 
            toggleFavorite, 
            isFavorite, 
            t 
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
