class Job < ApplicationRecord
  belongs_to :user
  belongs_to :job_type
end
