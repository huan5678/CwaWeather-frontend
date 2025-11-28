import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash2, ExternalLink, Loader } from 'lucide-react';
import { cities } from '../data/cities';
import { weatherApi } from '../api/client';
import { getFavorites, removeFavorite } from '../utils/storage';

const PageContainer = styled.div`
  padding-bottom: 80px; /* Space for bottom nav */
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  background: var(--accent-color);
  color: white;
  display: inline-block;
  padding: 5px 10px;
  border: var(--border-width) solid var(--text-color);
  box-shadow: 4px 4px 0px var(--text-color);
  margin-bottom: 20px;
  transform: rotate(1deg);
`;

const FavCard = styled.div`
  background: var(--card-bg);
  border: var(--border-width) solid var(--text-color);
  margin-bottom: 15px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 4px 4px 0px var(--text-color);
  transition: transform 0.1s;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px var(--text-color);
  }
`;

const CityInfo = styled.div`
  flex: 1;
`;

const CityName = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

const WeatherSummary = styled.div`
  font-size: 0.9rem;
  color: #555;
  font-weight: bold;
  margin-top: 5px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? '#ff4444' : 'var(--secondary-accent)'};
  border: 2px solid var(--text-color);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  box-shadow: 2px 2px 0px var(--text-color);

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--text-color);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  border: 2px dashed var(--text-color);
  font-weight: bold;
  color: #666;
`;

const FavoritesPage = ({ onViewCity }) => {
  const [favList, setFavList] = useState([]);
  const [weatherMap, setWeatherMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    const ids = getFavorites();
    setFavList(ids);

    // Fetch basic weather for all fav cities
    // In a real app, you might want a bulk API or be careful with rate limits
    const promises = ids.map(id => 
      weatherApi.getWeather(id)
        .then(res => ({ id, data: res.data }))
        .catch(() => ({ id, data: null }))
    );

    const results = await Promise.all(promises);
    const newMap = {};
    results.forEach(r => {
      if (r.data) newMap[r.id] = r.data;
    });
    
    setWeatherMap(newMap);
    setLoading(false);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    const updated = removeFavorite(id);
    setFavList(updated);
  };

  const getCityName = (id) => cities.find(c => c.id === id)?.name || id;

  if (loading && favList.length === 0) {
    return <div style={{textAlign:'center', marginTop: 40}}><Loader className="spin" /> 讀取收藏中...</div>;
  }

  return (
    <PageContainer>
      <SectionTitle>已收藏地點</SectionTitle>
      
      {favList.length === 0 ? (
        <EmptyState>尚未收藏任何地點</EmptyState>
      ) : (
        favList.map(id => {
          const data = weatherMap[id];
          const forecast = data?.forecasts?.[0];
          
          return (
            <FavCard key={id} onClick={() => onViewCity(id)}>
              <CityInfo>
                <CityName>{getCityName(id)}</CityName>
                {forecast ? (
                  <WeatherSummary>
                    {forecast.weather} | {forecast.minTemp}°-{forecast.maxTemp}°
                  </WeatherSummary>
                ) : (
                  <WeatherSummary>讀取資料中...</WeatherSummary>
                )}
              </CityInfo>
              <ActionGroup>
                <ActionButton onClick={(e) => onViewCity(id)}>
                  <ExternalLink size={20} />
                </ActionButton>
                <ActionButton danger onClick={(e) => handleRemove(e, id)}>
                  <Trash2 size={20} />
                </ActionButton>
              </ActionGroup>
            </FavCard>
          );
        })
      )}
    </PageContainer>
  );
};

export default FavoritesPage;
