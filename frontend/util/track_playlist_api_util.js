export const createTrackPlaylist = trackPlaylist => {
  return $.ajax({
    method: 'POST',
    url: `api/playlists`,
    contentType: false,
    processData: false,
    data: trackPlaylist
  });
};

export const deleteTrackPlaylist = trackPlaylistId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/playlists/${trackPlaylistId}`,
    contentType: false,
    processData: false
  });
};
