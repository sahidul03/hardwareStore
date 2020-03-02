class ReportsController < ApplicationController
    
    def dashboard
        @reports = WorkReceipt.select(:id, :due, :total, :discount, :created_at).group_by { |m| m.created_at.year }
    end

    def yearly_summary
    end

    def month_to_month_summary
    end

end
