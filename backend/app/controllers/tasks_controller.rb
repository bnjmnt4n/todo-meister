class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  # GET /tasks
  def index
    # Fetch all tasks along with associated subtasks in 1 query
    @tasks = Task.all.includes(:subtasks, :tags).order(:created_at)

    render json: @tasks.to_json(include: %i[subtasks tags])
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    # TODO: use the first user for now until authentication has been setup.
    @task.user_id || @task.user = User.first

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def task_params
    params.require(:task).permit(:name, :description, :completed, :due_date)
  end
end
