import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { CloudRain, CloudSun, Sun, Droplets } from 'lucide-react';

const Container = styled.div`
  width: 100%;
`;

const ScrollContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr); /* Allow shrinking below content width */
  gap: 1rem;
  width: 100%;

  /* Tablet (e.g. > 600px): Maybe 2 columns? Let's keep it simple or auto-fit */
  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  /* Desktop: Keep existing auto-fit logic, which is covered by the media query above */
`;

const Card = styled.div`
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px var(--border-color);
  width: 100%; /* Ensure card fills the grid cell */
  min-width: 140px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.1s;
  border-radius: var(--radius-sm);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: calc(var(--shadow-offset) + 2px) calc(var(--shadow-offset) + 4px) 0px var(--border-color);
  }

  @media (min-width: 900px) {
    min-width: auto; /* Let grid handle width */
  }
`;

const TimeBadge = styled.div`
  background: var(--text-color);
  color: var(--card-bg);
  font-weight: 900;
  padding: 4px 8px;
  font-size: var(--font-xs);
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TempRange = styled.div`
  font-weight: 900;
  font-size: var(--font-lg);
  margin: 10px 0;
  color: var(--text-color);
`;

const RainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-sm);
  color: var(--text-color); /* Ensure high contrast */
  font-weight: bold;
  opacity: 0.8;
`;

const ForecastList = ({ forecasts, loading }) => {
  if (loading || !forecasts || forecasts.length === 0) return null;

  const futureForecasts = forecasts.slice(1);

  const getWeatherIcon = (weatherStr) => {
    if (weatherStr.includes('雨')) return <CloudRain size={32} />;
    if (weatherStr.includes('雲')) return <CloudSun size={32} />;
    return <Sun size={32} />;
  };

  return (
    <Container>
      <ScrollContent>
        {futureForecasts.map((item, index) => {
          const startTime = dayjs(item.startTime);
          const isTomorrow = startTime.date() !== dayjs().date();
          
          let period = "";
          const hour = startTime.hour();
          if (hour >= 5 && hour < 11) period = "早晨";
          else if (hour >= 11 && hour < 14) period = "中午";
          else if (hour >= 14 && hour < 18) period = "下午";
          else if (hour >= 18 && hour < 23) period = "晚上";
          else period = "深夜";

          const displayTime = isTomorrow ? `明天 ${period}` : period;

          return (
            <Card key={index}>
              <TimeBadge>{displayTime}</TimeBadge>
              {getWeatherIcon(item.weather)}
              <TempRange>
                {parseInt(item.minTemp)}° - {parseInt(item.maxTemp)}°
              </TempRange>
              <RainInfo>
                <Droplets size={14} /> {item.rain}
              </RainInfo>
            </Card>
          );
        })}
      </ScrollContent>
    </Container>
  );
};

export default ForecastList;