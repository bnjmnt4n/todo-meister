class TaskResource < JSONAPI::Resource
  attributes :name, :description, :completed, :due_date
  has_many :subtasks
end
