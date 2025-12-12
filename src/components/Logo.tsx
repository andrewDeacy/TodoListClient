/**
 * Logo Component
 * 
 * Branded logo image for the application
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';

/**
 * Logo Component Props
 */
interface LogoProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Whether the logo should be clickable to navigate home
   * @default true
   */
  clickable?: boolean;
  /**
   * Logo height (default responsive)
   */
  height?: string;
}

/**
 * Logo Component
 * 
 * Displays the TODO MGR logo image.
 * Clickable by default to navigate to home (/lists).
 * 
 * @example
 * ```tsx
 * <Logo />
 * <Logo clickable={false} />
 * <Logo className="h-12" />
 * ```
 */
const Logo: React.FC<LogoProps> = ({ className = '', clickable = true, height = 'h-8 sm:h-10' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate('/lists');
    }
  };

  return (
    <img
      src={logoImage}
      alt="TODO MGR"
      className={`${height} ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={clickable ? 'Navigate to home' : undefined}
    />
  );
};

export default Logo;
