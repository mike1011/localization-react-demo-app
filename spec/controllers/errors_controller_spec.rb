require "rails_helper"

RSpec.describe ErrorsController, :type => :controller do
  describe "responds to" do
    it "responds to 404" do
      get :not_found
      expect(response.media_type).to eq "text/html"
    end

  end
end