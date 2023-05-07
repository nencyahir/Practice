class CreateRestaurants < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string :restaurant_name
      t.string :restaurant_address
      t.string :restaurant_phoneno


      t.timestamps
    end
  end
end
