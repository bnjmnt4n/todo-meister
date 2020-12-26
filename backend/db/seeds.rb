# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

User.destroy_all
Task.destroy_all
Subtask.destroy_all
Tag.destroy_all

user = User.create!(email: 'default@test.com', password: 'test1234', name: 'Test User')

tag1 = Tag.create!(name: 'Tag 1')
tag2 = Tag.create!(name: 'Tag 2')

user.tasks.create!({
                     name: 'Task 1',
                     completed: true,
                     description: 'A longer description for task #1',
                     due_date: 3.days.ago,
                     tags: [tag1]
                   })

task2 = user.tasks.create!({
                             name: 'Task 2',
                             completed: false,
                             description: 'A longer description for subtask 1',
                             tags: [tag2]
                           })

task2.subtasks.create!([{
                         name: 'Subtask 1',
                         completed: false,
                         due_date: 2.days.ago
                       },
                        {
                          name: 'Subtask 2',
                          completed: true,
                          description: 'A longer description for subtask 2'
                        }])
