import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, RefreshCcw, CheckCircle2, XCircle, Sparkles, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import quizData from '../data/quiz.json';
import { useLanguage } from '../context/LanguageContext';

const Quiz = () => {
    const navigate = useNavigate();
    const { language, t } = useLanguage();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const isSomali = language === 'so';

    const getQuestion = (item) => isSomali ? item.question_so : item.question_en;
    const getOptions  = (item) => isSomali ? item.options_so  : item.options_en;
    const getAnswer   = (item) => isSomali ? item.answer_so   : item.answer_en;

    const handleOptionClick = (option) => {
        if (selectedOption !== null) return;

        setSelectedOption(option);
        const correct = option === getAnswer(quizData[currentQuestion]);
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);

        setTimeout(() => {
            if (currentQuestion + 1 < quizData.length) {
                setCurrentQuestion(q => q + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowResults(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    const current = quizData[currentQuestion];
    const options  = current ? getOptions(current) : [];
    const question = current ? getQuestion(current) : '';
    const answer   = current ? getAnswer(current)   : '';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8 py-10 max-w-4xl min-h-[80vh] flex flex-col justify-center"
        >
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] text-xs font-bold uppercase tracking-widest mb-3">
                    <Sparkles size={14} className="text-[#D8A84E]" />
                    <span>{language === 'so' ? 'Kediska Aqoonta' : 'Interactive Trivia'}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-heading text-white mb-3 tracking-tight">
                    {t('quiz_title')}<span className="text-gradient-ocean">{t('quiz_gradient')}</span>
                </h1>
                <p className="text-[#F3E8D0]/80 text-base md:text-lg font-light">{t('quiz_desc')}</p>
            </div>

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="quiz"
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -25, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass-card p-8 md:p-14 relative overflow-hidden border border-[#F3E8D0]/20 bg-[#071A2B]/85 shadow-2xl rounded-[3rem]"
                    >
                        {/* Glowing Progress Line */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#F3E8D0]/10">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#087EA4] via-[#D8A84E] to-[#087EA4]"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Question Counter + Score */}
                        <div className="flex justify-between items-center mb-10 pt-2">
                            <span className="px-4 py-1.5 bg-[#087EA4]/15 rounded-full border border-[#087EA4]/30 text-[#087EA4] font-extrabold text-xs uppercase tracking-widest">
                                {t('quiz_q')} {currentQuestion + 1} {t('quiz_of')} {quizData.length}
                            </span>
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#D8A84E]/15 rounded-full border border-[#D8A84E]/30 text-[#D8A84E] font-bold text-sm">
                                <Star size={16} className="fill-[#D8A84E]" />
                                <span>{t('quiz_score')}: {score}</span>
                            </div>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-2xl md:text-4xl font-black font-heading text-white mb-10 leading-snug">
                            {question}
                        </h2>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {options.map((option, index) => {
                                const isSelected       = selectedOption === option;
                                const isCorrectOption  = option === answer;

                                let bgClass = "bg-[#071A2B]/90 border-[#F3E8D0]/15 hover:border-[#087EA4]/60 hover:bg-white/5";
                                if (isSelected) {
                                    bgClass = isCorrect
                                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                        : "bg-red-500/20 border-red-500 text-white shadow-lg shadow-red-500/20";
                                } else if (selectedOption !== null && isCorrectOption) {
                                    bgClass = "bg-emerald-500/20 border-emerald-400 text-white";
                                }

                                return (
                                    <motion.button
                                        whileHover={selectedOption === null ? { scale: 1.01, x: 6 } : {}}
                                        whileTap={selectedOption === null ? { scale: 0.99 } : {}}
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        disabled={selectedOption !== null}
                                        className={`w-full p-5 md:p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between shadow-md ${bgClass}`}
                                    >
                                        <span className={`text-base md:text-lg font-semibold ${isSelected || (selectedOption && isCorrectOption) ? 'text-white' : 'text-[#F3E8D0]/90'}`}>
                                            {option}
                                        </span>
                                        
                                        {isSelected && (
                                            isCorrect
                                                ? <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={24} />
                                                : <XCircle className="text-red-500 flex-shrink-0" size={24} />
                                        )}
                                        {!isSelected && selectedOption && isCorrectOption && (
                                            <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={24} />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-card p-10 md:p-16 text-center border border-[#D8A84E]/40 bg-[#071A2B]/90 shadow-2xl rounded-[3rem] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D8A84E]/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="w-24 h-24 bg-gradient-to-br from-[#D8A84E] to-[#B88832] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#D8A84E]/40 border border-white/30">
                            <Trophy className="text-[#071A2B]" size={48} />
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-4">{t('quiz_complete')}</h2>
                        <p className="text-[#F3E8D0]/80 text-lg md:text-2xl mb-10 font-light">
                            {t('quiz_scored')} <span className="text-[#D8A84E] font-black text-3xl md:text-4xl px-2">{score}</span>{' '}
                            {t('quiz_of')} <span className="text-white font-bold">{quizData.length}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <button
                                onClick={resetQuiz}
                                className="btn-gold flex items-center justify-center gap-3 px-8 py-4 shadow-xl"
                            >
                                <RefreshCcw size={18} />
                                <span>{t('quiz_again')}</span>
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-[#F3E8D0]/20 rounded-full font-bold text-white hover:bg-white/10 transition-all text-base"
                            >
                                <HomeIcon size={18} />
                                <span>{t('quiz_home')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Quiz;

