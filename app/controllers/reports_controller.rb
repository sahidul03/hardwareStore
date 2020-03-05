class ReportsController < ApplicationController
    
    def dashboard
        @reports = WorkReceipt.select(:id, :due, :total, :discount, :created_at).group_by { |m| m.created_at.year }
        @this_year = WorkReceipt.for_year(Date.today).select(:id, :due, :total, :discount, :created_at).group_by { |m| m.created_at.month }
    end

    def yearly_summary
    end

    def month_to_month_summary
    end

end
