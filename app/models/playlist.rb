class Playlist < ApplicationRecord
  validates :title, :user_id, presence: true
  belongs_to :user
  has_many :track_playlists
  has_many :tracks, through: :track_playlists
end
