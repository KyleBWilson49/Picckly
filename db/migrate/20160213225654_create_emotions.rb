class CreateEmotions < ActiveRecord::Migration
  def change
    create_table :emotions do |t|
      t.float :anger, null: false
      t.float :contempt, null: false
      t.float :disgust, null: false
      t.float :fear, null: false
      t.float :happiness, null: false
      t.float :neutral, null: false
      t.float :sadness, null: false
      t.float :surprise, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :emotions, :user_id
  end
end
