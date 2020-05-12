class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: {message: I18n.t("successful_submission")}, status: :ok, statusText: "success"
    else
      render json: {message: @user.errors.full_messages.join(" , ")}, status: :not_acceptable, statusText: "fail"
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :phone_number, :message, :email_sent)
    end
end
