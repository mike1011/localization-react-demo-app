FactoryBot.define do
  factory :user do
    first_name { "foo" }
    last_name  { "bar" }
    email { "foo@bar.com" }
    phone_number { "555-123-6788" }
    message { "This is a test message" }
  end
end