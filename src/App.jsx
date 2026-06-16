import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Regions from './pages/Regions';
import RegionDetails from './pages/RegionDetails';
import History from './pages/History';
import Culture from './pages/Culture';
import Quiz from './pages/Quiz';
import Settings from './pages/Settings';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/regions" element={<Regions />} />
                <Route path="/region/:id" element={<RegionDetails />} />
                <Route path="/history" element={<History />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </AnimatePresence>
    );
}
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-somalia-dark flex items-center justify-center p-6 font-sans">
                    <div className="glass-card p-10 max-w-2xl w-full border border-red-500/30 shadow-2xl relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                        <h2 className="text-3xl font-black text-white mb-4">Something went wrong</h2>
                        <p className="text-somalia-soft/60 mb-6">
                            SomExplore encountered an unexpected error.
                        </p>
                        <div className="bg-red-950/20 border border-red-500/10 rounded-2xl p-6 mb-6">
                            <p className="text-red-400 font-mono text-sm break-all text-left">
                                {this.state.error ? this.state.error.toString() : 'Unknown error'}
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary w-full py-4 text-white font-bold"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ErrorBoundary>
            <Router>
                <div className="min-h-screen bg-somalia-dark overflow-x-hidden">
                    <AnimatePresence>
                        {loading ? (
                            <Splash key="splash" onFinish={() => setLoading(false)} />
                        ) : (
                            <motion.div
                                key="main-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Navbar />
                                <main className="pt-20">
                                    <AnimatedRoutes />
                                </main>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
