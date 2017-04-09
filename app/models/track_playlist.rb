class TrackPlaylist < ApplicationRecord
  validates :playlist_id, :track_id, presence: true

  belongs_to :track
  belongs_to :playlist
end
