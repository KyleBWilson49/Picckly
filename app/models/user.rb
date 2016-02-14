class User < ActiveRecord::Base
    validates :username, :session_token, presence: true
    after_initialize :ensure_session_token

    has_many :emotions

    def self.generate_session_token
      SecureRandom::urlsafe_base64(16)
    end

    def reset_session_token!
      self.session_token = User.generate_session_token
      self.save!
      self.session_token
    end

    private

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end

end
