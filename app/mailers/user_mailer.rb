class UserMailer < ApplicationMailer

  def new_user_notification(user_id)
    @user = User.find user_id
    Rails.logger.info "=====Sending new user notification email for ====#{@user.email}==="
    ##update user email statusP
    @user.update_attribute(:email_sent, true)
    mail(:to => configatron.default_to, :subject => I18n.t("new_user_notification_email"))
  end

end
