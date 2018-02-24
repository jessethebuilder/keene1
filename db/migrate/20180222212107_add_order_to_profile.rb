class AddOrderToProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :order, :integer
  end
end
