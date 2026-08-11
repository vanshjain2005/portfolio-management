import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import BackgroundFX from './components/BackgroundFX';
import CommandPalette from './components/CommandPalette';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import ProjectForm from './pages/ProjectForm';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Assets from './pages/Assets';
import Collections from './pages/Collections';
import AnalyticsPage from './pages/AnalyticsPage';
import AIAgent from './pages/AIAgent';
import PublicPortfolio from './pages/PublicPortfolio';
import Settings from './pages/Settings';

const pageVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
};

const AnimatedRoutes = ({ collapsed, onOpenCommand }: { collapsed: boolean; onOpenCommand: () => void }) => {
  const location = useLocation();
  const SIDEBAR_W = collapsed ? 80 : 264;

  return (
    <motion.div
      animate={{ paddingLeft: SIDEBAR_W }}
      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
      className="relative z-10 min-h-screen"
    >
      <Topbar onOpenCommand={onOpenCommand} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[calc(100vh-4rem)]"
        >
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/:id/edit" element={<ProjectForm />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/ai" element={<AIAgent />} />
            <Route path="/public" element={<PublicPortfolio />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
                  <p className="text-white/50 text-lg">Page not found</p>
                </div>
              </div>
            } />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </motion.div>
  );
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#09090b]">
        <BackgroundFX />
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <AnimatedRoutes collapsed={collapsed} onOpenCommand={() => setCommandOpen(true)} />
        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      </div>
    </Router>
  );
};

export default App;