json.extract! job_type, :id, :title, :details, :active, :user_id, :created_at, :updated_at
json.url job_type_url(job_type, format: :json)
