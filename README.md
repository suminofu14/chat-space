# DB設計
---

## users table
---
|Column|Type|Options|
|:-----------|------------:|:------------:|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
  - has_many :messages
  - has_many :groups, through: :groups_users
  - has_many :groups_users

## groups table
---
|Column|Type|Options|
|:-----------|------------:|:------------:|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
  - has_many :messages
  - has_many :users, through: :groups_users
  - has_many :groups_users

## groups_users table
---
|Column|Type|Options|
|:-----------|------------:|:------------:|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
  - belongs_to :user
  - belongs_to :group

## messages table
|Column|Type|Options|
|:-----------|------------:|:------------:|
|body|text|null: false|
|image|text||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
  - belongs_to :user
  - begonds_to :group

