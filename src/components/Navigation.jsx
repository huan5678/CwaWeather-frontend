import React from 'react';
import styled from 'styled-components';
import { Home, Star, LayoutDashboard } from 'lucide-react';

const NavContainer = styled.nav`
  background: var(--card-bg);
  border-top: var(--border-width) solid var(--border-color);
  z-index: 1000;
  
  /* Mobile: Fixed Bottom */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px -4px 0px var(--border-color);

  /* Desktop: Fixed Left Sidebar */
  @media (min-width: 900px) {
    position: sticky;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border-top: none;
    border-right: var(--border-width) solid var(--border-color);
    box-shadow: 4px 0px 0px var(--border-color);
    padding-top: 2rem;
  }
`;

const NavTitle = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: block;
    font-size: var(--font-xl);
    font-weight: 900;
    padding: 1rem;
    margin: 0 1rem 2rem 1rem;
    border: var(--border-width) solid var(--border-color);
    text-align: center;
    background: var(--secondary-accent);
    transform: rotate(-1deg);
    box-shadow: 4px 4px 0px var(--border-color);
    color: var(--text-color);
  }
`;

const NavItem = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-color)'};
  transition: all 0.1s ease-in-out;
  padding: 10px;

  & > span {
    font-size: var(--font-xs);
    font-weight: 900;
    margin-top: 6px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Desktop Styles */
  @media (min-width: 900px) {
    flex-direction: row;
    gap: 15px;
    padding: 1.5rem 2rem;
    width: 100%;
    font-size: var(--font-lg);
    border-bottom: 1px solid var(--border-color);
    background: ${props => props.active ? 'var(--text-color)' : 'transparent'};
    color: ${props => props.active ? 'var(--card-bg)' : 'var(--text-color)'};
    
    /* Active state indicator for better accessibility */
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 6px;
      background: var(--accent-color);
      display: ${props => props.active ? 'block' : 'none'};
    }

    & > span {
      font-size: var(--font-base);
      margin-top: 0;
    }

    &:hover {
      background: ${props => props.active ? 'var(--text-color)' : 'var(--bg-color)'};
      padding-left: 2.5rem; /* Slide effect */
      font-weight: bold;
    }
    
    &:focus-visible {
      outline: 2px solid var(--accent-color);
      outline-offset: -2px;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Navigation = ({ currentView, onViewChange }) => {
  return (
    <NavContainer>
      <NavTitle>氣象系統</NavTitle>
      
      <NavItem 
        active={currentView === 'home'} 
        onClick={() => onViewChange('home')}
      >
        <Home size={24} strokeWidth={2.5} />
        <span>儀表板</span>
      </NavItem>
      
      <NavItem 
        active={currentView === 'favorites'} 
        onClick={() => onViewChange('favorites')}
      >
        <Star size={24} strokeWidth={2.5} />
        <span>收藏地點</span>
      </NavItem>
    </NavContainer>
  );
};

export default Navigation;
