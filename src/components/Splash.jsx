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
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071A2B] overflow-hidden"
        >
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#087EA4]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#D8A84E]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Flag / Star Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-72 h-44 mb-10"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#087EA4] via-[#066686] to-[#04445A] rounded-3xl shadow-2xl shadow-[#087EA4]/30 flex items-center justify-center overflow-hidden border border-[#F3E8D0]/30 backdrop-blur-md">
                    {/* Floating Gold Star */}
                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                            rotate: [0, 3, -3, 0],
                            filter: ["drop-shadow(0 0 10px rgba(216,168,78,0.4))", "drop-shadow(0 0 25px rgba(216,168,78,0.8))", "drop-shadow(0 0 10px rgba(216,168,78,0.4))"]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[#D8A84E] text-8xl font-serif select-none"
                    >
                        ★
                    </motion.div>

                    {/* Shimmer overlay */}
                    <motion.div
                        animate={{ x: [-200, 200] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                </div>

                {/* Ambient glow */}
                <div className="absolute -inset-4 bg-[#087EA4]/30 blur-3xl rounded-full -z-10" />
            </motion.div>

            {/* Brand Title */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-center px-4"
            >
                <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight text-white mb-3">
                    Som<span className="text-[#087EA4]">Explore</span>
                </h1>
                <p className="text-[#F3E8D0]/70 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                    Discover the Horn of Africa
                </p>
            </motion.div>

            {/* Progress Indicator */}
            <div className="absolute bottom-16 w-64 h-1.5 bg-[#F3E8D0]/10 rounded-full overflow-hidden border border-[#F3E8D0]/10">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 3.4, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-[#087EA4] via-[#D8A84E] to-[#087EA4]"
                />
            </div>
        </motion.div>
    );
};

export default Splash;

