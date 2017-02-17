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
      render json: @track.errors.full_messages
    end
  end

  def index
    if params[:filter] == "stream"
      @tracks = Track.where.not({user_id: current_user.id})
    end
    render :index
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :audio)
  end
end
