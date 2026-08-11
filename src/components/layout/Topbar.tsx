import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Plus, ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

interface TopbarProps {
  onOpenCommand: () => void;
}

const Topbar = ({ onOpenCommand }: TopbarProps) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New insight available', desc: 'AI analysis completed', time: '2m ago', color: 'text-indigo-400' },
    { id: 2, title: 'Project published', desc: 'Your project went live', time: '1h ago', color: 'text-emerald-400' },
    { id: 3, title: 'Storage at 80%', desc: 'Consider cleaning assets', time: '3h ago', color: 'text-amber-400' },
  ];

  return (
    <header className="sticky top-0 z-50 h-16 bg-[#0c0c14]/80 backdrop-blur-2xl border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-[15px] font-semibold text-white/90 tracking-tight">
          Portfolio <span className="text-gradient">Studio</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCommand}
          className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.07] transition-all text-[13px]"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
          <kbd className="ml-4 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/30 border border-white/[0.06]">Ctrl K</kbd>
        </button>

        <Link
          to="/projects/new"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[13px] font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          New
        </Link>

        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/[0.08] bg-[#12121c]/95 backdrop-blur-2xl shadow-2xl p-3"
              >
                <p className="text-[13px] font-semibold text-white/90 px-2 pb-2">Notifications</p>
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/[0.05] transition-colors cursor-pointer">
                    <div className={cn('w-2 h-2 rounded-full mt-1.5 bg-current', n.color)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white/90">{n.title}</p>
                      <p className="text-xs text-white/40">{n.desc}</p>
                    </div>
                    <span className="text-[10px] text-white/30 shrink-0">{n.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10">
              SJ
            </div>
            <ChevronDown className={cn('w-3.5 h-3.5 text-white/30 transition-transform', profileOpen && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/[0.08] bg-[#12121c]/95 backdrop-blur-2xl shadow-2xl p-2"
              >
                <Link to="/settings" className="block rounded-lg px-3 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">Settings</Link>
                <Link to="/public" className="block rounded-lg px-3 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">Public Portfolio</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;