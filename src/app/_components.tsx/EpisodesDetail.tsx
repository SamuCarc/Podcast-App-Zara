import React from "react";
import { Episode } from "@/types/topPodcast";
import Link from "next/link";

interface EpisodesDetailProp {
  episodes: Episode[];
  podcastId: string;
}

export const EpisodesDetail = ({ episodes, podcastId }: EpisodesDetailProp) => {
  return (
    <div
      className="card px-6 pb-6 pt-0 mt-5 overflow-y-auto h-50 bg-white"
      style={{ maxHeight: "800px" }}
    >
      <div className="sticky top-0 z-50 bg-white border-b p-2 pt-8 grid grid-cols-12">
        <div className="col-span-8 p-2">
          <p className="text-base font-semibold">Title</p>
        </div>
        <div className="col-span-2 p-2">
          <p className="text-base font-semibold">Date</p>
        </div>
        <div className="col-span-2 p-2">
          <p className="text-base font-semibold">Duration</p>
        </div>
      </div>
      {episodes.map((episode, index) => (
        <div
          key={index}
          className={`grid grid-cols-12 border-t ${
            index % 2 === 0 ? "bg-gray-100" : "bg-white"
          }`}
        >
          <div className="col-span-8 p-2 truncate">
            <Link href={`podcast/${podcastId}/episode/${episode.id}`}>
              <p className="text-base text-sky-600 font-normal">
                {episode.title}
              </p>
            </Link>
          </div>
          <div className="col-span-2 p-2">
            <p className="text-base font-normal">{episode.date}</p>
          </div>
          <div className="col-span-2 p-2">
            <p className="text-base font-normal">{episode.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
