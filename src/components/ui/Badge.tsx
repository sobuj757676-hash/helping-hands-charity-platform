import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'gray', 
  size = 'md', 
  className 
}) => {
  return (
    <span
      className={clsx(
        'badge',
        {
          'badge-primary': variant === 'primary',
          'badge-success': variant === 'success',
          'badge-warning': variant === 'warning',
          'badge-danger': variant === 'danger',
          'badge-gray': variant === 'gray',
          'bg-blue-100 text-blue-800': variant === 'info',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-0.5 text-xs': size === 'md',
          'px-3 py-1 text-sm': size === 'lg'
        },
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };