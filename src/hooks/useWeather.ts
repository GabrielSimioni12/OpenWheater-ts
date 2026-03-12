import { useState, useEffect } from 'react';
import type { WeatherResponse } from '../types/clima';
import { getCityWeather } from '../services/api';

export const useWeather = () => {
  // O segredo está aqui: <WeatherResponse | null>
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCityWeather(city);
      setData(result);
      localStorage.setItem('lastCity', city);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Aguarde a ativação da chave da API (401).');
      } else {
        setError('Cidade não encontrada.');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) fetchWeather(lastCity);
  }, []);

  return { data, loading, error, fetchWeather };
};