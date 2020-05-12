require "rails_helper"

RSpec.describe Api::V1::UsersController, :type => :controller do

  describe "User actions" do
    let(:valid_params) do
      {
         user: {
          first_name: "Foo",
          last_name: "Bar",
          email: "foo@bar.com",
          phone_number: "+1 123456789",
          message: "This is a text message"
        }
      }
    end

    it "creates new user" do
      post "create", :params => valid_params

      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:ok)
    end

    it "creation of new user fails " do
      user = valid_params[:user]
      user[:first_name] = nil
      post "create", :params => valid_params

      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(406)
    end

  end

end