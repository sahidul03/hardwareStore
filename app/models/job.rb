class Job < ApplicationRecord
  belongs_to :user
  belongs_to :job_type
  
  def status
    self.active ? 'Active' : 'Inactive'
  end
end
