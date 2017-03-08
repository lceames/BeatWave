
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
  # before_validation :audio_file=
  serialize :peaks
  # after_create :get_peaks_after

  # def get_peaks_after
  #   debugger
  #   file = open(self.audio.url)
  #
  #   waveform = JsonWaveform.generate(file, sample: 1000)
  # end
  #
  # def audio_contents()
  #   open(self.upload.queued_for_write.url)
  # end
  #
  # def get_peaks
  #   debugger
  #   peaks = Dir.chdir('app/models/wav2json/build'){
  #     (`wav2json #{self.audio.url} --channels left -o -`)
  #   }
  #   self.peaks = peaks["left"]
  # end

  has_attached_file :audio, default_url: "life.mp3", s3_protocol: :https
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/

  has_attached_file :image, default_url: "record.png", s3_protocol: :https
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def audio_file=(file)
    if file.class == String  #AWS url seed
      if (!file.include?(".wav"))
        temp_dir = Dir.mktmpdir
        `ffmpeg -i #{file} #{temp_dir}/local.wav`
        self.peaks = JsonWaveform.generate(File.open("#{temp_dir}/local.wav"))
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
        self.peaks = JsonWaveform.generate(open("#{temp_dir}/local.wav"))
      else
        self.peaks = JsonWaveform.generate(open(file.tempfile))
      end
      self.audio = file
    end
  end
end
