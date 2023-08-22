import { config } from "@/config";
import { TopPodcastsData } from "@/types/topPodcast";

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
