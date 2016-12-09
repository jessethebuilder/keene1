class AddNextGenToProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :next_gen, :boolean
  end
end
