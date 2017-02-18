json.array! @tracks do |track|
  json.id track.id
  json.user_id track.user_id
  json.title track.title
  json.description track.description
  json.url track.audio.url
  json.image track.image.url
end
