import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  titleLevel?: HeadingLevel;
  subtitleLevel?: HeadingLevel | 'p' | 'span';
  padding?: string | number;
  className?: string;
  // Customization Props
  showLines?: boolean;
  titleColor?: string;
  subtitleColor?: string;
  lineColor?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  titleLevel: TitleTag = 'h1',
  subtitleLevel: SubtitleTag = 'h2',
  padding = '1.5rem 0',
  className = '',
  showLines = false,
  titleColor = '#000000',    // Default: Black
  subtitleColor = '#666666', // Default: Gray
  lineColor = '#dbdbdb',     // Default: Light Gray
}) => {
  
  const headerStyle: React.CSSProperties = {
    padding: padding,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    color: titleColor,
  };

  const subtitleWrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center', // Vertically centers the lines with the text
    justifyContent: 'center',
    gap: '15px',          // Space between the lines and the text
    marginTop: '0.5rem',
    width: '100%',
  };

  const lineStyle: React.CSSProperties = {
    width: '200px',
    height: '2px',
    backgroundColor: lineColor,
    flexShrink: 0,        // Ensures lines don't shrink on smaller screens
  };

  const subtitleStyle: React.CSSProperties = {
    margin: 0,
    color: subtitleColor,
    fontWeight: 400,
  };

  return (
    <header style={headerStyle} className={className}>
      <TitleTag style={titleStyle}>{title}</TitleTag>
      
      {subtitle && (
        <div style={subtitleWrapperStyle}>
          {showLines && <div style={lineStyle} />}
          
          <SubtitleTag style={subtitleStyle}>
            {subtitle}
          </SubtitleTag>
          
          {showLines && <div style={lineStyle} />}
        </div>
      )}
    </header>
  );
};

export default PageHeader;