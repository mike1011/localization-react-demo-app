require "spec_helper"

def get_current_translations
  I18n.t('contact_us_form', locale: "en")
end

describe "home_page/index.html.erb" do
  before do
    render
  end
  it 'displays default home page' do
    translations = get_current_translations
    expect(rendered).to include("data-react-props")
    expect(translations).to be_truthy
    expect(translations[:title]).to include("Send Us A Message")

  end
end