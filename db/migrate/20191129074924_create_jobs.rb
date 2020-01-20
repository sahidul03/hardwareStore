class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.string :name
      t.text :details
      t.float :price, default: 1
      t.float :discount, default: 0
      t.boolean :active, default: true
      t.references :user, null: false, foreign_key: true
      t.references :job_type, null: false, foreign_key: true

      t.timestamps
    end
    # ID start from 100
    execute "ALTER TABLE jobs AUTO_INCREMENT = 100"
  end
end
