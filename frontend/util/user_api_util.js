export const fetchUser = id => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  });
};

export const updateUserImage = (image, id) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/users/${id}`,
    contentType: false,
    processData: false,
    data: image
  });
};
