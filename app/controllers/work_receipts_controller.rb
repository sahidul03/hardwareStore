class WorkReceiptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_work_receipt, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, :only => [:create, :update]

  # GET /work_receipts
  # GET /work_receipts.json
  def index
    @work_receipts = WorkReceipt.all
  end

  def payment
    @customer = Customer.find(params[:id])
    @jobs = redisList('jobs')
  end

  # GET /work_receipts/1
  # GET /work_receipts/1.json
  def show
  end

  # GET /work_receipts/new
  def new
    # @work_receipt = WorkReceipt.new
    @jobs = redisList('jobs')
  end

  # GET /work_receipts/1/edit
  def edit
  end

  # POST /work_receipts
  # POST /work_receipts.json
  def create
    @work_receipt = WorkReceipt.new(work_receipt_params)
    respond_to do |format|
      if @work_receipt.save
        payment = Payment.create(work_receipt_id: @work_receipt.id, amount: params[:payment])
        params[:jobs].each { |job|  ReceiptItem.create(unit_price: job[:price], job_id: job[:id], quantity: job[:quantity], total: job[:price] * job[:quantity], work_receipt_id: @work_receipt.id)}
        format.json { render json: @work_receipt, status: :created }
      else
        format.json { render json: @work_receipt.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /work_receipts/1
  # PATCH/PUT /work_receipts/1.json
  def update
    respond_to do |format|
      if @work_receipt.update(work_receipt_params)
        format.html { redirect_to @work_receipt, notice: 'Work receipt was successfully updated.' }
        format.json { render :show, status: :ok, location: @work_receipt }
      else
        format.html { render :edit }
        format.json { render json: @work_receipt.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /work_receipts/1
  # DELETE /work_receipts/1.json
  def destroy
    @work_receipt.destroy
    respond_to do |format|
      format.html { redirect_to work_receipts_url, notice: 'Work receipt was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work_receipt
      @work_receipt = WorkReceipt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def work_receipt_params
      params.require(:work_receipt).permit(:car_no, :comment, :customer_id, :total, :discount, :due).merge(user_id: current_user.id)
    end
end
