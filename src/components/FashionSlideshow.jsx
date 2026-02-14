import React, { useState, useEffect } from 'react';

export default function FashionSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Different Unsplash queries for variety
  const queries = [
    'fashion,runway',
    'street,style,fashion',
    'haute,couture',
    'sneakers,fashion',
    'vintage,fashion',
    'designer,fashion'
  ];

  const getImageUrl = (index) => {
    const query = queries[index % queries.length];
    // Add timestamp to force new image on each rotation
    return `https://source.unsplash.com/1600x900/?${query}&sig=${index}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoaded(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % 20); // Cycle through 20 variations
        setIsLoaded(true);
      }, 500); // Brief fade out before changing
    }, 6000); // Change every 6 seconds

    setIsLoaded(true);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <img
        src={getImageUrl(currentIndex)}
        alt="Fashion background"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
