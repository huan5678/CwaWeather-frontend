import React from 'react';
import styled from 'styled-components';
import { Home, Star, Map } from 'lucide-react';

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--card-bg);
  border-top: var(--border-width) solid var(--text-color);
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000;
  box-shadow: 0px -4px 0px var(--text-color);

  @media (min-width: 900px) {
    position: absolute; /* Stick to the bottom of the MobileFrame */
    width: 100%;
    left: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
  transform: ${props => props.active ? 'translateY(-4px)' : 'none'};
  transition: transform 0.2s;

  & > span {
    font-size: 0.7rem;
    font-weight: 900;
    margin-top: 4px;
    text-transform: uppercase;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const BottomNavigation = ({ currentView, onViewChange }) => {
  return (
    <NavContainer>
      <NavItem 
        active={currentView === 'home'} 
        onClick={() => onViewChange('home')}
      >
        <Home size={24} strokeWidth={2.5} />
        <span>Home</span>
      </NavItem>
      
      <NavItem 
        active={currentView === 'favorites'} 
        onClick={() => onViewChange('favorites')}
      >
        <Star size={24} strokeWidth={2.5} />
        <span>Saved</span>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNavigation;
