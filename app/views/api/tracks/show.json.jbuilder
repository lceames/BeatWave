json.title @track.title
json.id @track.id
json.user_id @track.user_id
json.description @track.description
json.track_url asset_path(@track.audio.url)
