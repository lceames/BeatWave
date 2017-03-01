class Track < ApplicationRecord
  validates :title, :user_id, presence: true
  belongs_to :user
  has_many :comments

  has_attached_file :audio, default_url: "life.mp3", s3_protocol: :https
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/

  has_attached_file :image, default_url: "record.png", s3_protocol: :https
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
