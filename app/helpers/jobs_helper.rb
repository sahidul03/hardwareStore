module JobsHelper
    def job_price price, discount
        price.to_f - discount.to_f
    end
end
