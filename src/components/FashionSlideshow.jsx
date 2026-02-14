import React, { useState, useEffect } from 'react';

export default function FashionSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea3c878d?w=1600&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80',
    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1600&q=80',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1600&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {images.map((url, index) => (
        <div
          key={url}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
