class Api::PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.where(user_id: current_user.id)
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist[:user_id] = current_user.id
    if @playlist.save
      render 'api/playlists/show'
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    Playlist.delete(params[:id])
    render 'api/playlists/show'
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :user_id)
  end
end
