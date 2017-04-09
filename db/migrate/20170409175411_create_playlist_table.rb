class CreatePlaylistTable < ActiveRecord::Migration[5.0]
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.integer :user_id, null: false
    end
  end
end
