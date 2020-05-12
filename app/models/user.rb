class User < ApplicationRecord

  validates_presence_of :first_name, :last_name, :email, :phone_number
  validates_presence_of :message, :length => { :maximum => 200 }

  after_commit :notify_admin , on: :create

  def full_name
    [first_name,last_name].join(" ").titleize
  end

  def notify_admin
    _notify_admin
  end

  private

  def _notify_admin
    ##for async notification, can use deliver_later with sidekiq
    ::UserMailer.new_user_notification(self.id).deliver_now
  end


end
