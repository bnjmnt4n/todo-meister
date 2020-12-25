class Subtask < ApplicationRecord
  belongs_to :task

  validates :name, presence: true
  validates :completed, inclusion: [true, false]
end
