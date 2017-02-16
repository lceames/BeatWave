class Track < ApplicationRecord
  validates :title, :user_id, presence: true
  belongs_to :user

  has_attached_file :audio, default_url: "/audio/life.mp3"
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/

end
