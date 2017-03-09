json.title track.title
json.id track.id
json.author track.user.username
json.description track.description
json.url track.audio.url
json.image asset_path(track.image.url)
json.user_id track.user_id
json.elapsedTime 0
json.duration track.duration
json.active false
json.peaks track.peaks
json.comments track.comments do |comment|
  json.thumb asset_path(comment.user.image.url)
  json.body comment.body
  json.author comment.user.username
  json.id comment.id
  json.elapsedTime comment.elapsed_time
end
