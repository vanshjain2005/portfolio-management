import React from 'react';
import { cn } from '../../utils';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const variantClasses = {
    default: 'bg-white/[0.06] text-white/60 border border-white/[0.06]',
    primary: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/20',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/20',
    outline: 'border border-white/[0.12] text-white/70'
  };

  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full',
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;