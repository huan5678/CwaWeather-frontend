import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CloudRain, CloudSun, Sun, Umbrella, UmbrellaOff, Shirt, UserCheck, Star } from 'lucide-react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/storage';

const Card = styled.div`
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px var(--border-color);
  padding: 2rem;
  margin-bottom: 0;
  position: relative;
  transition: transform 0.1s ease;
  border-radius: var(--radius-sm);
  width: 100%;

  @media (max-width: 600px) {
    padding: 1.5rem; 
  }

  @media (max-width: 350px) {
    padding: 1rem; /* Further reduced padding for iPhone SE */
  }

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: calc(var(--shadow-offset) + 2px) calc(var(--shadow-offset) + 2px) 0px var(--border-color);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  border-bottom: var(--border-width) solid var(--border-color);
  padding-bottom: 1rem;
`;

const LargeTemp = styled.div`
  font-size: var(--font-jumbo); 
  font-weight: 900;
  line-height: 0.9;
  text-shadow: 3px 3px 0px var(--secondary-accent);
  margin-bottom: 0.5rem;
`;

const WeatherDesc = styled.div`
  font-size: var(--font-xl);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const WeatherIconWrapper = styled.div`
  & > svg {
    width: 80px;
    height: 80px;
    stroke-width: 1.5px;
    filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));

    @media (max-width: 350px) {
      width: 60px; /* Smaller icon on narrow screens to prevent overflow */
      height: 60px;
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const InfoBox = styled.div`
  border: var(--border-width) solid var(--border-color);
  background: ${props => props.bg || 'transparent'};
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-color); /* Ensure text is always black for these light bg colors */
  
  span {
    display: block;
    font-size: var(--font-xs);
    text-transform: uppercase;
    opacity: 0.8; /* Increased opacity for legibility */
    margin-top: 4px;
    font-weight: 700;
  }

  svg {
    width: 32px;
    height: 32px;
    stroke-width: 2px;
  }
`;

const Tag = styled.div`
  background: var(--text-color);
  color: var(--card-bg);
  padding: 4px 8px;
  font-size: var(--font-sm);
  font-weight: 900;
  display: inline-block;
  transform: rotate(-2deg);
  border: 2px solid var(--card-bg); /* Double border effect */
  outline: 2px solid var(--text-color);
`;

const BookmarkBtn = styled.button`
  position: absolute;
  top: -15px;
  right: 20px;
  background: ${props => props.active ? 'var(--highlight)' : 'var(--card-bg)'};
  border: var(--border-width) solid var(--border-color);
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 0px var(--border-color);
  transition: all 0.1s;
  z-index: 2;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--border-color);
  }
`;

const WeatherCard = ({ weatherData, cityId, loading }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (cityId) {
      setSaved(isFavorite(cityId));
    }
  }, [cityId]);

  const toggleSave = () => {
    if (saved) {
      removeFavorite(cityId);
      setSaved(false);
    } else {
      addFavorite(cityId);
      setSaved(true);
    }
  };

  if (loading || !weatherData) {
    return (
      <Card>
        <h2 style={{textAlign: 'center', fontSize: 'var(--font-xl)'}}>讀取資料中...</h2>
      </Card>
    );
  }

  const currentForecast = weatherData.forecasts[0];
  const avgTemp = Math.round((parseInt(currentForecast.minTemp) + parseInt(currentForecast.maxTemp)) / 2);
  const rainProb = parseInt(currentForecast.rain);

  // Helper to get main icon
  const getMainIcon = (weatherStr) => {
    if (weatherStr.includes('雨')) return <CloudRain />;
    if (weatherStr.includes('雲')) return <CloudSun />;
    return <Sun />;
  };

  const getAdvice = () => {
    // Updated colors for better contrast against black text
    const rain = rainProb > 30 
      ? { text: "需要帶傘", bg: "#ffcccc", icon: <Umbrella /> } // Light Red
      : { text: "不用帶傘", bg: "#ccffcc", icon: <UmbrellaOff /> }; // Light Green
      
    const tempVal = parseInt(currentForecast.maxTemp);
    const cloth = tempVal >= 28 
      ? { text: "適合短袖", bg: "#ffff99", icon: <Shirt /> } // Yellow
      : tempVal <= 20 
        ? { text: "加件外套", bg: "#99ccff", icon: <UserCheck /> } // Light Blue
        : { text: "穿著舒適", bg: "#e0e0e0", icon: <UserCheck /> }; // Light Gray
        
    return { rain, cloth };
  };

  const advice = getAdvice();

  return (
    <Card>
      <div style={{position: 'absolute', top: '-15px', left: '20px', zIndex: 2}}>
        <Tag>目前天氣</Tag>
      </div>

      <BookmarkBtn onClick={toggleSave} active={saved} title={saved ? "移除收藏" : "加入收藏"}>
        <Star fill={saved ? "black" : "none"} size={20} />
      </BookmarkBtn>
      
      <Header>
        <div>
          <LargeTemp>{avgTemp}°C</LargeTemp>
          <WeatherDesc>{currentForecast.weather}</WeatherDesc>
        </div>
        <WeatherIconWrapper>
          {getMainIcon(currentForecast.weather)}
        </WeatherIconWrapper>
      </Header>

      <InfoGrid>
        <InfoBox bg={advice.rain.bg}>
          {advice.rain.icon}
          <div>
            {advice.rain.text}
            <span>降雨機率: {currentForecast.rain}</span>
          </div>
        </InfoBox>
        <InfoBox bg={advice.cloth.bg}>
          {advice.cloth.icon}
          <div>
            {advice.cloth.text}
            <span>最高溫: {currentForecast.maxTemp}°</span>
          </div>
        </InfoBox>
      </InfoGrid>
    </Card>
  );
};

export default WeatherCard;