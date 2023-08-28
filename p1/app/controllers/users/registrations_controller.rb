class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json

  # POST /resource
  def create
    build_resource(sign_up_params)

    if resource.save
      case resource.role
      when "student"
        # Custom logic for student registration
        # For example, you might want to create a Student model and associate it here.
      when "teacher"
        # Custom logic for teacher registration
        # You might create a Teacher model and associate it.
      else
        # Handle unknown role or default behavior
      end

      render json: { status: { code: 200, message: 'Signed up successfully.' } }
    else
      render json: { status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" } }
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :name, :role)
  end
end
