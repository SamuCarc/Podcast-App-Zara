import {
  Episode,
  EpisodeXMLItem,
  GeneralEpisodeDataXMLItem,
  ResponseXML,
  UrlMp3EpisodeDataXMLItem,
} from "@/types/topPodcast";
import { SlowBuffer } from "buffer";

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
      console.error("No valid set of elements found.");
      return { description: "" };
    }
  } catch (error) {
    console.error("Error extracting description data from XML", error);
    return { description: "" };
  }
};

// Extraemos los datos de los episodios del XML
export function extractEpisodesFromXML(responseXML: ResponseXML): Episode[] {
  try {
    const validElement = responseXML.elements.find(
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
      const episodeItems = elements.filter(
        (element): element is EpisodeXMLItem =>
          "name" in element && element.name === "item"
      );
      // Convertir cada item a un objeto Episode
      console.log("episodeItems");
      console.log(episodeItems);
      return episodeItems.map((item): Episode => {
        let episode: Partial<Episode> = {};

        item.elements.forEach((element) => {
          if ("name" in element) {
            let dataElement = "";
            if (element.name !== "enclosure") {
              dataElement =
                element &&
                element.elements &&
                element.elements[0] &&
                (element.elements[0]?.text || element.elements[0]?.cdata)
                  ? element.elements[0].text || element.elements[0].cdata
                  : "";
            } else {
              dataElement = element.attributes.url;
            }

            switch (element.name) {
              case "title":
                episode.title = dataElement;
                break;
              case "description":
                episode.description = dataElement;
                break;
              case "author":
                episode.author = dataElement;
                break;
              case "guid":
                episode.id = dataElement;
                break;
              case "itunes:duration":
                episode.duration = formatDuration(dataElement);
                break;
              case "pubDate":
                episode.date = formatDate(dataElement);
                break;
              case "enclosure":
                episode.urlMp3 = dataElement;
                break;
              default:
                break;
            }
          }
        });
        return episode as Episode;
      });
    } else {
      console.error("No valid set of elements found.");
      return [];
    }
  } catch (error) {
    console.error("Error extracting episodes data from XML", error);
    return [];
  }
}

function secondsToHMS(d: number): string {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 60);

  const hDisplay = h > 0 ? `${h.toString().padStart(2, "0")}:` : "";
  const mDisplay = `${m.toString().padStart(2, "0")}:`;
  const sDisplay = s.toString().padStart(2, "0");

  return hDisplay + mDisplay + sDisplay;
}

function formatDuration(duration: string | number): string {
  if (typeof duration === "string") {
    // Si ya tiene formato "hh:mm:ss" o "mm:ss", simplemente regresamos la misma cadena
    if (duration.includes(":")) {
      const parts = duration.split(":");
      if (parts.length === 3 && parts[0] === "00") {
        return `${parts[1]}:${parts[2]}`;
      }
      return duration;
    } else {
      // Convertir la cadena de segundos a número y proceder
      return formatDuration(Number(duration));
    }
  } else if (typeof duration === "number") {
    return secondsToHMS(duration);
  }

  throw new Error("Invalid duration format");
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que se suma 1.
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
