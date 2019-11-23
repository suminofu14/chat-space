class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :body, presense: true, unless: :image?
end
