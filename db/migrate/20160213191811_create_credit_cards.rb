class CreateCreditCards < ActiveRecord::Migration
  def change
    create_table :credit_cards do |t|
      t.string :company, null: false
      t.string :card_name, null: false
      t.boolean :user_created, default: false

      t.timestamps null: false
    end

    add_index :credit_cards, :card_name, unique: true
  end
end
