class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks
  has_and_belongs_to_many :tags

  validates :name, presence: true
  validates :completed, inclusion: [true, false]
end
