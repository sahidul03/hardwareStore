class RegistrationsController < Devise::RegistrationsController

  def new
    flash[:alert] = 'Registrations are not open.'
    redirect_to root_path
  end

  def create
    flash[:alert] = 'Registrations are not open.'
    redirect_to root_path
  end

  private

  def account_update_params
    params.require(:user).permit(:name, :nickname, :email, :password, :password_confirmation, :current_password)
  end
end
