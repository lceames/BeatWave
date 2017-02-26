class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    debugger
    if @user.save
      log_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.image = params[:user][:image]
    @user.save!
    render :show
  end

end
