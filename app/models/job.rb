class Job < ApplicationRecord
  belongs_to :user
  belongs_to :job_type

  validates :name, presence: true
  validates :job_type_id, presence: true
  validates :details, presence: true
  validates :price, presence: true, numericality: true
  validates :discount, presence: true, numericality: true
  validates :user_id, presence: true
  
  def status
    self.active ? 'Active' : 'Inactive'
  end
end
