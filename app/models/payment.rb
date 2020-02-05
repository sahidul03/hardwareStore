class Payment < ApplicationRecord
    belongs_to :work_receipt

    validates :amount, presence: true
end
