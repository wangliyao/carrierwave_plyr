class UsersController < ApplicationController

  def new
    @person = User.new
  end

  def create
    binding.pry
    @person = User.new(params[:users])
    @person.save
  end

  
end
