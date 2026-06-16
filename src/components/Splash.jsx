import React from 'react';
import { motion } from 'framer-motion';

const Splash = ({ onFinish }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3600);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-somalia-dark"
        >
            {/* Animated Flag */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-64 h-40 mb-12"
            >
                <div className="absolute inset-0 bg-somalia-blue rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Star Animation */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white text-8xl"
                    >
                        ★
                    </motion.div>

                    {/* Wave effect */}
                    <motion.div
                        animate={{ x: [-20, 20, -20] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"
                    />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-somalia-blue/20 blur-2xl rounded-full" />
            </motion.div>

            {/* Text Animation */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold tracking-tighter text-white mb-2">
                    Som<span className="text-somalia-blue">Explore</span>
                </h1>
                <p className="text-somalia-soft/60 text-lg font-light tracking-widest uppercase">
                    Discover the Horn of Africa
                </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="absolute bottom-20 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    className="h-full bg-somalia-blue"
                />
            </div>
        </motion.div>
    );
};

export default Splash;
