import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {

  // state management (useState hooks)
  const [searchResults, setSearchResults] = useState([]);

  // sideEffect hook (document load) - called useEffect hook
  useEffect(() => {
    // populate searchResults with defaultValues
   

  }, [])  // The blank bracket refers to running this hook only once
  
  

  function search(term) {
   Spotify.search(term).then((response) => {
    console.log(response);
   });
  }
  
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch = {search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults />
          {/* <!-- Add a Playlist component --> */}
          <Playlist/>
        </div>
      </div>
    </div>
  );
}

export default App;
