export interface EntryTopPodcast {
  "im:name": {
    label: string;
  };
  "im:image": { label: string }[];
  "im:artist": {
    label: string;
  };
  id: {
    attributes: {
      "im:id": string;
    };
  };
  summary: {
    label: string;
  };
}

export type TopPodcastsData = {
  feed: {
    entry: EntryTopPodcast[];
  };
};

export type DetailPodcast = {
  results: [
    {
      artistName: string;
      collectionName: string;
      feedUrl: string;
      artworkUrl600: string;
    }
  ];
};

export type ResponseXML = {
  elements: {
    type: "element";
    elements: {
      type: "element";
      elements: GeneralDataXMLItem[] | ImageXMLItem[] | EpisodeXMLItem[];
    }[];
  }[];
};

export type GeneralDataXMLItem = {
  name: "title" | "description" | "itunes:author";
  elements: {
    text: string;
    cdata: string;
  }[];
};

export type ImageXMLItem = {
  name: "image";
  elements: {
    name: "url";
    elements: [
      {
        text: string;
      }
    ];
  }[];
};

export type GeneralEpisodeDataXMLItem = {
  name:
    | "title"
    | "description"
    | "author"
    | "itunes:duration"
    | "guid"
    | "pubDate";
  elements: [
    {
      text: string;
      cdata: string;
    }
  ];
};

export type UrlMp3EpisodeDataXMLItem = {
  name: "enclosure";
  attributes: {
    url: string;
  };
};

export type EpisodeXMLItem = {
  name: "item";
  elements: GeneralEpisodeDataXMLItem[] | UrlMp3EpisodeDataXMLItem[];
};

export type Episode = {
  id: string;
  title: string;
  description: string;
  author: string;
  duration: string;
  urlMp3: string;
  date: string;
};

export type PodcastDataType = {
  id: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  episodes: Episode[];
};
