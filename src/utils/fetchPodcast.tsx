import { config } from "@/config";
import { DetailPodcast, TopPodcastsData } from "@/types/topPodcast";

// FECTH FOR TopPodcast
export const fetchTopPodcasts = async (): Promise<TopPodcastsData | null> => {
  try {
    const response = await fetch(config.topPodcast);
    if (response.ok) {
      const data: TopPodcastsData = await response.json();
      return data;
    }
    console.error("Error fetching podcasts: Invalid response");
    return null;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return null;
  }
};

// Fetch for Detail Podcast
export const fetchDetailPodcast = async (id: string): Promise<any | null> => {
  try {
    const url = `${config.detailPodcast}?id=${id}`; // Asume que el ID es un parámetro de consulta; ajusta según sea necesario
    const response = await fetch(url);
    if (response.ok) {
      const data: DetailPodcast = await response.json();
      return data;
    }
    console.error(
      `Error fetching detail podcast for ID ${id}: Invalid response`
    );
    return null;
  } catch (error) {
    console.error(`Error fetching detail podcast for ID ${id}:`, error);
    return null;
  }
};
