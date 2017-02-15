class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      debugger
      render :show
    else
      render json: @user.errors.to_a, status: 422
    end
  end

end
