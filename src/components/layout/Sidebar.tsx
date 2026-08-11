import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  Layers,
  Image,
  BarChart3,
  Sparkles,
  Settings2,
  ChevronLeft,
  Command,
  Plus,
} from 'lucide-react';
import { cn } from '../../utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'portfolio', label: 'Portfolio', icon: FolderOpen, path: '/portfolio' },
  { id: 'projects', label: 'Projects', icon: Package, path: '/projects' },
  { id: 'collections', label: 'Collections', icon: Layers, path: '/collections' },
  { id: 'assets', label: 'Assets', icon: Image, path: '/assets' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { id: 'ai', label: 'AI Analyst', icon: Sparkles, path: '/ai' },
  { id: 'settings', label: 'Settings', icon: Settings2, path: '/settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const SIDEBAR_W = collapsed ? 80 : 264;

  return (
    <motion.aside
      animate={{ width: SIDEBAR_W }}
      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
      className="fixed left-0 top-0 z-[60] h-screen bg-[#0c0c14]/95 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col overflow-hidden"
      style={{ boxShadow: '20px 0 60px -20px rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-center h-16 px-4 shrink-0 border-b border-white/[0.06]">
        <motion.div layout className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/25">
            <Command className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p className="text-[13px] font-bold text-white truncate">Portfolio OS</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-indigo-400/70">Premium</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center rounded-xl px-3 py-2.5 transition-all duration-200',
                collapsed ? 'justify-center' : 'gap-3',
                isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={cn(
                    'relative w-[18px] h-[18px] shrink-0 transition-colors',
                    isActive ? 'text-indigo-300' : 'text-white/40 group-hover:text-white/70'
                  )}
                />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="relative text-[13px] font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !collapsed && (
                  <motion.span
                    layoutId="sidebar-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"
                    style={{ boxShadow: '0 0 10px rgba(129,140,248,0.8)' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/[0.06] shrink-0 space-y-1">
        <NavLink
          to="/projects/new"
          title={collapsed ? 'New Project' : undefined}
          className={cn(
            'flex items-center gap-2 rounded-xl px-3 py-2.5 text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors',
            collapsed ? 'justify-center' : ''
          )}
        >
          <Plus className="w-[18px] h-[18px]" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[13px] font-medium">
                New Project
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>

        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-2 w-full rounded-xl px-3 py-2.5 text-white/30 hover:text-white/70 hover:bg-white/[0.04] transition-colors',
            collapsed ? 'justify-center' : ''
          )}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[12px] font-medium">
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;