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

  scope :for_year, -> (date) { where("created_at >= ? and created_at <= ?", date.beginning_of_year, date.end_of_year) }

  scope :date_to_date_monthly_based, -> (start_date, end_date) { where("created_at >= ? and created_at <= ?", start_date.beginning_of_month, end_date.end_of_month) }
  
  scope :for_month, -> (date) { where("created_at >= ? and created_at <= ?", date.beginning_of_month, date.end_of_month) }

  scope :select_summary_reports, -> { select(:id, :due, :total, :discount, :created_at) }

  scope :group_by_year, -> { group_by { |m| m.created_at.year } }

  scope :group_by_month, -> { group_by { |m| m.created_at.beginning_of_month } }

  scope :group_by_day, -> { group_by { |m| m.created_at.beginning_of_day } }


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
