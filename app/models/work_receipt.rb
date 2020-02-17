class WorkReceipt < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_many :receipt_items
  has_many :payments


  default_scope { order(created_at: :desc) }

  scope :not_fully_paid, -> { where("due > ?", 0) }
  
  scope :fully_paid, -> { where("due <= ?", 0) }

  scope :search_by_car, -> (car) { where("car_no LIKE '%#{car}%'") }

  def paid_amount
    total - due
  end

end
