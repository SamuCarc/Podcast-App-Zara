export const config = {
  topPodcast: process.env.NEXT_PUBLIC_TOP_PODCAST!,
  detailPodcast: process.env.NEXT_PUBLIC_DETAIL_PODCAST,
  storage: {
    topPodcastLastFetchedKey: "lastFetched",
    topPodcastKey: "topPodcasts",
    detailPodcastLastFetchedKey: (id: string) =>
      `detailPodcastLastFetched_${id}`,
    detailPodcastKey: (id: string) => `detailPodcast_${id}`,
  },
};
