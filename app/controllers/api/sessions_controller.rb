class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])

    if @user
      login_user(@user)
      render json: @user
    else
      render json: { errors: ["Invalid username"] }
    end
  end


  def destroy
    logout_user
    render json: {}
  end
end
