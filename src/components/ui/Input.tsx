import React from 'react';
import { cn } from '../../utils';

interface InputProps {
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required,
  className
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        className={cn(
          'w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all',
          disabled && 'opacity-40 cursor-not-allowed',
          error && 'border-rose-500/50',
          className
        )}
      />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
};

export default Input;