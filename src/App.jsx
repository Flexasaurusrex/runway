import React, { useState, useEffect } from 'react';
import CreatorTile from './components/CreatorTile.jsx';
import AISearchBar from './components/AISearchBar.jsx';
import FullScreenPlayer from './components/FullScreenPlayer.jsx';
import WelcomeModal from './components/WelcomeModal.jsx';
import InfoButton from './components/InfoButton.jsx';
import ApplyButton from './components/ApplyButton.jsx';
import FashionSlideshow from './components/FashionSlideshow.jsx';
import { LIVE_CREATORS } from './data/creators.js';

export default function App() {
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [filteredCreators, setFilteredCreators] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [creators, setCreators] = useState(LIVE_CREATORS);

  useEffect(() => {
    const hasVisited = localStorage.getItem('runway_has_visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('runway_has_visited', 'true');
    }
  }, []);

  const handleSearchResults = (results) => {
    setFilteredCreators(results);
  };

  const handleTileClick = (creator) => {
    setSelectedCreator(creator);
  };

  const handleClosePlayer = () => {
    setSelectedCreator(null);
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleInfoClick = () => {
    setShowWelcome(true);
  };

  const creatorsToDisplay = filteredCreators || creators;

  const getAdjacentVideos = (index) => {
    const adjacentIndices = [
      index - 1,
      index + 1,
      index - 3,
      index + 3
    ].filter(i => i >= 0 && i < creatorsToDisplay.length);

    return adjacentIndices
      .map(i => {
        const creator = creatorsToDisplay[i];
        if (creator?.status === 'offline' && creator?.offlineVideo) {
          return creator.offlineVideo;
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <InfoButton onClick={handleInfoClick} />
      <ApplyButton />

      <header className="relative py-24 px-8 md:px-12 overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <FashionSlideshow />
        </div>
        
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white/80 via-warm-white/60 to-warm-white z-10" />
        
        {/* Content */}
        <div className="max-w-[1200px] mx-auto relative z-20">
          <h1 className="text-6xl md:text-7xl font-black text-almost-black tracking-tight mb-2"
              style={{
                fontFamily: "'Fredoka One', 'Righteous', 'Arial Black', sans-serif",
                textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
                letterSpacing: '0.05em'
              }}>
            RUNWAY
          </h1>
          <p className="text-almost-black font-medium text-sm md:text-base">
            Live fashion. No Algorithm.
          </p>
        </div>
      </header>

      <main className="px-8 md:px-12 pb-40">
        {filteredCreators && (
          <div className="max-w-[1200px] mx-auto mb-6">
            <p className="text-medium-gray text-sm">
              Showing {filteredCreators.length} {filteredCreators.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        )}

        <div className="
          max-w-[1200px] mx-auto
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-10 md:gap-12
        ">
          {creatorsToDisplay.map((creator, index) => (
            <CreatorTile
              key={creator.id}
              creator={creator}
              onClick={handleTileClick}
              adjacentVideos={getAdjacentVideos(index)}
            />
          ))}
        </div>

        {creatorsToDisplay.length === 0 && (
          <div className="text-center py-20">
            <p className="text-medium-gray font-light">
              No creators found
            </p>
          </div>
        )}
      </main>

      <AISearchBar 
        creators={creators}
        onResultsFound={handleSearchResults}
      />

      <WelcomeModal 
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
      />

      {selectedCreator && (
        <FullScreenPlayer 
          creator={selectedCreator} 
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
}
