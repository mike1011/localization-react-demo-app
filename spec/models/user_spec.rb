require 'rails_helper'


RSpec.describe User, :type => :model do
  subject {
    described_class.new(first_name: "Foo",
                        last_name: "Bar",
                        email: "foo@bar.com",
                        phone_number: "+1 123456789",
                        message: "This is a test message")
  }
  let!(:user) { create :user }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without first name" do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without last name" do
    subject.last_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without an email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a message" do
    subject.message = nil
    expect(subject).to_not be_valid
  end

  it "displays users full name" do
    expect(subject.full_name).to include(subject.first_name)
  end

  it "tests the private method through it‘s interface and send email" do
    expect(ActionMailer::Base.deliveries.count).to eq 1
  end

  it "fails validation with a missing first name" do
    user.first_name = ""
    expect(user.valid?).to eq(false)
  end

end