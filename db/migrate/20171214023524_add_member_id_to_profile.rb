class AddMemberIdToProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :member_id, :string
  end
end
