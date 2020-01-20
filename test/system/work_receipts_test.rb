require "application_system_test_case"

class WorkReceiptsTest < ApplicationSystemTestCase
  setup do
    @work_receipt = work_receipts(:one)
  end

  test "visiting the index" do
    visit work_receipts_url
    assert_selector "h1", text: "Work Receipts"
  end

  test "creating a Work receipt" do
    visit work_receipts_url
    click_on "New Work Receipt"

    fill_in "Car no", with: @work_receipt.car_no
    fill_in "Comment", with: @work_receipt.comment
    fill_in "Customer", with: @work_receipt.customer_id
    fill_in "Discount", with: @work_receipt.discount
    fill_in "Job", with: @work_receipt.job_id
    fill_in "Total", with: @work_receipt.total
    fill_in "User", with: @work_receipt.user_id
    click_on "Create Work receipt"

    assert_text "Work receipt was successfully created"
    click_on "Back"
  end

  test "updating a Work receipt" do
    visit work_receipts_url
    click_on "Edit", match: :first

    fill_in "Car no", with: @work_receipt.car_no
    fill_in "Comment", with: @work_receipt.comment
    fill_in "Customer", with: @work_receipt.customer_id
    fill_in "Discount", with: @work_receipt.discount
    fill_in "Job", with: @work_receipt.job_id
    fill_in "Total", with: @work_receipt.total
    fill_in "User", with: @work_receipt.user_id
    click_on "Update Work receipt"

    assert_text "Work receipt was successfully updated"
    click_on "Back"
  end

  test "destroying a Work receipt" do
    visit work_receipts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Work receipt was successfully destroyed"
  end
end
