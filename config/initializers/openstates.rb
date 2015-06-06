OpenStates.configure do |config|
  config.api_key =ENV['SUNLIGHT_API_KEY']
  config.logger = Rails.logger
end
