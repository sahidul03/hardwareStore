class CreateJobTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :job_types do |t|
      t.string :title
      t.text :details
      t.boolean :active, default: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
