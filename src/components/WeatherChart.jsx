import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import dayjs from 'dayjs';

const ChartCard = styled.div`
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0px var(--border-color);
  margin-bottom: 2rem;
  padding: 1rem;
  position: relative;
  border-radius: var(--radius-sm);
  min-width: 0; /* Crucial for responsive charts */
  overflow: hidden; /* Ensure SVG doesn't bleed out */
`;

const ChartTitle = styled.div`
  font-weight: 900;
  margin-bottom: 10px;
  text-align: center;
  background: var(--text-color);
  color: var(--card-bg);
  display: inline-block;
  padding: 2px 8px;
  transform: rotate(-1deg);
  font-size: var(--font-base);
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--card-bg)', 
        border: '2px solid var(--border-color)',
        padding: '8px',
        boxShadow: '2px 2px 0px var(--border-color)'
      }}>
        <p style={{fontWeight:'bold', margin:0}}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{color: entry.color, margin:0, fontWeight:'bold'}}>
            {entry.name}: {entry.value}{entry.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartContainer = styled.div`
  width: 100%;
  height: 250px; /* Default height for mobile */
  
  @media (min-width: 900px) {
    height: 350px; /* Taller on desktop for better readability */
  }
`;

const WeatherChart = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) return null;

  const data = forecasts.map(f => ({
    time: dayjs(f.startTime).format('HH:mm'),
    temp: Math.round((parseInt(f.maxTemp) + parseInt(f.minTemp)) / 2),
    rain: parseInt(f.rain)
  }));

  return (
    <ChartCard>
      <ChartTitle>36小時趨勢</ChartTitle>
      <ChartContainer>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{fontSize: 12, fill: 'var(--text-color)', fontWeight: 'bold'}} 
              axisLine={{stroke: 'var(--text-color)', strokeWidth: 2}}
            />
            <YAxis 
              yAxisId="left" 
              tick={{fontSize: 12, fill: 'var(--text-color)', fontWeight: 'bold'}} 
              axisLine={{stroke: 'var(--text-color)', strokeWidth: 2}}
              label={{ value: '°C', position: 'insideTopLeft', dy: -10, fill: 'var(--text-color)', fontSize: 10, fontWeight: 'bold' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{fontSize: 12, fill: 'var(--secondary-accent)', fontWeight: 'bold'}} 
              axisLine={{stroke: 'var(--secondary-accent)', strokeWidth: 2}}
              label={{ value: '%', position: 'insideTopRight', dy: -10, fill: 'var(--secondary-accent)', fontSize: 10, fontWeight: 'bold' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontWeight: 'bold', fontSize: '12px', left: 0}} />
            
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="temp" 
              name="氣溫" 
              stroke="var(--text-color)" 
              strokeWidth={3}
              dot={{r: 4, strokeWidth: 2, fill: 'white', stroke: 'var(--text-color)'}} 
              unit="°C"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="rain" 
              name="降雨機率" 
              stroke="var(--secondary-accent)" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={{r: 4, strokeWidth: 2, fill: 'white', stroke: 'var(--secondary-accent)'}}
              unit="%"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartCard>
  );
};

export default WeatherChart;
