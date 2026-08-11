import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, FolderOpen, Package, Layers, Image, BarChart3, Sparkles, Settings2, Plus, Upload, ArrowRight } from 'lucide-react';
import { projectService } from '../services/projectService';
import { cn } from '../utils';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  section: string;
  action: () => void;
  keywords: string[];
}

const CommandPalette = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const projectItems = useMemo(() => {
    return projectService.getAll().map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      description: `${p.category} · ${p.status}`,
      icon: <Package className="w-4 h-4" />,
      section: 'Projects',
      action: () => { navigate(`/projects/${p.id}`); onClose(); },
      keywords: [p.title.toLowerCase(), p.category.toLowerCase(), p.description.toLowerCase(), ...p.tags.map((t: string) => t.toLowerCase()), ...p.technologies.map((t: string) => t.toLowerCase())],
    }));
  }, [navigate, onClose]);

  const navItems: CommandItem[] = [
    { id: 'nav-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/dashboard'); onClose(); }, keywords: ['home', 'overview'] },
    { id: 'nav-portfolio', label: 'Portfolio', icon: <FolderOpen className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/portfolio'); onClose(); }, keywords: ['browse', 'gallery'] },
    { id: 'nav-projects', label: 'Projects', icon: <Package className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/projects'); onClose(); }, keywords: ['manage', 'list'] },
    { id: 'nav-collections', label: 'Collections', icon: <Layers className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/collections'); onClose(); }, keywords: ['organize', 'groups'] },
    { id: 'nav-assets', label: 'Assets', icon: <Image className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/assets'); onClose(); }, keywords: ['files', 'upload'] },
    { id: 'nav-analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/analytics'); onClose(); }, keywords: ['stats', 'metrics'] },
    { id: 'nav-ai', label: 'AI Analyst', icon: <Sparkles className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/ai'); onClose(); }, keywords: ['insights', 'recommendations'] },
    { id: 'nav-settings', label: 'Settings', icon: <Settings2 className="w-4 h-4" />, section: 'Navigation', action: () => { navigate('/settings'); onClose(); }, keywords: ['preferences', 'config'] },
  ];

  const actionItems: CommandItem[] = [
    { id: 'action-new-project', label: 'Create New Project', icon: <Plus className="w-4 h-4" />, section: 'Actions', action: () => { navigate('/projects/new'); onClose(); }, keywords: ['add', 'create', 'new'] },
    { id: 'action-upload', label: 'Upload Assets', icon: <Upload className="w-4 h-4" />, section: 'Actions', action: () => { navigate('/assets'); onClose(); }, keywords: ['upload', 'files'] },
    { id: 'action-analyze', label: 'Analyze Portfolio', icon: <Sparkles className="w-4 h-4" />, section: 'Actions', action: () => { navigate('/ai'); onClose(); }, keywords: ['ai', 'analyze'] },
  ];

  const allItems = [...actionItems, ...navItems, ...projectItems];

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter((item) =>
      item.label.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  }, [query, allItems]);

  const sections = useMemo(() => {
    const grouped: Record<string, typeof filteredItems> = {};
    for (const item of filteredItems) {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    }
    return grouped;
  }, [filteredItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
    }
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filteredItems, selectedIndex, onClose]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
          >
            <div className="bg-[#12121e]/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <Search className="w-5 h-5 text-white/30 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, pages, actions..."
                  className="flex-1 bg-transparent text-[15px] text-white placeholder-white/30 focus:outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-lg bg-white/[0.06] text-[11px] text-white/30 border border-white/[0.06]">
                  esc
                </kbd>
              </div>

              <div className="max-h-[360px] overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-white/40">No results for "{query}"</p>
                  </div>
                ) : (
                  Object.entries(sections).map(([section, items]) => (
                    <div key={section} className="mb-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25 px-3 py-1.5">{section}</p>
                      {items.map((item) => {
                        flatIndex++;
                        const isSelected = flatIndex === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            className={cn(
                              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-colors',
                              isSelected ? 'bg-white/[0.06] text-white' : 'text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                            )}
                          >
                            <span className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.06]', isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/[0.04] text-white/40')}>
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.label}</p>
                              {item.description && <p className="text-xs text-white/30 truncate">{item.description}</p>}
                            </div>
                            {isSelected && <ArrowRight className="w-3.5 h-3.5 text-white/30 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/[0.06] text-[11px] text-white/25">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-[10px]">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-[10px]">↵</kbd> select</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-[10px]">esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;