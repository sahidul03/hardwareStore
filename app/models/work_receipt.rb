class WorkReceipt < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_many :receipt_items
end
