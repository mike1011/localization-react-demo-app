require 'spec_helper'

describe ApplicationController do

contentText =  {
    "form": {
      "contact_us": {
        "title": "Send Us A Message",
        "address": "Address",
        "lets_talk": "Lets Talk",
        "general_support": "General Support",
        "input": {
          "label": {
            "name": "TELL US YOUR NAME",
            "email": "ENTER YOUR EMAIL",
            "phone": "ENTER PHONE NUMBER",
            "message": "MESSAGE",
            "submit_btn": "SEND MESSAGE",
            "change_lang_btn": "Change Language"
          },
          "placeholder": {
            "message": "Write us a message",
            "first_name": "First name",
            "last_name": "Last name"
          }
        }
      }
    }
  }

  describe "#get_current_translations" do
    it "returns locale strings" do
      expect(subject.get_current_translations[:title]).to eq(contentText[:form][:contact_us][:title])
    end
  end

end