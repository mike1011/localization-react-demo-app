class SetupMail < ActionMailer::Base
  if Rails.env != 'test'
    email_settings = Rails.configuration.email_settings
    ActionMailer::Base.smtp_settings = email_settings[Rails.env] unless email_settings[Rails.env].nil?
  end
end