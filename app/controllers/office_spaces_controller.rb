class OfficeSpacesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    @office_spaces = OfficeSpace.all
  end

  def show
    @office_space = OfficeSpace.find(params[:id])
  end

  def new
    @office_space = OfficeSpace.new
  end

  def create
    @office_space = OfficeSpace.new(office_space_params)
    @office_space.owner = current_user
    if @office_space.save
      redirect_to office_spaces_path
    else
      render :new
    end
  end

  def edit
    @office_space = OfficeSpace.find(params[:id])
  end

  def update
    @office_space = OfficeSpace.find(params[:id])
    if @office_space.update(office_space_params)
      redirect_to office_space_path(@office_space)
    else
      render :edit
    end
  end

  def destroy
    @office_space = OfficeSpace.find(params[:id])
    @office_space.destroy
    redirect_to office_spaces_path
  end

  private

  def office_space_params
    # *Strong params*: You need to *whitelist* what can be updated by the user
    # Never trust user data!
    params.require(:office_space).permit(:name, :address, :description, :price, :photo, :nearest_station)
  end
end
