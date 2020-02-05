class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.references :work_receipt, null: false, foreign_key: true
      t.float :amount
      t.timestamps
    end
  end
end
