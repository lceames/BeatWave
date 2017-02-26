# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  email              :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class User < ApplicationRecord

  attr_reader :password
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }
  after_initialize :ensure_session_token

  has_many :tweets

  has_attached_file :image, default_url: "record.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def self.random_token
    SecureRandom.urlsafe_base64
  end

  def is_password?(password)
    password_digest.is_password?(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
    password
  end

  def reset_session_token!
    update(session_token: User.random_token)
    session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.random_token
  end

end
