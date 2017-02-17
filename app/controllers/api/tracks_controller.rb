class Api::TracksController < ApplicationController

  def show
    @track = Track.find(params[:id])
  end

  def create
    debugger
    @track = Track.new(track_params)
    @track.user_id = current_user.id
    if @track.save
      render :show
    else
      render json: @track.errors.full_messages
    end
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :audio)
  end
end
