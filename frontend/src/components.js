import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, MoreHorizontal, Clock, Heart, Plus, Music } from 'lucide-react';
import YouTube from 'react-youtube';

// Main Content Component
export const MainContent = ({ 
  currentView, 
  playlists, 
  searchResults, 
  searchQuery, 
  setSearchQuery, 
  searchMusic, 
  playTrack,
  selectedPlaylist,
  setSelectedPlaylist 
}) => {
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage playlists={playlists} playTrack={playTrack} setSelectedPlaylist={setSelectedPlaylist} />;
      case 'search':
        return <SearchPage 
          searchResults={searchResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchMusic={searchMusic}
          playTrack={playTrack}
        />;
      case 'library':
        return <LibraryPage playTrack={playTrack} />;
      case 'liked':
        return <LikedSongsPage playTrack={playTrack} />;
      default:
        return <HomePage playlists={playlists} playTrack={playTrack} setSelectedPlaylist={setSelectedPlaylist} />;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      {renderContent()}
    </div>
  );
};

// Home Page Component
const HomePage = ({ playlists, playTrack, setSelectedPlaylist }) => {
  const recentlyPlayed = [
    { id: '1', title: 'Daily Mix 1', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742' },
    { id: '2', title: 'Discover Weekly', image: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89' },
    { id: '3', title: 'Liked Songs', image: 'https://images.unsplash.com/photo-1594237482284-66c47aa6cbc2' },
    { id: '4', title: 'Rock Classics', image: 'https://images.unsplash.com/photo-1444623151656-030273ddb785' },
    { id: '5', title: 'Jazz Vibes', image: 'https://images.unsplash.com/photo-1547927168-17021e7ef8c3' },
    { id: '6', title: 'Electronic Beats', image: 'https://images.pexels.com/photos/8108531/pexels-photo-8108531.jpeg' }
  ];

  const categories = [
    { name: 'Pop', image: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241', color: 'bg-pink-500' },
    { name: 'Rock', image: 'https://images.unsplash.com/photo-1444623151656-030273ddb785', color: 'bg-red-500' },
    { name: 'Hip-Hop', image: 'https://images.pexels.com/photos/8108531/pexels-photo-8108531.jpeg', color: 'bg-purple-500' },
    { name: 'Jazz', image: 'https://images.unsplash.com/photo-1547927168-17021e7ef8c3', color: 'bg-blue-500' },
    { name: 'Classical', image: 'https://images.unsplash.com/photo-1519479029449-38c9aed0f322', color: 'bg-green-500' },
    { name: 'Electronic', image: 'https://images.unsplash.com/photo-1485192686578-0a70d91accd6', color: 'bg-yellow-500' }
  ];

  // Sample songs for quick play testing
  const quickPlaySongs = [
    { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', artist: 'Rick Astley', thumbnail: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241', duration: '3:33' },
    { id: 'kJQP7kiw5Fk', title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee', thumbnail: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89', duration: '3:47' },
    { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', artist: 'Queen', thumbnail: 'https://images.unsplash.com/photo-1444623151656-030273ddb785', duration: '5:55' },
    { id: 'hT_nvWreIhg', title: 'Shape of You', artist: 'Ed Sheeran', thumbnail: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742', duration: '3:53' },
    { id: '9bZkp7q19f0', title: 'Gangnam Style', artist: 'PSY', thumbnail: 'https://images.pexels.com/photos/8108531/pexels-photo-8108531.jpeg', duration: '3:39' },
    { id: 'YQHsXMglC9A', title: 'Hello', artist: 'Adele', thumbnail: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf', duration: '4:55' }
  ];

  const handleRecentlyPlayedClick = (item, index) => {
    // Play a sample song when clicking on recently played items
    const song = quickPlaySongs[index % quickPlaySongs.length];
    console.log('Playing from recently played:', song);
    playTrack(song);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Good evening</h1>
      </div>

      {/* Recently Played */}
      <section className="mb-8">
        <div className="grid grid-cols-3 gap-4">
          {recentlyPlayed.map((item, index) => (
            <div 
              key={item.id}
              className="bg-gray-800 bg-opacity-50 rounded-md flex items-center hover:bg-gray-700 cursor-pointer group transition-all duration-300"
              onClick={() => handleRecentlyPlayedClick(item, index)}
            >
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded-l-md object-cover" />
              <span className="px-4 font-medium text-sm">{item.title}</span>
              <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 text-black ml-0.5" fill="black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Made for You</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {playlists.slice(0, 6).map((playlist, index) => (
            <PlaylistCard 
              key={playlist.id}
              playlist={playlist}
              onClick={() => {
                console.log('Clicked playlist:', playlist);
                setSelectedPlaylist(playlist);
                // Also play a sample song immediately
                const song = quickPlaySongs[index % quickPlaySongs.length];
                playTrack(song);
              }}
            />
          ))}
        </div>
      </section>

      {/* Recently Played Artists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recently played</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {playlists.slice(6, 12).map((playlist, index) => (
            <PlaylistCard 
              key={playlist.id}
              playlist={playlist}
              onClick={() => {
                console.log('Clicked recently played:', playlist);
                setSelectedPlaylist(playlist);
                // Play a different song for recently played
                const song = quickPlaySongs[(index + 3) % quickPlaySongs.length];
                playTrack(song);
              }}
            />
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Browse all</h2>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              className={`${category.color} rounded-lg p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
              style={{ aspectRatio: '1' }}
              onClick={() => {
                console.log('Clicked category:', category.name);
                // Play a song based on category
                const song = quickPlaySongs[index % quickPlaySongs.length];
                playTrack(song);
              }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <img 
                src={category.image} 
                alt={category.name}
                className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded transform rotate-12 translate-x-2 translate-y-2"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Search Page Component
const SearchPage = ({ searchResults, searchQuery, setSearchQuery, searchMusic, playTrack }) => {
  const browseCategories = [
    { name: 'Podcasts', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1485192686578-0a70d91accd6' },
    { name: 'Made For You', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742' },
    { name: 'New releases', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241' },
    { name: 'Pop', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89' },
    { name: 'Hip-Hop', color: 'bg-purple-500', image: 'https://images.pexels.com/photos/8108531/pexels-photo-8108531.jpeg' },
    { name: 'Rock', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1444623151656-030273ddb785' },
    { name: 'Latin', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1547927168-17021e7ef8c3' },
    { name: 'Charts', color: 'bg-indigo-500', image: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf' }
  ];

  const handleCategoryClick = async (categoryName) => {
    setSearchQuery(categoryName.toLowerCase());
    await searchMusic(categoryName.toLowerCase());
  };

  return (
    <div className="p-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchMusic(e.target.value);
            }}
            className="w-full bg-white text-black px-12 py-3 rounded-full text-sm placeholder-gray-500"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <div className="space-y-2">
            {searchResults.map((track, index) => (
              <div 
                key={track.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800 cursor-pointer group"
                onClick={() => {
                  console.log('Playing track:', track);
                  playTrack(track);
                }}
              >
                <span className="text-gray-400 w-6 text-sm group-hover:hidden">{index + 1}</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play className="w-3 h-3 text-black ml-0.5" fill="black" />
                </div>
                <img src={track.thumbnail} alt={track.title} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-white truncate font-medium">{track.title}</p>
                  <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                </div>
                <span className="text-gray-400 text-sm">{track.duration}</span>
                <div className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Browse Categories */
        <section>
          <h2 className="text-2xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-4 gap-4">
            {browseCategories.map(category => (
              <div 
                key={category.name}
                className={`${category.color} rounded-lg p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform h-32`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute bottom-0 right-0 w-16 h-16 object-cover rounded transform rotate-12 translate-x-2 translate-y-2"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Library Page Component
const LibraryPage = ({ playTrack }) => {
  const libraryItems = [
    { id: '1', name: 'Liked Songs', type: 'Playlist', image: 'https://images.unsplash.com/photo-1594237482284-66c47aa6cbc2', songs: 342 },
    { id: '2', name: 'Daily Mix 1', type: 'Made for you', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742', songs: 50 },
    { id: '3', name: 'Discover Weekly', type: 'Made for you', image: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89', songs: 30 },
    { id: '4', name: 'Rock Classics', type: 'Playlist', image: 'https://images.unsplash.com/photo-1444623151656-030273ddb785', songs: 75 }
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Library</h1>
        <Plus className="w-6 h-6 cursor-pointer hover:text-gray-300" />
      </div>

      <div className="space-y-2">
        {libraryItems.map(item => (
          <div 
            key={item.id}
            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
            <div className="flex-1">
              <p className="text-white font-medium">{item.name}</p>
              <p className="text-gray-400 text-sm">{item.type} • {item.songs} songs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Liked Songs Page Component
const LikedSongsPage = ({ playTrack }) => {
  const likedSongs = [
    { 
      id: 'dQw4w9WgXcQ', 
      title: 'Never Gonna Give You Up', 
      artist: 'Rick Astley', 
      album: 'Whenever You Need Somebody', 
      duration: '3:33', 
      image: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241',
      thumbnail: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241'
    },
    { 
      id: 'kJQP7kiw5Fk', 
      title: 'Despacito', 
      artist: 'Luis Fonsi ft. Daddy Yankee', 
      album: 'Vida', 
      duration: '3:47', 
      image: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89',
      thumbnail: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89'
    },
    { 
      id: 'fJ9rUzIMcZQ', 
      title: 'Bohemian Rhapsody', 
      artist: 'Queen', 
      album: 'A Night at the Opera', 
      duration: '5:55', 
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742',
      thumbnail: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742'
    },
    { 
      id: 'hT_nvWreIhg', 
      title: 'Shape of You', 
      artist: 'Ed Sheeran', 
      album: '÷ (Divide)', 
      duration: '3:53', 
      image: 'https://images.unsplash.com/photo-1444623151656-030273ddb785',
      thumbnail: 'https://images.unsplash.com/photo-1444623151656-030273ddb785'
    },
    { 
      id: '9bZkp7q19f0', 
      title: 'Gangnam Style', 
      artist: 'PSY', 
      album: 'Psy 6 (Six Rules), Part 1', 
      duration: '3:39', 
      image: 'https://images.pexels.com/photos/8108531/pexels-photo-8108531.jpeg',
      thumbnail: 'https://images.pexels.com/photos/8108531/pexels-photo-8108531.jpeg'
    },
    { 
      id: 'YQHsXMglC9A', 
      title: 'Hello', 
      artist: 'Adele', 
      album: '25', 
      duration: '4:55', 
      image: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf',
      thumbnail: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf'
    }
  ];

  const handlePlayAllClick = () => {
    if (likedSongs.length > 0) {
      console.log('Playing all liked songs, starting with:', likedSongs[0]);
      playTrack(likedSongs[0]);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-end space-x-6 mb-8">
        <div className="w-64 h-64 bg-gradient-to-br from-purple-700 to-blue-300 rounded shadow-2xl flex items-center justify-center">
          <Heart className="w-24 h-24 text-white" fill="white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white mb-2">PLAYLIST</p>
          <h1 className="text-6xl font-bold text-white mb-6">Liked Songs</h1>
          <p className="text-gray-300">{likedSongs.length} songs</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-8 mb-8">
        <div 
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={handlePlayAllClick}
        >
          <Play className="w-6 h-6 text-black ml-1" fill="black" />
        </div>
        <Heart className="w-8 h-8 text-green-500 cursor-pointer" fill="currentColor" />
        <MoreHorizontal className="w-8 h-8 text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>

      {/* Song List Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-800 text-gray-400 text-sm">
        <div className="col-span-1">#</div>
        <div className="col-span-5">TITLE</div>
        <div className="col-span-3">ALBUM</div>
        <div className="col-span-2">DATE ADDED</div>
        <div className="col-span-1 flex justify-center">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Song List */}
      <div className="mt-4">
        {likedSongs.map((song, index) => (
          <div 
            key={song.id}
            className="grid grid-cols-12 gap-4 px-4 py-2 rounded hover:bg-gray-800 cursor-pointer group transition-all duration-200"
            onClick={() => {
              console.log('Playing liked song:', song);
              playTrack(song);
            }}
          >
            <div className="col-span-1 flex items-center">
              <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center hidden group-hover:flex">
                <Play className="w-2.5 h-2.5 text-black ml-0.5" fill="black" />
              </div>
            </div>
            <div className="col-span-5 flex items-center space-x-3">
              <img src={song.image} alt={song.title} className="w-10 h-10 rounded object-cover" />
              <div>
                <p className="text-white font-medium group-hover:text-green-500 transition-colors">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
            <div className="col-span-3 flex items-center">
              <span className="text-gray-400 text-sm">{song.album}</span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 7) + 1} days ago</span>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <span className="text-gray-400 text-sm">{song.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Play Section */}
      <div className="mt-8 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
        <h3 className="text-white font-semibold mb-2">🎵 Quick Play</h3>
        <p className="text-gray-400 text-sm">
          Click on any song above to start playing real music from YouTube! 
          The player controls are fully functional with play/pause, volume, and progress tracking.
        </p>
      </div>
    </div>
  );
};

// Playlist Card Component
const PlaylistCard = ({ playlist, onClick }) => {
  return (
    <div 
      className="bg-gray-900 bg-opacity-50 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-all duration-300 group"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <img 
          src={playlist.thumbnail} 
          alt={playlist.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
          <Play className="w-5 h-5 text-black ml-0.5" fill="black" />
        </div>
      </div>
      <h3 className="text-white font-medium mb-1 truncate">{playlist.title}</h3>
      <p className="text-gray-400 text-sm truncate">{playlist.description || playlist.channelTitle}</p>
    </div>
  );
};

// Bottom Player Component
export const BottomPlayer = ({ 
  currentTrack, 
  isPlaying, 
  togglePlayPause, 
  youtubePlayer, 
  setYoutubePlayer, 
  setIsPlaying 
}) => {
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onReady = (event) => {
    console.log('YouTube player ready:', event.target);
    setYoutubePlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event) => {
    console.log('Player state changed:', event.data);
    if (event.data === 1) { // Playing
      setIsPlaying(true);
    } else if (event.data === 2) { // Paused
      setIsPlaying(false);
    } else if (event.data === 0) { // Ended
      setIsPlaying(false);
    }
  };

  const onError = (event) => {
    console.error('YouTube player error:', event.data);
    setIsPlaying(false);
  };

  // Update current time periodically
  React.useEffect(() => {
    let interval;
    if (isPlaying && youtubePlayer) {
      interval = setInterval(() => {
        if (youtubePlayer.getCurrentTime) {
          setCurrentTime(youtubePlayer.getCurrentTime());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, youtubePlayer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (youtubePlayer && youtubePlayer.setVolume) {
      youtubePlayer.setVolume(newVolume);
    }
  };

  const handleProgressClick = (e) => {
    if (youtubePlayer && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      youtubePlayer.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center space-x-3 flex-1">
          {currentTrack ? (
            <>
              <img 
                src={currentTrack.thumbnail} 
                alt={currentTrack.title}
                className="w-14 h-14 rounded object-cover"
              />
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{currentTrack.title}</p>
                <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
              </div>
              <Heart className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
            </>
          ) : (
            <div className="w-14 h-14 bg-gray-800 rounded flex items-center justify-center">
              <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex items-center space-x-4">
            <Shuffle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <SkipBack className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <button 
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              onClick={togglePlayPause}
              disabled={!currentTrack}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black" fill="black" />
              ) : (
                <Play className="w-4 h-4 text-black ml-0.5" fill="black" />
              )}
            </button>
            <SkipForward className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Repeat className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div 
              className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="bg-white h-1 rounded-full transition-all duration-100 relative group"
                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <div className="w-24 bg-gray-600 rounded-full h-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="bg-white h-1 rounded-full transition-all duration-100"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hidden YouTube Player */}
      {currentTrack && (
        <div className="hidden">
          <YouTube
            videoId={currentTrack.id}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            onError={onError}
          />
        </div>
      )}

      {/* Playing Now Indicator */}
      {currentTrack && (
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            {isPlaying ? 'Now Playing' : 'Paused'} • YouTube Music
          </p>
        </div>
      )}
    </div>
  );
};