class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.string :display_name
      t.string :state
      t.integer :years_of_membership
      t.string :photo
      t.boolean :in_memoriam

      t.timestamps
    end
  end
end
