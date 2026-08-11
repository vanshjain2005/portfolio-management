import React from 'react';
import { cn } from '../../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, padding = 'md', hover = false }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.06] shadow-xl shadow-black/20',
          paddingClasses[padding],
          hover && 'hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;