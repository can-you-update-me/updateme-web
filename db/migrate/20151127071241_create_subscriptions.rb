class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.references :user, index: true, foreign_key: true
      t.references :lib, index: true, foreign_key: true
      t.string :channel

      t.timestamps null: false
    end

    add_index :subscriptions, [:lib_id, :channel]
    add_index :subscriptions, [:lib_id, :user_id], unique: true
  end
end
