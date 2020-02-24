import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';


class PaymentReceipt extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      payment: 0,
    };
  }

  render () {
    return (
      <React.Fragment>
        <div className="row">
          <div id="invoicePart" className="col-12">
            <table className="table table-hover">
                  <thead>
                  <tr>
                      <th className="text-center">Job ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-right">Total</th>
                  </tr>
                  </thead>
                  <tbody>

                  </tbody>
                  <tfoot>
                    <tr className="bg-light-gray">
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th className="text-center" scope="col" colSpan="2">Total A</th>
                      <th className="text-right" scope="col">{this.totalPrice()}</th>
                    </tr>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col" className="text-right" colSpan="2">10% VAT</th>
                      <th className="text-right" scope="col">{ this.totalPrice()*0.10 }</th>
                    </tr>
                    <tr className="bg-light-gray">
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th className="text-center" scope="col" colSpan="2">Total B</th>
                      <th className="text-right" scope="col">{ this.totalPrice() + this.totalPrice()*0.10 }</th>
                    </tr>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th className="text-center" scope="col" colSpan="2">Discount</th>
                      <th className="text-right" scope="col">
                        <input
                          className="form-control font-weight-bold text-right onlyPositiveInteger"
                          type="text"
                          value={this.state.discount}
                          onChange={this.handleDiscountChange}/>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="2">
                      <textarea
                          className="form-control"
                          type="text"
                          placeholder="Comment"
                          value={this.state.comment}
                          onChange={this.handleCommentChange}></textarea>
                      </th>
                      <th className="text-center" scope="col" colSpan="2">Car No</th>
                      <th className="text-right" scope="col">
                        <input
                          className="form-control font-weight-bold"
                          type="text"
                          value={this.state.carNo}
                          onChange={this.handleCarNoChange}/>
                      </th>
                    </tr>
                    <tr className="bg-light-gray">
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th className="text-center" scope="col" colSpan="2">Total Amount</th>
                      <th className="text-right" scope="col">{ this.totalPrice() + this.totalPrice()*0.10 - this.state.discount }</th>
                    </tr>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th className="text-center" scope="col" colSpan="2">Payment</th>
                      <th className="text-right" scope="col">
                        <input
                          className="form-control font-weight-bold text-right onlyPositiveInteger"
                          type="text"
                          value={this.state.payment}
                          onChange={this.handlePaymentChange}/>
                      </th>
                    </tr>
                    <tr className="bg-light-gray">
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th className="text-center" scope="col" colSpan="2">Due</th>
                      <th className="text-right" scope="col">{ this.totalPrice() + this.totalPrice()*0.10 - this.state.discount - this.state.payment}</th>
                    </tr>
                    <tr>
                      <th className="text-right" scope="col" colSpan="5">
                        <button type="button" onClick={() => this.createPayment()} className="btn btn-primary btn-fw">Create Payment</button>
                      </th>
                    </tr>
                  </tfoot>
            </table>
            <div className="toast-container">
              <Toast onClose={() => this.closeToastMessage() } show={this.state.showToastMessage}  delay={3000} autohide>
                <Toast.Header>
                  <i className="mdi mdi-check text-success mr-1 font-20"></i>
                  <strong className="mr-auto text-success">Success</strong>
                </Toast.Header>
                <Toast.Body className="text-success">Payment has been made successfully.</Toast.Body>
              </Toast>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PaymentReceipt.propTypes = {
  receipt: PropTypes.object,
  customer: PropTypes.object,
  payments: PropTypes.array,
  receipt_items: PropTypes.array,
};
export default PaymentReceipt
