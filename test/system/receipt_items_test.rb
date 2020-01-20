require "application_system_test_case"

class ReceiptItemsTest < ApplicationSystemTestCase
  setup do
    @receipt_item = receipt_items(:one)
  end

  test "visiting the index" do
    visit receipt_items_url
    assert_selector "h1", text: "Receipt Items"
  end

  test "creating a Receipt item" do
    visit receipt_items_url
    click_on "New Receipt Item"

    fill_in "Job", with: @receipt_item.job_id
    fill_in "Quantity", with: @receipt_item.quantity
    fill_in "Total", with: @receipt_item.total
    fill_in "Unit price", with: @receipt_item.unit_price
    fill_in "Work receipt", with: @receipt_item.work_receipt_id
    click_on "Create Receipt item"

    assert_text "Receipt item was successfully created"
    click_on "Back"
  end

  test "updating a Receipt item" do
    visit receipt_items_url
    click_on "Edit", match: :first

    fill_in "Job", with: @receipt_item.job_id
    fill_in "Quantity", with: @receipt_item.quantity
    fill_in "Total", with: @receipt_item.total
    fill_in "Unit price", with: @receipt_item.unit_price
    fill_in "Work receipt", with: @receipt_item.work_receipt_id
    click_on "Update Receipt item"

    assert_text "Receipt item was successfully updated"
    click_on "Back"
  end

  test "destroying a Receipt item" do
    visit receipt_items_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Receipt item was successfully destroyed"
  end
end
