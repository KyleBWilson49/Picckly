# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username: "Ryan")

Emotion.create!(anger: 2.345, contempt: 3.345, disgust: 1.345, fear: 4.345,
                happiness: 7.345, neutral: 6.345, sadness: 5.345, surprise: 8.345, user_id: 1)

Emotion.create!(anger: 4.345, contempt: 1.345, disgust: 6.345, fear: 3.345,
                happiness: 5.345, neutral: 2.345, sadness: 1.345, surprise: 3.345, user_id: 1)
