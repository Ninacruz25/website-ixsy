// Carousel.jsx
import React, { useState, useEffect } from 'react';

const Carousel = ({ images = [], autoplayInterval = 3000, showThumbnails = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoplayInterval > 0) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % images.length);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [images.length, autoplayInterval]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return <div className="text-white">No hay imágenes disponibles</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Contenedor principal del carrusel */}
      <div className="relative group">
        {/* Imagen principal con sombras en los bordes */}
        <div className="relative overflow-hidden rounded-lg">
          {/* Sombra izquierda */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none"></div>
          
          {/* Sombra derecha */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none"></div>
          
          {/* Imagen */}
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt || `Slide ${activeIndex + 1}`}
            className="w-full h-auto object-cover rounded-lg shadow-2xl transition-all duration-500"
          />
        </div>

        {/* Botón anterior */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Botón siguiente */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores de puntos */}
      {showThumbnails && (
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-teal-500 w-8'
                  : 'bg-gray-400 w-2 hover:bg-gray-300'
              }`}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;