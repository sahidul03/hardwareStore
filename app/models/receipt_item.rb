class ReceiptItem < ApplicationRecord
  belongs_to :job
  belongs_to :work_receipt
end
