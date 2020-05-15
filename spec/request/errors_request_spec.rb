require 'rails_helper'

RSpec.describe "errors", :type => :request do

  it "displays the 404 page" do
    get "/404"
  end

end