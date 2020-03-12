module ApplicationHelper

    def today_date_time
        Time.now.strftime("%d-%m-%Y %I:%M %P")
    end

    def current_month
        Time.now.strftime("%B-%Y")
    end

    def current_year
        Time.now.strftime("%Y")
    end

    def date_format_with_time date
        date.strftime("%d-%m-%Y %I:%M %P")
    end

    def date_format_without_time date
        date.strftime("%d-%m-%Y")
    end

    def date_format_with_month_year date
        date.strftime("%B-%Y")
    end

    # validation
    def validate_date date
        begin
            Date.parse(date)
        rescue ArgumentError
            nil
        end
    end

end
