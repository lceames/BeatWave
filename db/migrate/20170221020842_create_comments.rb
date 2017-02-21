class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :track_id, null: false
      t.integer :user_id, null: false
      t.string :body, null: false
      t.integer :elapsed_time, null: false
    end
  end
end
