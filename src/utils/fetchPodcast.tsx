import { config } from "@/config";
import {
  DetailPodcast,
  PodcastDataType,
  ResponseXML,
  TopPodcastsData,
} from "@/types/topPodcast";
import {
  extractDescriptionFromXML,
  extractEpisodesFromXML,
} from "./extractXMLData";
import { xml2json } from "xml-js";

// FECTH para el Top Podcast
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

// Fetch para obtener XML con detalles del Podcast y Episodios
const fetchXMLData = async (url: string): Promise<ResponseXML | null> => {
  try {
    const response = await fetch(config.proxyUrlHerokuapp + url);

    if (response.ok) {
      const textXML = await response.text();
      const data = xml2json(textXML);
      return JSON.parse(data);
    } else {
      const response = await fetch(config.proxyUrl + "/" + url);
      if (response.ok) {
        const textXML = await response.text();
        const data = xml2json(textXML);
        return JSON.parse(data);
      }
      console.error("Error fetching XML data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching XML data", error);
    return null;
  }
};

export const fetchDetailPodcast = async (
  id: string
): Promise<PodcastDataType | null> => {
  try {
    const url = encodeURIComponent(`${config.detailPodcast}${id}`);
    const proxyUrl = config.proxyUrl;
    const response = await fetch(proxyUrl + url);

    if (response.ok) {
      const rawData = await response.json();

      if (rawData && rawData.contents) {
        const data: DetailPodcast = JSON.parse(rawData.contents);
        if (data?.results[0].feedUrl && data?.results[0].artworkUrl600) {
          const parsedData = await fetchXMLData(data?.results[0].feedUrl);
          if (parsedData) {
            const extractDescriptionXML = extractDescriptionFromXML(parsedData);

            const extractedEpisodesData = extractEpisodesFromXML(parsedData);

            if (extractedEpisodesData) {
              const result: PodcastDataType = {
                id,
                ...extractDescriptionXML,
                title: data?.results[0].collectionName,
                author: data?.results[0].artistName,
                imageUrl: data?.results[0].artworkUrl600,
                episodes: extractedEpisodesData,
              };
              return result;
            } else {
              console.error("Failed to extract data.");
              return null;
            }
          } else {
            console.error("Failed to parse XML.");
            return null;
          }
        } else {
          console.error("XML not found.");
          return null;
        }
      } else {
        console.error(
          `Error parsing detail podcast data for ID ${id}: contents not found`
        );
        return null;
      }
    } else {
      console.error(
        `Error fetching detail podcast for ID ${id}: Invalid response`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching detail podcast for ID ${id}: Invalid response`,
      error
    );
    return null;
  }
};
