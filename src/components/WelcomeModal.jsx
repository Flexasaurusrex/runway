import React from 'react';

export default function WelcomeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-warm-white rounded-2xl w-full max-w-2xl my-auto shadow-2xl max-h-[95vh] overflow-y-auto">
        <div className="p-6 sm:p-8 md:p-12">
          {/* Logo */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-almost-black tracking-tight mb-3 sm:mb-4"
              style={{
                fontFamily: "'Fredoka One', 'Righteous', 'Arial Black', sans-serif",
                textShadow: '3px 3px 0px rgba(0,0,0,0.1)',
                letterSpacing: '0.05em'
              }}>
            RUNWAY
          </h2>
          
          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-almost-black font-light mb-6 sm:mb-8">
            Live fashion. No Algorithm.
          </p>

          {/* Content */}
          <div className="space-y-4 sm:space-y-6 text-medium-gray font-light leading-relaxed text-sm sm:text-base">
            <p>
              Welcome to Runway, where discovering live fashion feels human again.
            </p>
            
            <p>
              We built Runway because fashion is meant to be experienced live - the fit checks, 
              the draping process, the creative decisions happening in real-time. Watching someone 
              style an outfit or construct a garment live is where the magic actually happens.
            </p>

            <div className="bg-white/50 rounded-xl p-4 sm:p-6 my-4 sm:my-6">
              <h3 className="text-almost-black font-medium mb-2 sm:mb-3 text-sm sm:text-base">👗 The AI Style Sommelier</h3>
              <p className="text-sm sm:text-base">
                Instead of an algorithm, we built an AI style sommelier. Describe what you want to see - 
                "90s streetwear fit checks," "sustainable fashion design," "sneaker customization" - and 
                discover creators streaming their fashion content right now.
              </p>
            </div>

            <p>
              Live fashion is inherently anti-algorithm. No editing, no filters after the fact, 
              just pure style and creativity unfolding in real-time.
            </p>

            <p className="text-sm pt-4 border-t border-light-gray/30">
              <strong className="text-almost-black">How to use:</strong> Click the search bar at the 
              bottom and describe what you're looking for. Click any stream to watch. That's it.
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-6 sm:mt-8 w-full py-3 sm:py-4 bg-almost-black text-warm-white rounded-xl font-medium 
                     hover:bg-almost-black/90 transition-colors text-sm sm:text-base"
          >
            Start Discovering
          </button>
        </div>
      </div>
    </div>
  );
}
