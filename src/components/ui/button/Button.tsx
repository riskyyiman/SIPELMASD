import React from 'react';
import clsx from 'clsx'; // atau tailwind-merge jika kamu pakai itu

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'; // tambahkan custom prop
  variant?: 'primary' | 'outline'; // tambahkan custom prop
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, size = 'md', variant = 'primary', startIcon, endIcon, className, ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition-all';
  const sizeClass = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  }[size];

  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  }[variant];

  return (
    <button className={clsx(base, sizeClass, variantClass, className)} {...props}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
