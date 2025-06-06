import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Search, Library, CreatePlaylist, Home as HomeIcon, Music, Plus, Heart, Clock, MoreHorizontal, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { MainContent, BottomPlayer } from './components';

// YouTube API Configuration
const YOUTUBE_API_KEY = 'AIzaSyDi8P4rR0bhUoAhY5jh-zFnIUyBVTPgzEM';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Spotify-style components
const SpotifyApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(null);

  // Mock user playlists
  const userPlaylists = [
    { id: 'liked', name: 'Liked Songs', image: 'https://images.unsplash.com/photo-1594237482284-66c47aa6cbc2', songs: 342 },
    { id: 'recent', name: 'Recently Played', image: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241', songs: 50 },
    { id: 'discover', name: 'Discover Weekly', image: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89', songs: 30 },
    { id: 'daily1', name: 'Daily Mix 1', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742', songs: 50 },
    { id: 'daily2', name: 'Daily Mix 2', image: 'https://images.unsplash.com/photo-1485192686578-0a70d91accd6', songs: 50 }
  ];

  // Fetch popular music playlists from YouTube
  useEffect(() => {
    fetchTrendingMusic();
  }, []);

  const fetchTrendingMusic = async () => {
    try {
      const queries = ['top hits 2024', 'pop music playlist', 'trending songs', 'best music 2024', 'latest hits'];
      const allPlaylists = [];

      for (const query of queries) {
        const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
          params: {
            part: 'snippet',
            q: query,
            type: 'playlist',
            maxResults: 8,
            key: YOUTUBE_API_KEY
          }
        });

        const playlistData = response.data.items.map(item => ({
          id: item.id.playlistId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
          channelTitle: item.snippet.channelTitle
        }));

        allPlaylists.push(...playlistData);
      }

      setPlaylists(allPlaylists);
    } catch (error) {
      console.error('Error fetching YouTube playlists:', error);
      // Fallback to mock data if API fails
      setPlaylists([
        { id: 'mock1', title: 'Top Hits 2024', description: 'The biggest songs right now', thumbnail: 'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241', channelTitle: 'Spotify' },
        { id: 'mock2', title: 'Pop Rising', description: 'New pop music on the rise', thumbnail: 'https://images.unsplash.com/photo-1590310051055-1079d8f48c89', channelTitle: 'Spotify' },
        { id: 'mock3', title: 'Viral Hits', description: 'Songs trending everywhere', thumbnail: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742', channelTitle: 'Spotify' }
      ]);
    }
  };

  const searchMusic = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
        params: {
          part: 'snippet',
          q: `${query} music`,
          type: 'video',
          videoCategoryId: '10', // Music category
          maxResults: 20,
          key: YOUTUBE_API_KEY
        }
      });

      const videos = response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
        duration: '3:45' // YouTube API v3 doesn't include duration in search, would need additional call
      }));

      setSearchResults(videos);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      setSearchResults([]);
    }
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (youtubePlayer) {
      if (isPlaying) {
        youtubePlayer.pauseVideo();
      } else {
        youtubePlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} userPlaylists={userPlaylists} />
        
        {/* Main Content */}
        <MainContent 
          currentView={currentView} 
          playlists={playlists}
          searchResults={searchResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchMusic={searchMusic}
          playTrack={playTrack}
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
        />
      </div>

      {/* Bottom Player */}
      <BottomPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        youtubePlayer={youtubePlayer}
        setYoutubePlayer={setYoutubePlayer}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ currentView, setCurrentView, userPlaylists }) => {
  return (
    <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-green-500" />
          <span className="text-xl font-bold">Spotify</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3">
        <div className="space-y-2">
          <NavItem 
            icon={HomeIcon} 
            label="Home" 
            active={currentView === 'home'}
            onClick={() => setCurrentView('home')}
          />
          <NavItem 
            icon={Search} 
            label="Search" 
            active={currentView === 'search'}
            onClick={() => setCurrentView('search')}
          />
          <NavItem 
            icon={Library} 
            label="Your Library" 
            active={currentView === 'library'}
            onClick={() => setCurrentView('library')}
          />
        </div>

        <div className="mt-6 mb-2">
          <div className="space-y-2">
            <NavItem 
              icon={Plus} 
              label="Create Playlist" 
              onClick={() => setCurrentView('create')}
            />
            <NavItem 
              icon={Heart} 
              label="Liked Songs" 
              onClick={() => setCurrentView('liked')}
            />
          </div>
        </div>
      </nav>

      {/* User Playlists */}
      <div className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-1">
          {userPlaylists.map(playlist => (
            <div 
              key={playlist.id}
              className="text-gray-300 hover:text-white cursor-pointer py-1 px-3 rounded text-sm truncate"
            >
              {playlist.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon: Icon, label, active, onClick }) => {
  return (
    <div 
      className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer ${
        active ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white'
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<SpotifyApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;