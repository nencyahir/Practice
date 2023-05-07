class CreateMenus < ActiveRecord::Migration[6.1]
  def change
    create_table :menus do |t|
      t.string :menu_name
      t.references :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
