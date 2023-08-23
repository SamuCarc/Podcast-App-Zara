import { config } from "@/config";
import { PodcastDataType, TopPodcastsData } from "@/types/topPodcast";
import { compress, decompress } from "lz-string";

const STORAGE_KEY = config.storage.topPodcastKey;
const LAST_FETCHED_KEY = config.storage.topPodcastLastFetchedKey;

// TOP PODCASTS DATA FROM CLIENT
export const saveTopPodcastStorage = (data: TopPodcastsData): void => {
  const compressedValue = compress(JSON.stringify(data));

  if (!compressedValue) {
    console.error("Error compressing stored Podcasts data:");
  }

  localStorage.setItem(STORAGE_KEY, compressedValue);
  localStorage.setItem(LAST_FETCHED_KEY, Date.now().toString());
};

export const getTopPodcastFromStorage = (): TopPodcastsData | null => {
  const compressedValue = localStorage.getItem(STORAGE_KEY);
  if (!compressedValue) {
    console.error("Error getting stored Podcasts data:");
    return null;
  }

  const data = decompress(compressedValue);
  if (data) {
    try {
      const parsedData: TopPodcastsData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error("Error decompressing stored Podcasts data:", error);
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
  data: PodcastDataType
): void => {
  const compressedValue = compress(JSON.stringify(data));
  if (!compressedValue) {
    console.error("Error compressing stored Detail Podcast data:");
  }

  localStorage.setItem(config.storage.detailPodcastKey(id), compressedValue);
  localStorage.setItem(
    config.storage.detailPodcastLastFetchedKey(id),
    Date.now().toString()
  );
};

export const getDetailPodcastFromStorage = (
  id: string
): PodcastDataType | null => {
  const compressedValue = localStorage.getItem(
    config.storage.detailPodcastKey(id)
  );
  if (!compressedValue) {
    console.error("Error getting stored Detail Podcast data:");
    return null;
  }

  const data = decompress(compressedValue);
  if (data) {
    try {
      const parsedData: PodcastDataType = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error("Error decompressing stored Detail Podcast data:", error);
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
