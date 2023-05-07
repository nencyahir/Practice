class RestaurantsController < ApplicationController

  def new
    @restaurant = Restaurant.new
    @menus = @restaurant.menus.build
  end


  def create
    @restaurant = Restaurant.new(restaurant_params)
 
    if @restaurant.save
      redirect_to restaurant_path(@restaurant)
    else
      render action: :new
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    @menus = @restaurant.menus
    
  end
  private
  def restaurant_params
    params.require(:restaurant).permit(:restaurant_name, :restaurant_address, :restaurant_phoneno, menus_attributes: [:id, :menu_name, :_destroy])
  end
   
end



