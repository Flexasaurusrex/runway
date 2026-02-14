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
    <>
      {/* BACKGROUND SLIDESHOW - LOWEST LAYER */}
      <FashionSlideshow />

      {/* ALL CONTENT */}
      <div className="min-h-screen relative z-10">
        <InfoButton onClick={handleInfoClick} />
        <ApplyButton />

        {/* LOGO WITH SEMI-TRANSPARENT WHITE BOX */}
        <header className="py-12 px-8 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white/40 backdrop-blur-md px-8 py-6 rounded-2xl inline-block">
              <h1 className="text-6xl md:text-7xl font-black text-almost-black tracking-tight mb-2"
                  style={{
                    fontFamily: "'Fredoka One', 'Righteous', 'Arial Black', sans-serif",
                    letterSpacing: '0.05em'
                  }}>
                RUNWAY
              </h1>
              <p className="text-almost-black font-medium text-sm md:text-base">
                Live fashion. No Algorithm.
              </p>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
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
    </>
  );
}
