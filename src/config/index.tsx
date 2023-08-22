export const config = {
  topPodcast: process.env.NEXT_PUBLIC_TOP_PODCAST!,
  detailPodcast: process.env.NEXT_PUBLIC_DETAIL_PODCAST,
  storage: {
    topPodcastLastFetchedKey: "lastFetched",
    topPodcastKey: "topPodcasts",
  },
};
