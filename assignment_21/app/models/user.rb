class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
         devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         has_one :company
         after_create :send_welcome_email
         private
         
         def send_welcome_email
          UsermailerMailer.welcome_email(self).deliver_now
         end

         def send_email
          AfternoonMailer.send_email(self).deliver_later
      end
end
