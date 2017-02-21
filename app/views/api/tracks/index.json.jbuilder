json.array! @tracks do |track|
  json.id track.id
  json.author track.user.username
  json.title track.title
  json.description track.description
  json.url track.audio.url
  json.image track.image.url
  json.user_id track.user_id
  json.comments track.comments do |comment|
    json.thumb comment.user.image.url
    json.comment comment
  end
end
