class AddYearsForNextGenToProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :years_for_next_gen, :integer
  end
end
