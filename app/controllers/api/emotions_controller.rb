class Api::EmotionsController < ApplicationController

  def index
    @emotions = current_user.emotions
    render json: @emotions
  end

  def create
    @emotion = Emotion.new(emotion_params)
    @emotion.user_id = current_user.id

    if @emotion.save!
      render json: @emotion
    else
      render json: {}
    end

  end

  private
  def emotion_params
    params.require(:emotion).permit(:anger, :contempt, :disgust, :happiness, :fear, :neutral, :sadness, :surprise)
  end
end
