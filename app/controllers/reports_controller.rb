class ReportsController < ApplicationController
    before_action :authenticate_user!

    def dashboard
        @all_years = WorkReceipt.select_summary_reports.group_by_year
        @current_year = WorkReceipt.for_year(Date.today).select_summary_reports.group_by_month
        @current_month = WorkReceipt.for_month(Date.today).select_summary_reports.group_by_day
    end

    def yearly_summary
    end

    def month_to_month_summary
    end

end
