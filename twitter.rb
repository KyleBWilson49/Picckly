# require "twitter"
# require "byebug"

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "yxo0JF3jA2b9wAXw7FlTh7AbL"
  config.consumer_secret     = "WELGTE2uzntcXCCgLpIiT4cwiQUwcWpUonf1fP90tteMQhQYKK"
  config.access_token        = "3399344712-zazXzOhLHxIcspwZoIKwLJCL86QerEvThpuEexk"
  config.access_token_secret = "ZV5bSIcfu0qLoLNcefXMaI8HUSRt88yhbpYMuhlAOOE7b"
end

timeline = client.user_timeline("realDonaldTrump")
timeline.each do |tweet|
  p tweet.text
end
