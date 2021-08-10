import { useEffect, useState } from "react";
import Video from "../types/video";
import demoVideos from "../utils/demoVideos";
import getVideos from "../utils/vidsFromArray";
import useLocalSync from "./useLocalSync";
import useToggle from "./useToggle";
import useFilter from "./useFilter";
import useSort from "./useSort";

function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useLocalSync({ videos, setVideos });

  // *** Filter and sort ***

  const { listToDisplay, favoritesOnly, toggleFavoritesOnly } = useSort(videos);
  const { oldestFirst, toggleOldestFirst } = useFilter(listToDisplay);
  //

  // *** Pagination ***

  const VIDS_PER_PAGE = 6;
  const pagesCount = Math.ceil(listToDisplay.length / VIDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);

  const currentPageVideos = listToDisplay.slice(
    currentPage * VIDS_PER_PAGE,
    currentPage * VIDS_PER_PAGE + VIDS_PER_PAGE
  );

  const toggleFavFilter = () => {
    toggleFavoritesOnly();
    setCurrentPage(0);
  };

  // *** CRUD ***

  const addVideo = (newVid: Video) => {
    const videoExists = videos.find(({ id }) => id === newVid.id);
    if (videoExists) {
      return false;
    }

    setVideos((prev) => [newVid, ...prev]);
    return true;
  };

  const removeVideo = (deleteId: string) => {
    setVideos((prev) => prev.filter(({ id }) => id !== deleteId));

    // Go back a page if it's the last video
    // from the current page being deleted
    if (currentPageVideos.length === 1 && pagesCount > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleFavorite = (favId: string) => {
    setVideos((prev) =>
      prev.map((vid) =>
        vid.id === favId
          ? {
              ...vid,
              favorite: !vid.favorite,
            }
          : vid
      )
    );
  };

  // *** Wipe and load data ***

  const loadDemoData = async () => {
    const videos = await getVideos(demoVideos);
    setVideos(videos);
  };

  const wipeData = () => setVideos([]);

  // *** Layout ***

  const [isGrid, toggleGrid] = useToggle();

  return {
    videos: currentPageVideos,
    addVideo,
    removeVideo,
    toggleFavorite,

    loadDemoData,
    wipeData,

    favoritesOnly,
    toggleFavFilter,
    oldestFirst,
    toggleOldestFirst,

    pagesCount,
    setCurrentPage,
    currentPage,

    isGrid,
    toggleGrid,
  };
}

export default useVideos;
