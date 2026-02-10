import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * A modern, reusable Button component for 2026 React applications.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Define variant-specific styles
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: { backgroundColor: '#0070f3', color: 'white', border: 'none' },
    secondary: { backgroundColor: '#eaeaea', color: 'black', border: 'none' },
    outline: { backgroundColor: 'transparent', border: '1px solid #0070f3', color: '#0070f3' },
    ghost: { backgroundColor: 'transparent', color: '#0070f3', border: 'none' },
    danger: { backgroundColor: '#ff4d4f', color: 'white', border: 'none' },
  };

  // Define size-specific styles
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '4px 8px', fontSize: '0.875rem' },
    md: { padding: '8px 16px', fontSize: '1rem' },
    lg: { padding: '12px 24px', fontSize: '1.25rem' },
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '4px',
    fontWeight: 500,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'all 0.2s ease',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      style={baseStyle}
      className={`btn-${variant} btn-${size} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="loader" style={{ marginRight: '4px' }}>⏳</span>}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
