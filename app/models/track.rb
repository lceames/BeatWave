# == Schema Information
#
# Table name: tracks
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  user_id            :integer          not null
#  description        :text
#  audio_name    :string
#  audio_content_type :string
#  audio_size    :integer
#  audio_updated_at   :datetime
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  peaks              :text
#  duration           :integer
#

class Track < ApplicationRecord
  validates :title, :user_id, presence: true
  belongs_to :user
  has_many :comments
  serialize :peaks
  before_validation :extract_metadata

  has_attached_file :audio, s3_protocol: :https
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/

  has_attached_file :image, default_url: "record.png", s3_protocol: :https
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def extract_metadata
    path = audio.queued_for_write[:original] &&
           audio.queued_for_write[:original].path ||
           audio.url

    open(path) do |url_file|
      io_command = "php lib/assets/php-waveform-json.php #{url_file.path}"
      IO.popen(io_command) do |io|
        peaks = JSON.parse(io.read)['left']
        interval = peaks.length/200
        average_peaks = []
        sum = 0
        peaks.each_with_index do |peak, idx|
          if idx % interval === 0
            average_peaks.push(sum/interval)
            sum = 0
          else
            sum += peak
          end
        end
        self.peaks = average_peaks
      end

      open_opts = { :encoding => 'utf-8' }
      Mp3Info.open(url_file.path, open_opts) do |mp3info|
        self.duration = mp3info.length.to_i
      end
    end
  end
end
