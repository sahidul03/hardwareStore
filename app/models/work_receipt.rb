class WorkReceipt < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_many :receipt_items
  has_many :payments


  default_scope { order(created_at: :desc) }

  scope :not_fully_paid, -> { where("due > ?", 0) }
  
  scope :fully_paid, -> { where("due <= ?", 0) }

  scope :search_by_car, -> (car) { where("car_no LIKE '%#{car}%'") }

  scope :search_by_car_and_receipt_id, -> (car, receipt_id) { where("car_no LIKE '%#{car}%' AND id LIKE '%#{receipt_id}%'") }

  def paid_amount
    total - due
  end

  def total_a
    total - vat + discount
  end

  def total_b
    total + discount
  end

end
