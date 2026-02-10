import React from 'react';

/**
 * Valid heading levels for SEO and accessibility
 */
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface PageHeaderProps {
  /** The main text to display as the title */
  title: string;
  /** Optional supporting text displayed below the title */
  subtitle?: string;
  /** The HTML heading tag for the title. Defaults to 'h1' */
  titleLevel?: HeadingLevel;
  /** The HTML heading tag for the subtitle. Defaults to 'h2' */
  subtitleLevel?: HeadingLevel | 'p' | 'span';
  /** CSS padding value (e.g., '20px', '2rem 1rem') */
  padding?: string | number;
  /** Optional custom class name for external styling */
  className?: string;
}

/**
 * A reusable PageHeader component built with TypeScript for React 18/19.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  titleLevel: TitleTag = 'h1',
  subtitleLevel: SubtitleTag = 'h2',
  padding = '1.5rem 0',
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    padding: padding,
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    lineHeight: 1.2,
  };

  const subtitleStyle: React.CSSProperties = {
    margin: '0.5rem 0 0 0',
    opacity: 0.8,
    fontWeight: 400,
  };

  return (
    <header style={containerStyle} className={className}>
      <TitleTag style={titleStyle}>{title}</TitleTag>
      {subtitle && (
        <SubtitleTag style={subtitleStyle}>{subtitle}</SubtitleTag>
      )}
    </header>
  );
};

export default PageHeader;
