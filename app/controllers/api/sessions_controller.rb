class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in!(@user)
      render 'api/users/show'
    else
      render json: ["Invalid Login Credentials"], status: 422
    end
  end


  def destroy
    if current_user
      log_out!
      render 'api/users/show'
    else
      render json: ["User isn't logged in"], status: 404
    end
  end
end
