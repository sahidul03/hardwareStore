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
        @start_date = params[:start_date].present? ? params[:start_date].to_date : Date.today.beginning_of_year
        @end_date = params[:end_date].present? ? params[:end_date].to_date : Date.today.end_of_year
        @reports = WorkReceipt.date_to_date_monthly_based(@start_date, @end_date).select_summary_reports.group_by_month
    end

    def date_valid?(date)
        format = '%Y-%m-%d'
        DateTime.strptime(date, format)
        true
      rescue ArgumentError
        false
    end

end
