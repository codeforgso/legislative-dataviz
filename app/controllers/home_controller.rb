class HomeController < ApplicationController
  def index
    @bills       = OpenStates::Bill.where(state: 'nc', q: 'grocery')
    @legislators = OpenStates::Legislator.where(state: 'nc')
  end
end
