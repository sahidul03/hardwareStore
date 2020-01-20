require 'test_helper'

class ReceiptItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @receipt_item = receipt_items(:one)
  end

  test "should get index" do
    get receipt_items_url
    assert_response :success
  end

  test "should get new" do
    get new_receipt_item_url
    assert_response :success
  end

  test "should create receipt_item" do
    assert_difference('ReceiptItem.count') do
      post receipt_items_url, params: { receipt_item: { job_id: @receipt_item.job_id, quantity: @receipt_item.quantity, total: @receipt_item.total, unit_price: @receipt_item.unit_price, work_receipt_id: @receipt_item.work_receipt_id } }
    end

    assert_redirected_to receipt_item_url(ReceiptItem.last)
  end

  test "should show receipt_item" do
    get receipt_item_url(@receipt_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_receipt_item_url(@receipt_item)
    assert_response :success
  end

  test "should update receipt_item" do
    patch receipt_item_url(@receipt_item), params: { receipt_item: { job_id: @receipt_item.job_id, quantity: @receipt_item.quantity, total: @receipt_item.total, unit_price: @receipt_item.unit_price, work_receipt_id: @receipt_item.work_receipt_id } }
    assert_redirected_to receipt_item_url(@receipt_item)
  end

  test "should destroy receipt_item" do
    assert_difference('ReceiptItem.count', -1) do
      delete receipt_item_url(@receipt_item)
    end

    assert_redirected_to receipt_items_url
  end
end
