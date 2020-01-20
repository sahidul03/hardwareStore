class CreateReceiptItems < ActiveRecord::Migration[6.0]
  def change
    create_table :receipt_items do |t|
      t.references :job, null: false, foreign_key: true
      t.references :work_receipt, null: false, foreign_key: true
      t.float :total
      t.integer :quantity
      t.float :unit_price

      t.timestamps
    end
  end
end
