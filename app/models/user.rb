class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages
  has_many :groups, through: :group_users
  has_many :group_users
  
  validates :name, :email, presence: true, uniqueness: true

  def self.search(input, id)
    return nil if input == ""
    User.where.not(id: id).where(['name LIKE ?', "%#{input}%"]).limit(10)
  end

end
