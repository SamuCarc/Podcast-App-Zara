"use client";

import { EpisodesCard } from "@/app/_components.tsx/EpisodesCard";
import { PodcastCard } from "@/app/_components.tsx/PodcastCard";
import { useLoading } from "@/app/context/LoadingContext";
import { PodcastDataType } from "@/types/topPodcast";
import {
  getDetailPodcastFromStorage,
  saveDetailPodcastStorage,
  shouldFetchNewDetailPodcast,
} from "@/utils/clientStorage";
import { fetchDetailPodcast } from "@/utils/fetchPodcast";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { podcastId: string } }) {
  // Podcast del que queremos obtener el detalle
  const [podcast, setPodcast] = useState<PodcastDataType>();
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
          setIsLoading(false);
        }
      } else {
        // Si lo tenemos guardados en el Storage y lleva menos de un día guardado
        const data = getDetailPodcastFromStorage(params.podcastId);
        if (data) {
          setPodcast(data);
          setIsLoading(false);
        }
      }
    };

    fetchAndSetDetailPodcast();
  }, [params.podcastId, setIsLoading]);

  if (podcast && params.podcastId) {
    return (
      <div className="flex">
        <PodcastCard
          title={podcast.title}
          imageUrl={podcast.imageUrl}
          author={podcast.author}
          description={podcast.description}
          id={podcast.id}
        />
        <EpisodesCard
          episodes={podcast.episodes}
          podcastId={params.podcastId}
        />
      </div>
    );
  } else {
    return <></>;
  }
}
