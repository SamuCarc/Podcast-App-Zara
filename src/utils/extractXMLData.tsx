import {
  DescriptionEpisodeDataXMLItem,
  Episode,
  EpisodeXMLItem,
  ResponseXML,
  UrlMp3EpisodeDataXMLItem,
} from "@/types/topPodcast";

// Extraemos los datos del podcast del XML
export const extractDescriptionFromXML = (
  xmlData: ResponseXML
): {
  description: string;
} => {
  let description = "";

  try {
    const validElement = xmlData.elements.find(
      (element) => element.type === "element"
    );

    let elements;
    if (validElement) {
      const innerValidElement = validElement.elements.find(
        (innerElement) => innerElement.type === "element"
      );

      if (innerValidElement) {
        elements = innerValidElement.elements;
      }
    }

    if (elements) {
      // Extrae GeneralDataXMLItem
      for (const element of elements) {
        if (element.name === "description") {
          description = element.elements[0].text || element.elements[0].cdata;
        }
      }

      return { description };
    } else {
      console.error("No se encontró un conjunto de elementos válido.");
      return { description: "" };
    }
  } catch (error) {
    console.error("Error extracting description data from XML", error);
    return { description: "" };
  }
};

// Extraemos los datos de los episodios del XML
export function extractEpisodesFromXML(responseXML: ResponseXML): Episode[] {
  // Validar la estructura
  if (
    !responseXML.elements ||
    !responseXML.elements[0].elements ||
    !responseXML.elements[0].elements[0].elements
  ) {
    return [];
  }

  // Extraer items de episodios
  const episodeItems = responseXML.elements[0].elements[0].elements.filter(
    (element): element is EpisodeXMLItem =>
      "name" in element && element.name === "item"
  );
  // Convertir cada item a un objeto Episode

  return episodeItems.map((item): Episode => {
    let episode: Partial<Episode> = {};

    item.elements.forEach((element) => {
      if ("name" in element) {
        switch (element.name) {
          case "title":
          case "itunes:title":
            episode.title =
              element.elements[0].text || element.elements[0].cdata;
            break;
          case "description":
            episode.description =
              element.elements[0].text || element.elements[0].cdata;
            break;
          case "author":
            episode.author =
              element.elements[0].text || element.elements[0].cdata;
            break;
          case "itunes:duration":
            episode.duration =
              element.elements[0]?.text || element.elements[0]?.cdata
                ? element.elements[0]?.text || element.elements[0]?.cdata
                : "0:00:00";
            break;
          case "guid":
            episode.id = element.elements[0].text || element.elements[0].cdata;
            break;
          case "enclosure":
            episode.urlMp3 = (
              element as UrlMp3EpisodeDataXMLItem
            ).attributes.url;
            break;
          default:
            break;
        }
      }
    });
    return episode as Episode;
  });
}
