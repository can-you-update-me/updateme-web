class CreateLibs < ActiveRecord::Migration
  def change
    create_table :libs do |t|
      t.string :name
      t.string :type
      t.text :description
      t.string :version
      t.datetime :checked_at

      t.timestamps null: false
    end
    add_index :libs, :name
    add_index :libs, :type
    add_index :libs, :checked_at
  end
end
