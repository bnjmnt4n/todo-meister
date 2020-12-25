class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks

  validates :name, presence: true
  validates :completed, inclusion: [true, false]
end
