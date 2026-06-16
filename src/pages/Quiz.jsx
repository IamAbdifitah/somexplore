import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';
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
            className="container mx-auto px-6 py-10 max-w-4xl"
        >
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-white mb-4">
                    {t('quiz_title')}<span className="text-somalia-blue">{t('quiz_gradient')}</span>
                </h1>
                <p className="text-somalia-soft/60">{t('quiz_desc')}</p>
            </div>

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="quiz"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="glass-card p-12 relative overflow-hidden"
                    >
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                            <motion.div
                                className="h-full bg-somalia-blue"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                            />
                        </div>

                        {/* Question Counter + Score */}
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-somalia-blue font-bold tracking-widest text-xs uppercase">
                                {t('quiz_q')} {currentQuestion + 1} {t('quiz_of')} {quizData.length}
                            </span>
                            <div className="flex items-center gap-2 text-white/40 text-sm">
                                <Star size={14} className="text-somalia-accent" />
                                {t('quiz_score')}: {score}
                            </div>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-3xl font-bold text-white mb-12 leading-tight">
                            {question}
                        </h2>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-4">
                            {options.map((option, index) => {
                                const isSelected       = selectedOption === option;
                                const isCorrectOption  = option === answer;

                                let bgClass = "bg-white/5 border-white/10 hover:bg-white/10";
                                if (isSelected) {
                                    bgClass = isCorrect
                                        ? "bg-somalia-green/20 border-somalia-green/50"
                                        : "bg-red-500/20 border-red-500/50";
                                } else if (selectedOption !== null && isCorrectOption) {
                                    bgClass = "bg-somalia-green/20 border-somalia-green/50";
                                }

                                return (
                                    <motion.button
                                        whileHover={selectedOption === null ? { scale: 1.02, x: 10 } : {}}
                                        whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        disabled={selectedOption !== null}
                                        className={`w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between ${bgClass}`}
                                    >
                                        <span className={`text-lg font-medium ${isSelected || (selectedOption && isCorrectOption) ? 'text-white' : 'text-somalia-soft/80'}`}>
                                            {option}
                                        </span>
                                        {isSelected && (
                                            isCorrect
                                                ? <CheckCircle2 className="text-somalia-green" />
                                                : <XCircle className="text-red-500" />
                                        )}
                                        {!isSelected && selectedOption && isCorrectOption && (
                                            <CheckCircle2 className="text-somalia-green" />
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
                        className="glass-card p-16 text-center"
                    >
                        <Trophy className="mx-auto text-somalia-accent mb-8" size={84} />
                        <h2 className="text-5xl font-black text-white mb-4">{t('quiz_complete')}</h2>
                        <p className="text-somalia-soft/60 text-xl mb-12">
                            {t('quiz_scored')} <span className="text-somalia-blue font-bold">{score}</span>{' '}
                            {t('quiz_of')} <span className="text-white">{quizData.length}</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <button
                                onClick={resetQuiz}
                                className="btn-primary flex items-center justify-center gap-3 px-10"
                            >
                                {t('quiz_again')} <RefreshCcw size={18} />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-10 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition-all"
                            >
                                {t('quiz_home')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Quiz;
