class Task < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :completed, inclusion: [true, false]
end
