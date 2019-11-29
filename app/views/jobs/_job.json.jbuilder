json.extract! job, :id, :name, :details, :active, :user_id, :job_type_id, :created_at, :updated_at
json.url job_url(job, format: :json)
