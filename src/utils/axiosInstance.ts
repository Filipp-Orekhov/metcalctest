import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://679b419e33d31684632334e9.mockapi.io/api/metcalc/",
});


interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache: Record<string, CacheEntry<unknown>> = {};
const TTL = 3600000;

axiosInstance.interceptors.request.use((config) => {
  if (config.method === "get" && config.url) {
    const cachedMemory = memoryCache[config.url];
    if (cachedMemory && Date.now() - cachedMemory.timestamp < TTL) {
      return Promise.reject({ data: cachedMemory.data, fromCache: true });
    }

    const cachedLocal = localStorage.getItem(config.url);
    if (cachedLocal) {
      try {
        const { data, timestamp } = JSON.parse(cachedLocal);
        if (Date.now() - timestamp < TTL) {
          memoryCache[config.url] = { data, timestamp };
          return Promise.reject({ data, fromCache: true });
        }
      } catch (error) {
        console.error("Ошибка при чтении кеша из localStorage:", error);
      }
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.method === "get" && response.config.url) {

      memoryCache[response.config.url] = {
        data: response.data,
        timestamp: Date.now(),
      };

      localStorage.setItem(
        response.config.url,
        JSON.stringify({ data: response.data, timestamp: Date.now() })
      );
    }
    return response;
  },
  (error) => {
    if (error.fromCache) {
      return Promise.resolve({ data: error.data });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;