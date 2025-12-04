import { useState, useEffect } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

import IMG1 from "@/assets/IMGL1350a.jpg";
import IMG2 from "@/assets/IMGL1283a.jpg";
import IMG3 from "@/assets/IMGL1306a.jpg";
import IMG4 from "@/assets/IMGL1328a.jpg";
import IMG5 from "@/assets/IMGL1354a.jpg";
import IMG6 from "@/assets/IMGL1551a.jpg";
import IMG7 from "@/assets/JNP00129.jpg";
import IMG8 from "@/assets/JNP00114.JPG";
import IMG10 from "@/assets/IMGL1238a.jpg";
import IMG11 from "@/assets/IMGL1510a.jpg";
import IMG12 from "@/assets/IMGL1428a.jpg";
import IMG13 from "@/assets/JNP01865.jpg";
import IMG14 from "@/assets/JNP01343.jpg";
import IMG15 from "@/assets/JNP02519.jpg";
import IMG16 from "@/assets/JNP02749.jpg";
import IMG17 from "@/assets/JNP02873.jpg";
import IMG18 from "@/assets/JNP03097.jpg";
import IMG19 from "@/assets/JNP03455.jpg";
import IMG20 from "@/assets/JNP02397.jpg";
import IMG21 from "@/assets/JNP01573.jpg";
import IMG22 from "@/assets/JNP02237.jpg";

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);

  const photos = [
    IMG7,
    IMG8,
    IMG1,
    IMG2,
    IMG10,
    IMG3,
    IMG4,
    IMG11,
    IMG5,
    IMG6,
    IMG12,
    IMG13,
    IMG14,
    IMG15,
    IMG16,
    IMG17,
    IMG18,
    IMG19,
    IMG20,
    IMG21,
    IMG22,
  ];

  // Shuffle chỉ chạy 1 lần
  useEffect(() => {
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled);
  }, []);

  // Lock scroll khi mở popup
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  const prev = () => {
    setSelectedIndex((i) => (i === 0 ? shuffledPhotos.length - 1 : i - 1));
  };

  const next = () => {
    setSelectedIndex((i) => (i === shuffledPhotos.length - 1 ? 0 : i + 1));
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-rose-500 font-medium">
            Album Ảnh
          </span>
          <p className="text-muted-foreground">
            Những khoảnh khắc đẹp của chúng mình
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-[1px] w-12 bg-rose-200" />
            <ImageIcon className="w-5 h-5 text-rose-400" />
            <div className="h-[1px] w-12 bg-rose-200" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shuffledPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer border border-rose-50 shadow-soft hover:shadow-elegant"
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Dialog */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <img
              src={shuffledPhotos[selectedIndex]}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain"
              draggable={false}
            />

            {/* Counter */}
            <div className="absolute bottom-4 text-white text-sm opacity-80">
              {selectedIndex + 1} / {shuffledPhotos.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
