class Customer < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :address, presence: true
  validates :phone, presence: true,  uniqueness: { case_sensitive: false }

end
