import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Star, Share2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils';

const actions = [
  {
    icon: Plus,
    label: 'New Project',
    desc: 'Create a portfolio entry',
    to: '/projects/new',
    classes: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20',
    iconWrap: 'bg-indigo-500/20',
  },
  {
    icon: TrendingUp,
    label: 'Analyze Portfolio',
    desc: 'Run AI-powered analysis',
    to: '/ai',
    classes: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20',
    iconWrap: 'bg-emerald-500/20',
  },
  {
    icon: Star,
    label: 'Feature Work',
    desc: 'Mark standout projects',
    to: '/portfolio',
    classes: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20',
    iconWrap: 'bg-purple-500/20',
  },
  {
    icon: Share2,
    label: 'Public Portfolio',
    desc: 'Share your work',
    to: '/public',
    classes: 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20',
    iconWrap: 'bg-amber-500/20',
  },
];

const QuickActions = () => {
  return (
    <div className="space-y-2.5">
      {actions.map((a, i) => (
        <motion.div
          key={a.label}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            to={a.to}
            className={cn(
              'group flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:translate-x-1',
              a.classes
            )}
          >
            <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', a.iconWrap)}>
              <a.icon className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/90">{a.label}</p>
              <p className="text-xs text-white/40">{a.desc}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickActions;