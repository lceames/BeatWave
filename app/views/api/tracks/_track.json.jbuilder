json.title track.title
json.id track.id
json.author track.user.username
json.authorImage track.user.image
json.description track.description
json.url track.audio.url
json.image asset_path(track.image.url)
json.userId track.user_id
json.elapsedTime 0
json.duration track.duration
json.active false
json.peaks track.peaks
json.comments track.comments.sort_by { |comment| comment.elapsed_time } do |comment|
  json.thumb asset_path(comment.user.image.url)
  json.body comment.body
  json.author comment.user.username
  json.id comment.id
  json.elapsedTime comment.elapsed_time
  json.duration comment.track.duration
end
