# DB設計

## users table
|Column|Type|Options|
|:-----------|------------:|:------------:|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
  - has_many :messages
  - has_many :groups, through: :group_user
  - has_many :groups_users

## groups table
|Column|Type|Options|
|:-----------|------------:|:------------:|
|name|string|null: false|
### Association
  - has_many :messages
  - has_many :users, through: :group_user
  - has_many :groups_users

## group_users table
|Column|Type|Options|
|:-----------|------------:|:------------:|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
  - belongs_to :user
  - belongs_to :group

## messages table
|Column|Type|Options|
|:-----------|------------:|:------------:|
|body|text||
|image|text||
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
  - belongs_to :user
  - begonds_to :group

