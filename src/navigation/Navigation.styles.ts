import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: #1a1a1a;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const NavLogo = styled.div`
  a {
    font-size: 1.5rem;
    font-weight: 800;
    color: #61dafb;
    text-decoration: none;
    letter-spacing: -1px;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  margin: 0;
  padding: 0;
`;

// Styled version of the React Router Link
export const StyledLink = styled(Link)`
  color: #efefef;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #61dafb;
  }
`;

export const NavButton = styled.button<{ $logout?: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.1s active;
  
  background-color: ${props => props.$logout ? '#ff4d4d' : '#007bff'};
  color: white;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
