class CreateJoinTableTaskTag < ActiveRecord::Migration[6.1]
  def change
    create_join_table :tasks, :tags do |t|
      # TODO: figure out which indexes are actually required
      t.index [:task_id, :tag_id]
      t.index [:tag_id, :task_id]
    end
  end
end
