import React, { useState, useEffect } from 'react';

const CarrucelCommunity = ({ 
  images = [], 
  autoplayInterval = 3000, 
  showThumbnails = true,
  visibleSlidesConfig = { mobile: 1, tablet: 2, desktop: 3, large: 4 }
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  // Calcular slides visibles según el tamaño de pantalla
  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleSlides(visibleSlidesConfig.large);
      } else if (width >= 768) {
        setVisibleSlides(visibleSlidesConfig.desktop);
      } else if (width >= 640) {
        setVisibleSlides(visibleSlidesConfig.tablet);
      } else {
        setVisibleSlides(visibleSlidesConfig.mobile);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, [visibleSlidesConfig]);

  // Autoplay
  useEffect(() => {
    if (autoplayInterval > 0 && !isPaused) {
      const maxIndex = Math.max(0, images.length - visibleSlides);
      const interval = setInterval(() => {
        setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [images.length, autoplayInterval, isPaused, visibleSlides]);

  const maxIndex = Math.max(0, images.length - visibleSlides);

  const goToSlide = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : maxIndex));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current < maxIndex ? current + 1 : 0));
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (!images || images.length === 0) {
    return <div className="text-white">No hay imágenes disponibles</div>;
  }

  const slideWidth = 100 / visibleSlides;
  const totalPages = Math.ceil(images.length / visibleSlides);
  const currentPage = Math.floor(activeIndex / visibleSlides);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Botón anterior */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/200 hover:bg-white/40 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Botón siguiente */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/200 hover:bg-white/40 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Container del carrusel */}
        <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-8 mx-12">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(-${activeIndex * slideWidth}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 group"
                style={{ width: `calc(${slideWidth}% - 1.125rem)` }}
                onClick={() => goToSlide(Math.max(0, Math.min(index - Math.floor(visibleSlides / 2), maxIndex)))}
              >
                {/* Contenedor de imagen con altura fija */}
                <div className="p-6 flex items-center justify-center h-56">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                {/* Título */}
                <div className="px-4 pb-4">
                  <p className="text-center text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        {showThumbnails && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * visibleSlides)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? 'bg-teal-500 w-8'
                  : 'bg-gray-400 w-2 hover:bg-gray-300'
                }`}
                aria-label={`Ir a la página ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarrucelCommunity;