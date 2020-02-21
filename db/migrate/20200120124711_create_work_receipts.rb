class CreateWorkReceipts < ActiveRecord::Migration[6.0]
  def change
    create_table :work_receipts do |t|
      t.string :car_no
      t.text :comment
      t.references :user, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: true
      t.float :total
      t.float :discount
      t.float :due
      t.float :vat

      t.timestamps
    end
    # ID start from 100
    execute "ALTER TABLE work_receipts AUTO_INCREMENT = 100"
  end
end
