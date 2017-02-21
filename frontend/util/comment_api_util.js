export const createComment = comment => {
  return $.ajax({
    method: "POST",
    url: 'api/comments',
    data: { comment }
  });
};

export const fetchComments = track_id => {
  return $.ajax({
    method: "POST",
    url: 'api/comments',
    data: { track_id }
  });
};

export const deleteComment = comment_id => {
  return $.ajax({
    method: "POST",
    url: `api/comments/${comment_id}`
  });
};
