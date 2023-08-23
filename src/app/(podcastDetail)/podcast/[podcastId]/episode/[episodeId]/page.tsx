"use client";

import { PodcastCard } from "@/app/_components.tsx/PodcastCard";
import { useLoading } from "@/app/context/LoadingContext";
import { Episode, PodcastDataType } from "@/types/topPodcast";
import {
  getDetailPodcastFromStorage,
  saveDetailPodcastStorage,
  shouldFetchNewDetailPodcast,
} from "@/utils/clientStorage";
import { fetchDetailPodcast } from "@/utils/fetchPodcast";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { podcastId: string; episodeId: string };
}) {
  // Podcast del que queremos obtener el detalle
  const [podcast, setPodcast] = useState<PodcastDataType>();
  const [episode, setEpisode] = useState<Episode>();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const fetchAndSetDetailPodcast = async () => {
      // Verifica si se necesita buscar el podcast
      if (shouldFetchNewDetailPodcast(params.podcastId)) {
        const data = await fetchDetailPodcast(params.podcastId);
        if (data) {
          setPodcast(data);
          saveDetailPodcastStorage(params.podcastId, data);
        }
      } else {
        // Si lo tenemos guardados en el Storage y lleva menos de un día guardado
        const data = getDetailPodcastFromStorage(params.podcastId);
        if (data) {
          setPodcast(data);
        }
      }
    };

    fetchAndSetDetailPodcast();
  }, [params.podcastId, setIsLoading]);

  useEffect(() => {
    if (podcast && podcast?.episodes) {
      const episodeDetail = podcast.episodes.find(
        (ep) => ep.id === params.episodeId
      );
      if (episodeDetail) {
        setEpisode(episodeDetail);
        setIsLoading(false);
      } else {
        console.error("Episode not found. Please try again later");
      }
    }
  }, [params.episodeId, podcast, setIsLoading]);

  if (podcast && params.podcastId && episode) {
    return (
      <div className="flex">
        <PodcastCard
          title={podcast.title}
          imageUrl={podcast.imageUrl}
          author={podcast.author}
          description={podcast.description}
          id={podcast.id}
        />
        <div className="flex flex-col flex-grow card p-8 divide-y self-start">
          <div className="pb-4">
            <h2 className="text-2xl mb-3 font-bold">{episode.title}</h2>
            <p
              className="text-base font-normal text-gray-600 italic break-words"
              dangerouslySetInnerHTML={{ __html: episode.description }}
            />
          </div>
          <div className="pt-5">
            <audio controls src={episode.urlMp3} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
