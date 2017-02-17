json.array! @tracks do |track|
  json.user_id track.user_id
  json.title track.title
  json.description track.description
  json.url track.audio.url
end
