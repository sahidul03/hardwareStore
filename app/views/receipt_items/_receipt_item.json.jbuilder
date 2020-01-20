json.extract! receipt_item, :id, :job_id, :work_receipt_id, :total, :quantity, :unit_price, :created_at, :updated_at
json.url receipt_item_url(receipt_item, format: :json)
