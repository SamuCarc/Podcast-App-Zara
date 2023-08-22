"use client";
import { useEffect, useState } from "react";
import { fetchTopPodcasts } from "@/utils/fetchPodcast";
import {
  saveTopPodcastStorage,
  getTopPodcastFromStorage,
  shouldFetchNewTopPodcast,
} from "@/utils/clientStorage";
import { EntryTopPodcast } from "@/types/topPodcast";
import { PodcastList } from "../_components.tsx/PodcastList";
import InputSearch from "../_components.tsx/InputSearch";

export default function Page() {
  const [searchString, setSearchString] = useState("");
  const [podcasts, setPodcasts] = useState<EntryTopPodcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<EntryTopPodcast[]>(
    []
  );

  useEffect(() => {
    const fetchAndSetPodcasts = async () => {
      // Verifica si se necesita buscar nuevos podcasts
      if (shouldFetchNewTopPodcast()) {
        const data = await fetchTopPodcasts();
        if (data) {
          setPodcasts(data.feed.entry);
          saveTopPodcastStorage(data);
        }
      } else {
        const data = getTopPodcastFromStorage();
        if (data) {
          setPodcasts(data.feed.entry);
        }
      }
    };

    fetchAndSetPodcasts();
  }, []);

  useEffect(() => {
    if (podcasts.length > 0) {
      setFilteredPodcasts(podcasts);
    }
  }, [podcasts]);

  useEffect(() => {
    const results = podcasts.filter(
      (podcast) =>
        podcast["im:name"].label
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
        podcast["im:artist"].label
          .toLowerCase()
          .includes(searchString.toLowerCase())
    );
    setFilteredPodcasts(searchString == "" ? podcasts : results);
  }, [podcasts, searchString]);

  return (
    <div>
      <InputSearch
        countFilteredPodcast={filteredPodcasts.length}
        setSearchString={setSearchString}
      />
      {filteredPodcasts.length === 0 ? (
        <div className="flex justify-center items-center m-10">
          <p className="font-bold">
            No podcast found with this match &quot;{searchString}&quot;
          </p>
        </div>
      ) : (
        <PodcastList podcasts={filteredPodcasts} />
      )}
    </div>
  );
}
