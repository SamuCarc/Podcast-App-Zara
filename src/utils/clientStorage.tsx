import { config } from "@/config";
import { DetailPodcast, TopPodcastsData } from "@/types/topPodcast";

const STORAGE_KEY = config.storage.topPodcastKey;
const LAST_FETCHED_KEY = config.storage.topPodcastLastFetchedKey;

// TOP PODCASTS DATA FROM CLIENT
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

// DETAIL PODCAST DATA FROM CLIENT
export const saveDetailPodcastStorage = (
  id: string,
  data: DetailPodcast
): void => {
  localStorage.setItem(
    config.storage.detailPodcastKey(id),
    JSON.stringify(data)
  );
  localStorage.setItem(
    config.storage.detailPodcastLastFetchedKey(id),
    Date.now().toString()
  );
};

export const getDetailPodcastFromStorage = (
  id: string
): DetailPodcast | null => {
  const data = localStorage.getItem(config.storage.detailPodcastKey(id));
  if (data) {
    try {
      const parsedData: DetailPodcast = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error(
        `Error parsing stored detail podcast data for ID ${id}:`,
        error
      );
      return null;
    }
  }
  return null;
};

export const shouldFetchNewDetailPodcast = (id: string): boolean => {
  const lastFetched = localStorage.getItem(
    config.storage.detailPodcastLastFetchedKey(id)
  );
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
