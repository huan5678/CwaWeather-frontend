import React from 'react';
import styled from 'styled-components';
import { cities } from '../data/cities';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 0; /* Safety for flex container */

  @media (min-width: 600px) {
    flex-wrap: nowrap;
    gap: 1rem;
    justify-content: flex-start;
  }
`;

const Label = styled.div`
  font-weight: 900;
  font-size: var(--font-base);
  background: var(--text-color);
  color: var(--card-bg);
  padding: 4px 8px;
  border: 2px solid var(--text-color);
  white-space: nowrap;
  order: 1;
`;

const Select = styled.select`
  appearance: none;
  background-color: var(--card-bg);
  color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0px var(--border-color);
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: var(--font-base);
  font-weight: 900;
  cursor: pointer;
  border-radius: var(--radius-sm);
  
  order: 3; /* Mobile: Drop to next line */
  width: 100%;
  margin-top: 0.5rem;

  @media (min-width: 600px) {
    order: 2; /* Desktop: Middle */
    width: auto;
    flex: 1; /* Take remaining space */
    margin-top: 0;
  }
  
  &:focus {
    outline: 2px solid var(--accent-color);
    background-color: #ffffff;
    color: var(--text-color);
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px var(--border-color);
  }
`;

const Button = styled.button`
  background: var(--secondary-accent);
  color: #ffffff;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0px var(--border-color);
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-weight: 900;
  cursor: pointer;
  border-radius: var(--radius-sm);
  order: 2; /* Mobile: Next to label */
  
  @media (min-width: 600px) {
    order: 3; /* Desktop: Last */
  }
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px var(--border-color);
  }
`;

const CitySelector = ({ currentCityId, onCityChange, onLocate }) => {
  return (
    <Wrapper>
      <Label>LOC:</Label>
      <Select 
        value={currentCityId} 
        onChange={(e) => onCityChange(e.target.value)}
      >
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name.toUpperCase()}
          </option>
        ))}
      </Select>
      <Button onClick={onLocate} title="Auto-Locate">
        ⌖ GPS
      </Button>
    </Wrapper>
  );
};

export default CitySelector;