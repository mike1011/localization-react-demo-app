class ApplicationController < ActionController::Base
  ##lets skip authentication for api requests using json
  skip_before_action :verify_authenticity_token, if: :json_request?
  helper_method :get_current_translations

  def current_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  ##added arguments so that It can be used to fetch other strings too, if needed
  def get_current_translations(contentText = nil)
    contentText ||= "form.contact_us"
    I18n.t(contentText, locale: current_locale)
  end

  def json_request?
    request.format.json?
  end

end
