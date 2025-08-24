import React, { useEffect, useState, useCallback } from "react";
import Masonry from "react-masonry-css";

const ACCESS_KEY = "g5pOR7kg7JDWCB30yA0fH1RXri_ZswBn-pJgtUlPgpU";

const Car = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Fetch images (memoized with useCallback to avoid unnecessary re-renders)
  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return; // prevent duplicate calls
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=minimal_car&per_page=12&page=${page}&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();

      // If no results, stop further fetch
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) => [...prev, ...data.results]);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // ✅ Load images when page changes
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // ✅ Infinite scroll with IntersectionObserver (more efficient than scroll listener)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const sentinel = document.querySelector("#sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, loading]);

  // ✅ Responsive breakpoints
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {images.map((img) => (
          <div key={img.id} className="mb-4 overflow-hidden rounded-lg shadow-lg">
            <img
              src={img.urls.small}
              alt={img.alt_description || "minimal car wallpaper"}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </Masonry>

      {/* Sentinel for infinite scroll */}
      <div id="sentinel" className="h-10" />

      {loading && <p className="text-center mt-4">Loading wallpapers...</p>}
      {!hasMore && <p className="text-center mt-4 text-gray-400">No more wallpapers</p>}
    </div>
  );
};

export default Car;
