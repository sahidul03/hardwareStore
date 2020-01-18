class JobType < ApplicationRecord
  belongs_to :user
  has_many :jobs
  validates :title, presence: true
  validates :details, presence: true
  validates :user_id, presence: true


  def status
    self.active ? 'Active' : 'Inactive'
  end
end
