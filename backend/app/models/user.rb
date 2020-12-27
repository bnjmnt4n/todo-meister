class User < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :email, :password, :name, presence: true

  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # TODO: switch to `digest` and `has_secure_password` instead
  validates :password, length: { minimum: 8 }
  validates :name, length: { minimum: 2 }
end
