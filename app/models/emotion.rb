class Emotion < ActiveRecord::Base
  validates :anger, :contempt, :disgust, :fear, :happiness, :neutral,
            :sadness, :surprise, :user_id, presence: true

  belongs_to :user
end
