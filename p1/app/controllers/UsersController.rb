class UsersController < ApplicationController
    before_action :authenticate_user!
    def update_registration
     
      if current_user.update(user_params)
        render json: current_user, status: :ok
      else
        render json: { error: 'Failed to update user registration' }, status: :bad_request
      end
    end

  end
  