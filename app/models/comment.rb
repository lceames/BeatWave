# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  track_id     :integer          not null
#  user_id      :integer          not null
#  body         :string           not null
#  elapsed_time :integer          not null
#

class Comment < ApplicationRecord
  validates :body, :user_id, :track_id, :elapsed_time, presence: true
  belongs_to :user
  belongs_to :track
end
