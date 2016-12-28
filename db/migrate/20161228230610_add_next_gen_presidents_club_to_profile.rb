class AddNextGenPresidentsClubToProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :next_gen_presidents_club, :boolean
  end
end
