import React from "react";
import { Episode } from "@/types/topPodcast";
import { EpisodesDetail } from "./EpisodesDetail";

interface EpisodesCardProp {
  episodes: Episode[];
  podcastId: string;
}

export const EpisodesCard = ({ episodes, podcastId }: EpisodesCardProp) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="card p-4">
        <p className="text-lg font-bold">Episodes: {episodes.length}</p>
      </div>
      <EpisodesDetail episodes={episodes} podcastId={podcastId} />
    </div>
  );
};
