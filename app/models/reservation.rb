class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :office_space
  has_one :conversation, dependent: :destroy
  validates :user, :office_space, :usernumber, :check_in, :check_out, presence: true
end
