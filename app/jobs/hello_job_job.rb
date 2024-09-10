class HelloJobJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "hello world job done"
  end
end
