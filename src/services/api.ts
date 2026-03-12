import axios from 'axios';
import type { WeatherResponse } from '../types/clima';

const API_KEY = '25ddc772a6bae68e4d422739bd792c42';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getCityWeather = async (city: string): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(
    `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`
  );
  return response.data;
};