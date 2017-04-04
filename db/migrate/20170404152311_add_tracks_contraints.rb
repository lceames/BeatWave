class AddTracksContraints < ActiveRecord::Migration[5.0]
  def change
    change_column :tracks, :audio_file_name, :string, null: false
    change_column :tracks, :audio_content_type, :string, null: false
    change_column :tracks, :audio_file_size, :integer, null: false
    change_column :tracks, :audio_updated_at, :datetime, null: false
  end
end
