export const fetchTrack = id => {
  return $.ajax({
    method: 'GET',
    url: `api/tracks/${id}`
  });
};

export const createTrack = track => {
  return $.ajax({
    method: 'POST',
    url: `api/tracks`,
    contentType: false,
    processData: false,
    data: track
  });
};

export const deleteTrack = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/tracks/${id}`
  });
};

export const fetchTracks = filter => {
  return $.ajax({
    method: 'GET',
    url: 'api/tracks',
    data: {filter}
  });
};
