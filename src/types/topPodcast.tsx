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
}

export type TopPodcastsData = {
  feed: {
    entry: EntryTopPodcast[];
  };
};
