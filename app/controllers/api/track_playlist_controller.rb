class Api::TrackPlaylistsController < ApplicationController
  def create
    @playlist = Playlist.new(comment_params)
    playlist[:user_id] = current_user.id
    if playlist.save
      render 'api/playlists/show'
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    Playlist.delete(params[:id])
  end

  private
  
  def track_playlist_params
    params.require(:track_playlist).permit(:track_id, :playlist_id)
  end
end
