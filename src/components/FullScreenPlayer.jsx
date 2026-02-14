import React from 'react';

export default function FullScreenPlayer({ creator, onClose }) {
  if (!creator || !creator.videoId) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 
                 backdrop-blur-sm transition-colors flex items-center justify-center group"
      >
        <svg 
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Creator Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
        <h2 className="text-white text-2xl font-bold mb-2">{creator.name}</h2>
        <div className="flex gap-2 flex-wrap mb-2">
          {creator.tags.map(tag => (
            <span key={tag} className="text-white/80 text-sm">#{tag}</span>
          ))}
        </div>
        <p className="text-white/70 text-sm">{creator.bio}</p>
      </div>

      {/* YouTube Embed */}
      <iframe
        src={`https://www.youtube.com/embed/${creator.videoId}?autoplay=1&controls=1&modestbranding=1`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
