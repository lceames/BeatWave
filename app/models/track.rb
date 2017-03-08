
# == Schema Information
#
# Table name: tracks
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  user_id            :integer          not null
#  description        :text
#  audio_file_name    :string
#  audio_content_type :string
#  audio_file_size    :integer
#  audio_updated_at   :datetime
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  peaks              :text
#

class Track < ApplicationRecord
  validates :title, :user_id, presence: true
  belongs_to :user
  has_many :comments
  serialize :peaks

  has_attached_file :audio, default_url: "life.mp3", s3_protocol: :https
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/

  has_attached_file :image, default_url: "record.png", s3_protocol: :https
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def audio_file=(file)
    if file.class == String  #AWS url seed
      if (!file.include?(".wav"))
        temp_dir = Dir.mktmpdir
        `ffmpeg -i #{file} #{temp_dir}/local.wav`
        self.peaks = JsonWaveform.generate(File.open("#{temp_dir}/local.wav"), samples: 1000)
        duration = `ffprobe -i #{temp_dir}/local.wav -show_entries format=duration -v quiet -of csv="p=0"`
        self.duration = duration.to_i
        self.audio = file
      else
        self.peaks = JsonWaveform.generate(open(file))
        self.audio = file
      end
    else #upload from live site
      if !file.content_type.include?('wav')
        file = file.tempfile
        temp_dir = Dir.mktmpdir
        `ffmpeg -i #{file.path} #{temp_dir}/local.wav`
        duration = `ffprobe -i #{temp_dir}/local.wav -show_entries format=duration -v quiet -of csv="p=0"`
        self.duration = duration.to_i
        self.peaks = JsonWaveform.generate(open("#{temp_dir}/local.wav"), samples: 1000)
      else
        self.peaks = JsonWaveform.generate(open(file.tempfile))
      end
      self.audio = file
    end
  end
end
