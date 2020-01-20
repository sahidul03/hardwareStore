json.extract! work_receipt, :id, :car_no, :comment, :job_id, :user_id, :customer_id, :total, :discount, :created_at, :updated_at
json.url work_receipt_url(work_receipt, format: :json)
