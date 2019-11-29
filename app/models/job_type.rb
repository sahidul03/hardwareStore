class JobType < ApplicationRecord
  belongs_to :user
  has_many :jobs

  def status
    self.active ? 'Active' : 'Inactive'
  end
end
