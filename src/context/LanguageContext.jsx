import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navbar
        nav_home: "Home",
        nav_explore: "Explore",
        nav_destinations: "Destinations",
        nav_experiences: "Experiences",
        nav_events: "Events",
        nav_about: "About",
        nav_history: "History",
        nav_culture: "Culture",
        nav_quiz: "Quiz",
        nav_settings: "Settings",
        nav_contact: "Contact",
        nav_explore_btn: "Explore Now →",

        // Home
        hero_tagline: "E X P L O R E   T H E   U N E X P L O R E D",
        hero_title: "Discover the Beauty of",
        hero_gradient: "Somalia",
        hero_subtitle: "Explore breathtaking destinations, unforgettable experiences, culture, history and hidden gems across Somalia.",
        search_placeholder: "Search destinations, places or experiences...",
        start_btn: "Explore Somalia →",
        disc_dest_btn: "Discover Destinations",
        where_explore: "Where do you want to explore?",
        fact_title: "Did You Know?",
        featured_title: "Explore Somalia",
        featured_subtitle: "Discover places worth experiencing.",
        see_all: "See all Destinations",
        explored: "Explore →",

        // Section Headers
        feat_exp_title: "Featured Experiences",
        feat_exp_sub: "Handpicked activities and traditional journeys across the Horn.",
        hidden_gems_title: "Hidden Gems of Somalia",
        hidden_gems_sub: "Places you may not find in the usual travel guides.",
        map_title: "Explore Somalia on the Map",
        map_sub: "Interactive destination directory across coastal and highland regions.",
        things_to_do_title: "What are you looking for?",
        events_title: "What's Happening",
        events_sub: "Cultural festivals, literary fairs, and maritime celebrations.",

        // Explore Page
        exp_page_title: "Explore Somalia",
        exp_page_sub: "Find destinations, experiences, events, and historical landmarks.",
        filter_all: "All",
        filter_dest: "Destinations",
        filter_exp: "Experiences",
        filter_events: "Events",
        filter_places: "Places",

        // About Page
        about_hero_title: "Discover Somalia Differently",
        about_mission_title: "Our Mission",
        about_mission_desc: "SomExplore is built to showcase the beauty, culture, history and experiences of Somalia to the world.",
        about_stat_dest: "18+ Destinations",
        about_stat_places: "50+ Places",
        about_stat_regions: "6 Regions",
        about_stat_exp: "100+ Experiences",
        about_why_title: "Why SomExplore?",
        about_discover_t: "Discover",
        about_discover_d: "Find places worth visiting.",
        about_exp_t: "Experience",
        about_exp_d: "Connect with Somali culture.",
        about_explore_t: "Explore",
        about_explore_d: "See Somalia from a new perspective.",

        // Contact Page
        contact_title: "Let's Connect",
        contact_sub: "Have a question or want to share a place with SomExplore?",
        contact_name: "Full Name",
        contact_email: "Email Address",
        contact_msg: "Your Message",
        contact_send: "Send Message →",
        contact_info_title: "Contact Details",

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
        nav_explore: "Sahaminta",
        nav_destinations: "Goobaha",
        nav_experiences: "Khibradaha",
        nav_events: "Bandhigyada",
        nav_about: "Naga Saabsan",
        nav_history: "Taariikhda",
        nav_culture: "Dhaqanka",
        nav_quiz: "Kediska",
        nav_settings: "Dejinta",
        nav_contact: "Nala Soo Xiriir",
        nav_explore_btn: "Bilow Sahanka →",

        // Home
        hero_tagline: "B A R O   W A X A A N   A A N   A Q O O N I N",
        hero_title: "Dahaadhka Ka Qaad Quruxda",
        hero_gradient: "Soomaaliya",
        hero_subtitle: "Sahami goobaha cajiibka ah, khibradaha aan la haraynin, dhaqanka, taariikhda iyo dhagaxyada qarsoon ee Geeska Afrika.",
        search_placeholder: "Raadi goobo, khibrado ama taariikh...",
        start_btn: "Sahami Soomaaliya →",
        disc_dest_btn: "Baro Goobaha",
        where_explore: "Halkee u socotaa inaad sahmid?",
        fact_title: "Miyaad Ogayd?",
        featured_title: "Sahami Soomaaliya",
        featured_subtitle: "Baro goobaha mudan in la booqdo.",
        see_all: "Arag Goobaha oo Dhan",
        explored: "Sahami →",

        // Section Headers
        feat_exp_title: "Khibradaha Caanka Ah",
        feat_exp_sub: "Waxyaabaha la doortay oo aad ka heli karto Geeska Afrika.",
        hidden_gems_title: "Goobaha Qarsoon ee Soomaaliya",
        hidden_gems_sub: "Goobo aadan ka heli karin kaadhadhka caadiga ah.",
        map_title: "Ku Sahami Soomaaliya Khariidada",
        map_sub: "Khariidad interactive ah oo muujinaysa dhammaan gobollada.",
        things_to_do_title: "Maxaad raadinaysaa?",
        events_title: "Bandhigyada Cusub",
        events_sub: "Dabaaldegyada dhaqanka, buugaagta, iyo xeebaha.",

        // Explore Page
        exp_page_title: "Sahami Soomaaliya",
        exp_page_sub: "Raadi goobo, khibrado, bandhigyo iyo goobo taariikhi ah.",
        filter_all: "Dhammaan",
        filter_dest: "Goobaha",
        filter_exp: "Khibradaha",
        filter_events: "Bandhigyada",
        filter_places: "Magaalooyinka",

        // About Page
        about_hero_title: "Baro Soomaaliya Si Ka Duwan",
        about_mission_title: "Ujeeddadeenna",
        about_mission_desc: "SomExplore waxaa loo dhisay in lagu muujiyo quruxda, dhaqanka, taariikhda iyo khibradaha Soomaaliya dunida oo dhan.",
        about_stat_dest: "18+ Goobood",
        about_stat_places: "50+ Meelood",
        about_stat_regions: "6 Gobol",
        about_stat_exp: "100+ Khibradood",
        about_why_title: "Maxaa SomExplore?",
        about_discover_t: "Baro",
        about_discover_d: "Hel goobo mudan in la booqdo.",
        about_exp_t: "Khibrad",
        about_exp_d: "La xiriir dhaqanka Soomaaliyeed.",
        about_explore_t: "Sahami",
        about_explore_d: "U arag Soomaaliya arti cusub.",

        // Contact Page
        contact_title: "Nala Soo Xiriir",
        contact_sub: "Ma leedahay su'aal ama ma ka weydiinaysaa goob cusub?",
        contact_name: "Magacaaga Buuxa",
        contact_email: "E-mailkaaga",
        contact_msg: "Farriintaada",
        contact_send: "Dir Farriinta →",
        contact_info_title: "Tafaasiisha Xiriirka",

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
