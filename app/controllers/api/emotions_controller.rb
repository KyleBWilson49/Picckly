class Api::EmotionsController < ApplicationController

  def index
    @emotions = current_user.emotions
    render json: @emotions
  end
end
