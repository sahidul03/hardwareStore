class ReportsController < ApplicationController
    before_action :authenticate_user!

    def dashboard
        @all_years = WorkReceipt.select(:id, :due, :total, :discount, :created_at).group_by { |m| m.created_at.year }
        @current_year = WorkReceipt.for_year(Date.today).select(:id, :due, :total, :discount, :created_at).group_by { |m| m.created_at.month }
        @current_month = WorkReceipt.for_month(Date.today).select(:id, :due, :total, :discount, :created_at).group_by { |m| m.created_at.day }
    end

    def yearly_summary
    end

    def month_to_month_summary
    end

end
