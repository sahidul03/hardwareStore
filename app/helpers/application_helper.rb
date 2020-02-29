module ApplicationHelper

    def today_date_time
        Time.now.strftime("%d-%m-%Y %I:%M %P")
    end

end
