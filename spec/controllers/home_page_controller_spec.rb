require "rails_helper"

RSpec.describe HomePageController, :type => :controller do
  describe "responds to" do
    it "responds to html by default" do
      get :index
      expect(response.media_type).to eq "text/html"
    end

  end
end