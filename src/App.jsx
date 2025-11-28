import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import CitySelector from './components/CitySelector';
import Navigation from './components/Navigation';
import FavoritesPage from './components/FavoritesPage';
import WeatherChart from './components/WeatherChart';
import { weatherApi } from './api/client';
import { getUserLocation, getNearestCity } from './utils/geolocation';

/* === MAIN LAYOUT STRUCTURE === */
const Layout = styled.div`
  min-height: 100vh;
  width: 100%; /* Ensure layout takes full viewport width */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @media (min-width: 900px) {
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  padding-bottom: 100px; /* Mobile Nav Space */
  position: relative;
  width: 100%; /* Ensure it tries to fill width */
  min-width: 0; /* Prevent flex overflow issues */
  
  /* Decorative Grid Background */
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(var(--text-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--text-color) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.05;
    z-index: -1;
  }

  @media (min-width: 900px) {
    padding: 40px;
    padding-bottom: 40px;
    margin-left: 0;
    overflow-y: auto;
    height: 100%;
  }
`;

/* === DASHBOARD GRID FOR DESKTOP === */
const DashboardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: none; /* Ensure no max-width constraints */

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 350px 1fr; /* Asymmetric split: Fixed control panel, flexible data area */
    align-items: start;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const DataColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 0; /* Crucial: Allows flex container to shrink below content size, preventing overflow */
`;

const AnalyticsSection = styled.div`
  width: 100%;
`;

const ProjectionsSection = styled.div`
  width: 100%;
`;

/* === UI ELEMENTS === */
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: var(--secondary-accent);
  display: inline-block;
  padding: 0 10px;
  border: var(--border-width) solid var(--text-color);
  box-shadow: 6px 6px 0px var(--text-color);
  transform: rotate(-1deg);

  @media (max-width: 600px) {
    font-size: 2rem; /* Reduce size on mobile to prevent overflow */
    box-shadow: 4px 4px 0px var(--text-color); /* Reduce shadow */
  }

  @media (min-width: 900px) {
    display: none; /* Hidden on desktop, moved to sidebar */
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 0.9rem;
`;

const ErrorBanner = styled.div`
  background: #ff4444;
  color: white;
  padding: 1rem;
  border: var(--border-width) solid var(--text-color);
  margin-bottom: 1rem;
  font-weight: bold;
  box-shadow: 4px 4px 0px var(--text-color);
`;

const SectionHeader = styled.h3`
  background: var(--text-color);
  color: var(--card-bg);
  display: inline-block;
  padding: 4px 12px;
  transform: skew(-10deg);
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    transform: skew(-5deg); /* Less aggressive skew on mobile */
    font-size: 0.9rem; /* Slightly smaller text */
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentCityId, setCurrentCityId] = useState('kaohsiung');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateTime, setUpdateTime] = useState('');

  const fetchWeather = async (cityId) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await weatherApi.getWeather(cityId);
      
      if (response.success) {
        setWeatherData(response.data);
        const now = new Date();
        setUpdateTime(`${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      console.error(err);
      setError('FAILED TO FETCH DATA. CHECK NETWORK.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocate = async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getUserLocation();
      const nearest = getNearestCity(coords.lat, coords.lon);
      if (nearest) setCurrentCityId(nearest.id);
      else setError('LOCATION OUT OF RANGE');
    } catch (err) {
      console.error(err);
      setError(err.message.toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'home') {
      fetchWeather(currentCityId);
    }
  }, [currentCityId, currentView]);

  const handleViewCityFromFavorites = (cityId) => {
    setCurrentCityId(cityId);
    setCurrentView('home');
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        
        <MainContent>
          <StatusBar>
            <span>SYS.VER: 3.0_DASHBOARD</span>
            <span>LAST_SYNC: {updateTime || '--:--'}</span>
          </StatusBar>

          <Title>WEATHER_OS</Title>

          {error && <ErrorBanner>ERROR: {error}</ErrorBanner>}

          {currentView === 'home' ? (
            <DashboardGrid>
              {/* Left Column: Controls */}
              <TopSection>
                <div>
                  <SectionHeader>儀表板總覽</SectionHeader>
                </div>
                
                <div>
                   <CitySelector 
                    currentCityId={currentCityId} 
                    onCityChange={setCurrentCityId}
                    onLocate={handleLocate}
                  />
                </div>
                
                <div>
                   <WeatherCard 
                    weatherData={weatherData} 
                    cityId={currentCityId}
                    loading={loading} 
                  />
                </div>
              </TopSection>

              {/* Right Column: Data */}
              <DataColumn>
                <AnalyticsSection>
                  <SectionHeader>數據分析 (36小時趨勢)</SectionHeader>
                  {weatherData && (
                    <WeatherChart forecasts={weatherData.forecasts} />
                  )}
                </AnalyticsSection>

                <ProjectionsSection>
                  <SectionHeader>未來預報</SectionHeader>
                  <ForecastList 
                    forecasts={weatherData?.forecasts} 
                    loading={loading} 
                  />
                </ProjectionsSection>
              </DataColumn>
            </DashboardGrid>
          ) : (
            <FavoritesPage onViewCity={handleViewCityFromFavorites} />
          )}
        </MainContent>
      </Layout>
    </>
  );
}

export default App;