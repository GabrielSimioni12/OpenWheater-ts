import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const [cidade, setCidade] = useState('');
  const { data, loading, error, fetchWeather } = useWeather();

  const formatarHora = (timestamp?: number) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    if (cidade.trim()) fetchWeather(cidade.trim());
  };

  const weatherClass = data ? data.weather[0].main : 'Default';

  return (
  <div className={`app-container ${weatherClass}`}> 
    <div className="glass-card">
        <header>
          <h1>☁️ Weather.TS</h1>
          <p>Seu assistente climático inteligente</p>
        </header>

        <form onSubmit={handleBuscar} className="search-box">
          <input 
            type="text" 
            placeholder="Buscar cidade..." 
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : '🔍'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {data && !loading && (
          <main className="weather-content">
            <div className="location">
              <h2>{data.name}</h2>
              <p>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' })}</p>
            </div>

            <div className="main-display">
              <img 
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
                alt="Clima" 
              />
              <div className="temp-info">
                <span className="current-temp">{Math.round(data.main.temp)}°</span>
                <span className="desc">{data.weather[0].description}</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat">
                <span className="icon">💧</span>
                <div className="stat-text">
                   <p className="val">{data?.main.humidity}%</p>
                   <p className="lab">Umidade</p>
                </div>
              </div>
              <div className="stat">
                <span className="icon">🌬️</span>
                <div className="stat-text">
                   <p className="val">{data?.wind.speed} km/h</p>
                   <p className="lab">Vento</p>
                </div>
              </div>
              <div className="stat">
                <span className="icon">👁️</span>
                <div className="stat-text">
                   <p className="val">{data ? (data.visibility / 1000).toFixed(1) : 0} km</p>
                   <p className="lab">Visibilidade</p>
                </div>
              </div>
              <div className="stat">
                <span className="icon">⏲️</span>
                <div className="stat-text">
                   <p className="val">{data?.main.pressure} hPa</p>
                   <p className="lab">Pressão</p>
                </div>
              </div>
              <div className="stat">
                <span className="icon">🌅</span>
                <div className="stat-text">
                   <p className="val">{formatarHora(data?.sys.sunrise)}</p>
                   <p className="lab">Nascer</p>
                </div>
              </div>
              <div className="stat">
                <span className="icon">🌇</span>
                <div className="stat-text">
                   <p className="val">{formatarHora(data?.sys.sunset)}</p>
                   <p className="lab">Ocaso</p>
                </div>
              </div>
            </div>
          </main>
        )}

        {loading && <div className="loader"><div className="spinner"></div></div>}
      </div>
    </div>
  );
}

export default App;