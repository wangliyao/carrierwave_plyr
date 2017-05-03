class CreateLynIns < ActiveRecord::Migration
  def change
    create_table :lyn_ins do |t|
      t.text :name
      t.decimal :score
      t.text :description

      t.timestamps null: false
    end
  end
end
