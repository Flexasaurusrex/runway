import React, { useState } from 'react';

export default function AISearchBar({ creators, onResultsFound }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResponse(null);

    try {
      const apiResponse = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          creators: creators
        })
      });

      if (!apiResponse.ok) {
        throw new Error(`API error: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response format from API');
      }
      
      const content = data.content[0].text;
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      const result = JSON.parse(cleanContent);
      
      const matchedCreators = result.matches
        .map(id => creators.find(c => c.id === id))
        .filter(Boolean);

      setResponse({
        creators: matchedCreators,
        explanation: result.explanation
      });

      onResultsFound(matchedCreators);

    } catch (error) {
      console.error('Search error:', error);
      setResponse({
        creators: [],
        explanation: "Sorry, I had trouble understanding that. Try asking about styles, techniques, or fashion categories you're looking for!"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResponse(null);
    onResultsFound(null);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[700px] px-5">
      <form onSubmit={handleSearch}>
        <div className="
          bg-pure-white rounded-full 
          shadow-museum
          flex items-center gap-3
          px-6 py-4
          transition-shadow duration-200
          focus-within:shadow-museum-hover
        ">
          <svg 
            className="w-5 h-5 text-medium-gray flex-shrink-0"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask for style... (e.g., '90s streetwear fit checks')"
            disabled={isSearching}
            className="
              flex-1 bg-transparent
              text-almost-black text-base font-light
              placeholder:text-light-gray
              outline-none
              disabled:opacity-50
            "
          />
          
          {(query || response) && !isSearching && (
            <button
              type="button"
              onClick={handleClear}
              className="text-light-gray hover:text-medium-gray transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {isSearching && (
            <div className="w-5 h-5 border-2 border-medium-gray border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </form>

      {response && (
        <div className="mt-4 bg-pure-white rounded-2xl shadow-museum p-6 max-h-[400px] overflow-y-auto">
          <p className="text-almost-black text-sm font-light mb-4 leading-relaxed">
            {response.explanation}
          </p>

          {response.creators.length > 0 ? (
            <div className="space-y-3">
              {response.creators.map(creator => (
                <div 
                  key={creator.id}
                  className="flex items-center gap-4 p-3 hover:bg-warm-white rounded-lg transition-colors cursor-pointer"
                  onClick={() => onResultsFound([creator])}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={`https://img.youtube.com/vi/${creator.videoId}/hqdefault.jpg`}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {creator.status === 'live' ? (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-light-gray uppercase tracking-wide">Live</span>
                          <span className="text-xs text-light-gray">• {creator.viewers} watching</span>
                        </>
                      ) : (
                        <span className="text-xs text-light-gray uppercase tracking-wide">Offline</span>
                      )}
                    </div>
                    <h4 className="text-base font-medium text-almost-black truncate mb-1">
                      {creator.name}
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {creator.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-medium-gray">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <svg className="w-8 h-8 text-medium-gray flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-medium-gray text-sm text-center py-4">
              No matches found. Try a different search!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
