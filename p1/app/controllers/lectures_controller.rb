class LecturesController < ApplicationController
  def index
    @lectures=Lecture.all
    render json: @lectures
  end

  def edit
    @lecture = Lecture.find(params[:id])
  end

  def update
    @lecture = Lecture.find(params[:id])
    if @lecture.update(lecture_params)
      render json: @lecture
    else
      render json: { errors: @lecture.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @lecture = Lecture.find(params[:id])
    @lecture.destroy
    head :no_content
  end
  def create
    lecture = Lecture.new(lecture_params)
    if lecture.save
      render json: lecture, status: :created
    else
      render json: { errors: lecture.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def lecture_params
    params.require(:lecture).permit(:title, :description, :teacher_id, :subject, :datetime, :duration)
  end
end
