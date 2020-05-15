class ErrorsController < ApplicationController
  def not_found
    render :template => 'errors/404', status: 404
  end
end