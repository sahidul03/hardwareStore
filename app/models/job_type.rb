class JobType < ApplicationRecord
  belongs_to :user

  def status
    self.active ? 'Active' : 'Inactive'
  end
end
