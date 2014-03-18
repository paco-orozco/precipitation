Precipitation::Application.routes.draw do
  get "environments/index"

  root to: 'environments#index'
end
