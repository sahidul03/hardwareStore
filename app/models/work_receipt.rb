class WorkReceipt < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_many :receipt_items
  has_many :payments
end
