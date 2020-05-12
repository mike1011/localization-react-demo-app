class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token, if: :json_request?
  helper_method :get_current_translations

  def current_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def get_current_translations
    I18n.t("contact_us_form", locale: current_locale)
    .merge(address: configatron.address)
    .merge(contact_number: configatron.contact_number)
    .merge(general_support_email: configatron.general_support_email)
  end

  def json_request?
    request.format.json?
  end

end
