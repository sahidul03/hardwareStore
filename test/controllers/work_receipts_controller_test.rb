require 'test_helper'

class WorkReceiptsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @work_receipt = work_receipts(:one)
  end

  test "should get index" do
    get work_receipts_url
    assert_response :success
  end

  test "should get new" do
    get new_work_receipt_url
    assert_response :success
  end

  test "should create work_receipt" do
    assert_difference('WorkReceipt.count') do
      post work_receipts_url, params: { work_receipt: { car_no: @work_receipt.car_no, comment: @work_receipt.comment, customer_id: @work_receipt.customer_id, discount: @work_receipt.discount, job_id: @work_receipt.job_id, total: @work_receipt.total, user_id: @work_receipt.user_id } }
    end

    assert_redirected_to work_receipt_url(WorkReceipt.last)
  end

  test "should show work_receipt" do
    get work_receipt_url(@work_receipt)
    assert_response :success
  end

  test "should get edit" do
    get edit_work_receipt_url(@work_receipt)
    assert_response :success
  end

  test "should update work_receipt" do
    patch work_receipt_url(@work_receipt), params: { work_receipt: { car_no: @work_receipt.car_no, comment: @work_receipt.comment, customer_id: @work_receipt.customer_id, discount: @work_receipt.discount, job_id: @work_receipt.job_id, total: @work_receipt.total, user_id: @work_receipt.user_id } }
    assert_redirected_to work_receipt_url(@work_receipt)
  end

  test "should destroy work_receipt" do
    assert_difference('WorkReceipt.count', -1) do
      delete work_receipt_url(@work_receipt)
    end

    assert_redirected_to work_receipts_url
  end
end
