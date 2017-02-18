json.title @track.title
json.id @track.id
json.user_id @track.user_id
json.description @track.description
json.url asset_path(@track.audio.url)
json.image asset_path(@track.image.url)
