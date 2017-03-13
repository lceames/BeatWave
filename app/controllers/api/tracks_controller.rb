class Api::TracksController < ApplicationController

  def show
    @track = Track.find(params[:id])
  end

  def create
    @track = Track.new(track_params)
    @track.user_id = current_user.id
    if @track.save
      render :show
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def index
    if params[:type] == "stream"
      if current_user
        @tracks = Track.where.not({user_id: current_user.id}).includes(:comments)
      else
        @tracks = Track.all.includes(:comments)
      end
    elsif params[:type] == "user-show"
      id = params[:id].to_i
      @tracks = Track.all.includes(:comments).where(user_id: id)
    end
    render :index
  end

  def destroy
    @track = Track.find(params[:id])
    Track.delete(params[:id])
    render :show
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :audio_file, :image)
  end
end
