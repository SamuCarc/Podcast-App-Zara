import { config } from "@/config";
import { TopPodcastsData } from "@/types/topPodcast";

const STORAGE_KEY = config.storage.topPodcastKey;
const LAST_FETCHED_KEY = config.storage.topPodcastLastFetchedKey;

// TOP PODCAST DATA FROM CLIENT
export const saveTopPodcastStorage = (data: TopPodcastsData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(LAST_FETCHED_KEY, Date.now().toString());
};

export const getTopPodcastFromStorage = (): TopPodcastsData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const parsedData: TopPodcastsData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error("Error parsing stored podcast data:", error);
      return null;
    }
  }
  return null;
};

export const shouldFetchNewTopPodcast = (): boolean => {
  const lastFetched = localStorage.getItem(LAST_FETCHED_KEY);
  if (lastFetched) {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    if (now - Number(lastFetched) > oneDay) {
      return true;
    }
    return false;
  }
  return true;
};
