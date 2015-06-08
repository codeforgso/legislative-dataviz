class HomeController < ApplicationController

  def index

    @bills       = OpenStates::Bill.where(state: 'nc', search_window: 'session:2015')
    @legislators = OpenStates::Legislator.where(state: 'nc', search_window: 'session:2015')

    @subjects = Array[]

    @bills.each do |bill|
      @subjects.push(bill.subjects)
    end

    @counts = Hash.new(0)
    @subjects.flatten.each { |subject| @counts[subject] += 1 }

  end


  def dashboard
    @bills       = OpenStates::Bill.where(state: 'nc', search_window: 'session:2015')
    @legislators = OpenStates::Legislator.where(state: 'nc', search_window: 'session:2015')
  end

end
