import React from 'react';

export default function InfoButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-8 right-8 w-10 h-10 rounded-full bg-almost-black/10 
               hover:bg-almost-black/20 transition-all flex items-center justify-center
               backdrop-blur-sm z-40 group"
      aria-label="About RUNWAY"
    >
      <span className="text-almost-black text-xl font-black group-hover:scale-110 transition-transform"
            style={{
              fontFamily: "'Fredoka One', 'Righteous', 'Arial Black', sans-serif",
            }}>
        ⓘ
      </span>
    </button>
  );
}
