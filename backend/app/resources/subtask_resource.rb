class SubtaskResource < JSONAPI::Resource
  attributes :name, :description, :completed, :due_date
end
