import React from 'react';
import { cn } from '../../utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  loading = false,
  children,
  className,
  onClick,
  type = 'button'
}) => {
  const baseClasses = 'flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-xl';
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:brightness-110',
    secondary: 'bg-white/[0.06] text-white/80 hover:bg-white/[0.1] hover:text-white border border-white/[0.08]',
    outline: 'border border-white/[0.12] text-white/70 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.2]',
    ghost: 'text-white/50 hover:text-white hover:bg-white/[0.06]',
    danger: 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:shadow-lg hover:shadow-rose-500/25 hover:brightness-110',
  };
  const disabledClasses = 'opacity-40 cursor-not-allowed';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        block && 'w-full',
        (disabled || loading) && disabledClasses,
        className
      )}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;