import React, { useEffect, useState } from "react";

const Black = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=black_and_white_minimal&per_page=12&page=${page}&client_id=g5pOR7kg7JDWCB30yA0fH1RXri_ZswBn-pJgtUlPgpU`
    );
    const data = await res.json();
    setImages((prev) => [...prev, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-6 bg-[#00060a] min-h-screen text-white">

      {/* Masonry-style layout */}
      <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
        {images.map((img) => (
          <div key={img.id} className="mb-4 break-inside-avoid">
            <img
              src={img.urls.small}
              alt={img.alt_description}
              loading="lazy"
              className="rounded-lg shadow-lg hover:scale-[1.02] transition-transform w-full"
            />
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading more wallpapers...</p>}
    </div>
  );
};

export default Black;
