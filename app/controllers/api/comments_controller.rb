class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    comment[:user_id] = current_user.id

    if comment.save
      @track = comment.track
      render 'api/tracks/show'
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @track = @comment.track
    Comment.delete(params[:id])
    render 'api/tracks/show'
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :track_id, :elapsed_time)
  end
end
