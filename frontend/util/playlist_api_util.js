export const createPlaylist = playlist => {
  return $.ajax({
    method: 'POST',
    url: `api/playlists`,
    contentType: false,
    processData: false,
    data: playlist
  });
};

export const deletePlaylist = playlistId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/playlists/${playlistId}`,
    contentType: false,
    processData: false,
    data: playlist
  });
};

export const fetchPlaylists = playlists => {
  return $.ajax({
    method: 'GET',
    url: `api/playlists`,
    contentType: false,
    processData: false
  });
};
