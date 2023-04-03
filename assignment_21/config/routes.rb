Rails.application.routes.draw do
  devise_for :users, :controllers => {:registrations => "users/registrations"}

  devise_scope :user do
    get '/users/showuser', to: 'users/registrations#showuser'
  end
  
end
