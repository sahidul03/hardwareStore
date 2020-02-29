class CustomersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_customer, only: [:show, :edit, :update, :history]

  # GET /customers
  # GET /customers.json
  def index
    if params[:phone]
      @customers = Customer.includes(:user).where("phone LIKE '%#{params[:phone]}%'").page(params[:page])
    else
      @customers = Customer.includes(:user).all.page(params[:page])
    end
  end

  # GET /customers/1
  # GET /customers/1.json
  def show
  end

  # GET /customers/1/history
  # GET /customers/1/history.json
  def history
    if params[:status] == 'paid' && params[:car].present?
      @work_receipts = @customer.work_receipts.includes(:customer).fully_paid.search_by_car(params[:car]).page(params[:page])
    elsif params[:status] == 'unpaid' && params[:car].present?
      @work_receipts = @customer.work_receipts.includes(:customer).not_fully_paid.search_by_car(params[:car]).page(params[:page])
    elsif params[:status] == 'paid' && !params[:car].present?
      @work_receipts = @customer.work_receipts.includes(:customer).fully_paid.page(params[:page])
    elsif params[:status] == 'unpaid' && !params[:car].present?
      @work_receipts = @customer.work_receipts.includes(:customer).not_fully_paid.page(params[:page])
    elsif params[:status] != 'unpaid' && params[:status] != 'paid' && params[:car].present?
      @work_receipts = @customer.work_receipts.includes(:customer).search_by_car(params[:car]).page(params[:page])
    else
      @work_receipts = @customer.work_receipts.includes(:customer).page(params[:page])
    end
  end

  # GET /customers/new
  def new
    @customer = Customer.new
  end

  # GET /customers/1/edit
  def edit
  end

  # POST /customers
  # POST /customers.json
  def create
    @customer = Customer.new(customer_params)

    respond_to do |format|
      if @customer.save
        format.html { redirect_to customers_url, notice: 'Customer was successfully created.' }
        format.json { render :show, status: :created, location: @customer }
      else
        format.html { render :new }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /customers/1
  # PATCH/PUT /customers/1.json
  def update
    respond_to do |format|
      if @customer.update(customer_params)
        format.html { redirect_to customers_url, notice: 'Customer was successfully updated.' }
        format.json { render :show, status: :ok, location: @customer }
      else
        format.html { render :edit }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /customers/1
  # DELETE /customers/1.json
  def destroy
    @customer.destroy
    respond_to do |format|
      format.html { redirect_to customers_url, notice: 'Customer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def customer_params
      params.require(:customer).permit(:name, :phone, :address).merge(user_id: current_user.id)
    end
end
