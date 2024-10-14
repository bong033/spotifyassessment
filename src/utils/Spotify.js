let accessToken = "";
const clientID = "d7e254d8f59b4764b19848194eb5cb12";
const redirectUrl = "http://localhost:3000";
// const redirectUrl = "https://your_spotify_app.surge.sh";

// const Spotify stores function objects
const Spotify = {
  getAccessToken() {    // getAccessToken Function Object creates the accessToken if not found
    // First check for the access token
    if (accessToken) return accessToken;

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    // Second check for the access token
    if (tokenInURL && expiryTime) {
      // setting access token and expiry time variables
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      console.log("AccessToken: " + accessToken, "Expiry: " + expiresIn);

      // Setting the access token to expire at the value for expiration time
      // clear accessToken after expiry
      // If expires_in = 3600 (1 hour), accessToken'll be cleared after 1 hour (3600 * 1000 ms = 3,600,000 ms or 1 hour).
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }else{
      // Third check for the access token if the first and second check are both false
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
      window.location = redirect;
    }
  },

  async search(term) {    // search Function Object takes in a term to search for
    accessToken = Spotify.getAccessToken();
    return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonresponse) => {
        if (!jsonresponse) {
          console.error("Response error");
        }
        return jsonresponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },

  savePlaylist(name, trackUris) {   // savePlayList takes in the name and the Url of the track to save
  
  },

};

export { Spotify };