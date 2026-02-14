import React, { useMemo } from 'react';

export default function CreatorTile({ creator, onClick, adjacentVideos = [] }) {
  const getThumbnailSrc = () => {
    if (creator.customThumbnail) {
      return creator.customThumbnail;
    }
    if (creator.videoId) {
      return `https://img.youtube.com/vi/${creator.videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  const thumbnailSrc = getThumbnailSrc();

  const offlineVideo = useMemo(() => {
    const videos = [
      'betweensessions.mp4',
      'betweensessions2.mp4',
      'betweensessions3.mp4',
      'betweensessions4.mp4',
      'betweensessions5.mp4'
    ];

    const availableVideos = videos.filter(v => !adjacentVideos.includes(v));
    const pool = availableVideos.length > 0 ? availableVideos : videos;
    
    return pool[Math.floor(Math.random() * pool.length)];
  }, [adjacentVideos, creator.id]);

  return (
    <div
      onClick={() => onClick(creator)}
      className="
        bg-pure-white rounded-lg overflow-hidden
        shadow-museum hover:shadow-museum-hover
        transition-all duration-150 ease-out
        hover:-translate-y-1
        cursor-pointer
        flex flex-col
      "
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {creator.status === 'live' && thumbnailSrc ? (
          <>
            <img 
              src={thumbnailSrc}
              alt={creator.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (creator.videoId && !creator.customThumbnail) {
                  e.target.src = `https://img.youtube.com/vi/${creator.videoId}/hqdefault.jpg`;
                }
              }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <svg className="w-8 h-8 text-almost-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={`/${offlineVideo}`} type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/80 text-lg font-light tracking-wide">
                between shows
              </span>
            </div>
          </>
        )}
        
        {creator.status === 'live' && (
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium uppercase tracking-wide bg-black/70 px-2 py-1 rounded backdrop
