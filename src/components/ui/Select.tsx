import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-full">
      {label && (
        <label className="mb-1.5 block text-xs font-semibold text-white/60 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className={cn('relative', disabled && 'opacity-40 pointer-events-none')}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex w-full items-center justify-between px-4 py-2.5 text-sm rounded-xl border transition-all',
            isOpen
              ? 'border-indigo-500/50 bg-white/[0.06] text-white ring-2 ring-indigo-500/20'
              : 'border-white/[0.08] bg-white/[0.04] text-white/80 hover:bg-white/[0.06]'
          )}
        >
          <span className={cn('truncate', !selected && 'text-white/30')}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 mt-2 w-full rounded-xl border border-white/[0.08] bg-[#14141f] backdrop-blur-2xl shadow-2xl p-1.5"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                    option.value === value
                      ? 'text-indigo-300 bg-indigo-500/10'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  )}
                >
                  {option.label}
                  {option.value === value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;