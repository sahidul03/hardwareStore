class Customer < ApplicationRecord
  belongs_to :user
  has_many :work_receipts

  validates :name, presence: true
  validates :address, presence: true
  validates :phone, presence: true,  uniqueness: { case_sensitive: false }

end
