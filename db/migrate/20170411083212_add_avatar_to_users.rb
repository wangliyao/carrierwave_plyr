class AddAvatarToUsers < ActiveRecord::Migration
  def change
    add_column :lyn_ins, :avatar, :string
  end
end
