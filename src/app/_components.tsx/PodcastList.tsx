import { EntryTopPodcast } from "@/types/topPodcast";
import { PodcastSmallCard } from "./PodcastSmallCard";

interface PodcastListType {
  podcasts: EntryTopPodcast[];
}

export const PodcastList = ({ podcasts }: PodcastListType) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {podcasts.map((podcast, index) => (
        <PodcastSmallCard
          key={index}
          title={podcast["im:name"].label}
          imageUrl={podcast["im:image"][2].label}
          author={podcast["im:artist"].label}
          id={podcast.id.attributes["im:id"]}
        />
      ))}
    </div>
  );
};
