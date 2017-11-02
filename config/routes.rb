Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/' => 'spacelys_sockets#index'
  get '/socket' => 'spacelys_sockets#show'
end
