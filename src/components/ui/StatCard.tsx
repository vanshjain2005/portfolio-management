import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'teal' | 'red';
  delay?: number;
}

const colorGlow = {
  blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-300',
  green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-300',
  yellow: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-300',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-300',
  indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-300',
  teal: 'from-teal-500/20 to-teal-500/5 border-teal-500/20 text-teal-300',
  red: 'from-rose-500/20 to-rose-500/5 border-rose-500/20 text-rose-300',
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  color = 'blue',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden">
        <div className={cn(
          'absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500',
          colorGlow[color].split(' ')[0]
        )} />
        <div className="flex items-center relative">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            {trend && <p className="text-xs text-white/40 mt-1.5">{trend}</p>}
          </div>
          {icon && (
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
              colorGlow[color]
            )}>
              {icon}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;