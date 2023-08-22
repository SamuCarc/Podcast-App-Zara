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
  results: {
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    feedUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    artworkUrl600: string;
  };
};
