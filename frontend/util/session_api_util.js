export const login = (user) => {
  return $.ajax({
    method: 'POST',
    url: 'api/session',
    data: {user}
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/session'
  });
};

export const createUser = (user) => {
  return $.ajax({
    method: 'POST',
    url: 'api/users',
    contentType: false,
    processData: false,
    data: user
  });
};
