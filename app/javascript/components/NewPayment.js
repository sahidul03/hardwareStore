import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';


class NewPayment extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedJobs: [],
      discount: 0,
      payment: 0,
      carNo: '',
      paymentSubmitted: false,
      modalShow: false,
      paymentConfirmationModalShow: false,
      errorMessage: '',
      showSuccessMessage: false,
      showToastMessage: false
    };
  }

  closeToastMessage(){
    this.setState({ showToastMessage: false });
  }

  hideModal() {
    this.setState({ modalShow: false })
  }

  hidePaymentConfirmationModal() {
    this.setState({ paymentConfirmationModalShow: false })
  }

  addJob(job) {
    const selectedJobs = this.state.selectedJobs;
    const index = selectedJobs.findIndex(item => item.id ===job.id);
    if (index > -1) {
      const existJob = selectedJobs[index];
      existJob.quantity += 1; 
      selectedJobs[index] = existJob;
    } else {
      selectedJobs.push({ quantity: 1, id: job.id, price: (job.price-job.discount), name: job.name });
    }
    this.setState({selectedJobs});
  }

  decreaseJob(job) {
    const selectedJobs = this.state.selectedJobs;
    const index = selectedJobs.findIndex(item => item.id ===job.id);
    if (index > -1) {
      const existJob = selectedJobs[index];
      if (existJob.quantity >1) {
        existJob.quantity -= 1; 
        selectedJobs[index] = existJob;
        this.setState({selectedJobs});
      }
    }
  }

  removeJob(job) {
    const selectedJobs = this.state.selectedJobs;
    const index = selectedJobs.findIndex(item => item.id ===job.id);
    if (index > -1) {
      selectedJobs.splice(index, 1);
      this.setState({selectedJobs});
    }
  }

  sendPostCall() {
    fetch('/work_receipts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobs: this.state.selectedJobs,
        work_receipt: {
          discount: this.state.discount,
          comment: this.state.comment,
          car_no: this.state.carNo,
          customer_id: this.props.customer.id,
          vat: this.totalPrice()*0.10,
          total: this.totalPrice() + this.totalPrice()*0.10,
          due: this.totalPrice() + this.totalPrice()*0.10 - this.state.discount - this.state.payment
        },
        payment: this.state.payment,
      }),
    }).then((response) => response.json())
    .then((responseJson) => { 
        if (responseJson.id) {
          this.setState({ selectedJobs: [], paymentSubmitted: false, paymentConfirmationModalShow: false, showToastMessage: true });
          window.location = "/work_receipts/" + responseJson.id;
        }
    })
    .catch((error) => {
      console.error(error); 
    });
  }

  confirmPayment() {
    this.setState({ paymentSubmitted: true });
    this.sendPostCall();
  }

  createPayment() {
    if (this.state.selectedJobs.length > 0) {
      if (this.state.carNo) {
        if ((this.totalPrice() + this.totalPrice()*0.10) - this.state.discount >= 0) {
          if ((this.totalPrice() + this.totalPrice()*0.10 - this.state.discount) - this.state.payment >= 0) {
            if (this.state.payment >= 1) {
              this.setState({ paymentConfirmationModalShow: true })
            } else {
              this.setState({ errorMessage: "Payment can't be less than 1.", modalShow: true });
            }
          } else {
            this.setState({ errorMessage: "Payment can't be greater than total amount.", modalShow: true });
          }
        } else {
          this.setState({ errorMessage: "Discount can't be greater than total amount.", modalShow: true });
        }
      } else {
        this.setState({ errorMessage: "Car No can't be blank.", modalShow: true });
      }

    }
  }

  totalPrice() {
    return this.state.selectedJobs.reduce((sum, item) => { return (sum + (item.quantity * item.price)); }, 0);
  }

  handleDiscountChange = event => {
    this.setState({ discount: event.target.value });
  };
  handlePaymentChange = event => {
    this.setState({ payment: event.target.value });
  };

  handleCarNoChange = event => {
    this.setState({ carNo: event.target.value });
  };

  handleCommentChange = event => {
    this.setState({ comment: event.target.value });
  };

  render () {
    return (
      <React.Fragment>
        <div className="row">
                <div id="invoicePart" className="col-8">
                  {this.state.selectedJobs.length > 0 ?
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
                        {this.state.selectedJobs.map(job => (
                            <tr key={ job.id }>
                              <td className="text-success">
                                <div className="text-center">{job.id}</div><br/>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                  <button onClick={() => this.addJob(job)} type="button" className="btn btn-outline-secondary">
                                    <i className="mdi mdi-plus"></i>
                                  </button>
                                  <button onClick={() => this.decreaseJob(job)} type="button" className="btn btn-outline-secondary">
                                    <i className="mdi mdi-minus"></i>
                                  </button>
                                  <button onClick={() => this.removeJob(job)} type="button" className="btn btn-outline-secondary">
                                    <i className="mdi mdi-close-box"></i>
                                  </button>
                                </div>
                              </td>
                              <td>{job.name}</td>
                              <td className="text-left">{job.price}</td>
                              <td className="text-center">{job.quantity}</td>
                              <td className="text-right">{job.price*job.quantity}</td>
                            </tr>
                          ))}
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
                  : <h4 className="text-center">Please select JOB first</h4>
                  }
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
                <div className="col-4 left-border position-relative">
                    <h2>Jobs List</h2>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.jobs.map(job => (
                            <tr key={ job.id }>
                              <td className="text-success">{job.id}</td>
                              <td>{job.name}</td>
                              <td>{job.price-job.discount}</td>
                              <td>
                                  <span className="btn btn-primary" onClick={() => this.addJob(job)}>Add</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                  </table>
                  <Modal show={this.state.modalShow} backdrop="static" onHide={() => this.hideModal()}>
                    <Modal.Header closeButton>
                      <Modal.Title>Wrong Input</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><span className="text-danger">{this.state.errorMessage}</span></Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={() => this.hideModal()}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal show={this.state.paymentConfirmationModalShow} backdrop="static" onHide={() => this.hidePaymentConfirmationModal()}>
                    <Modal.Header>
                      <Modal.Title className="text-primary">Payment Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {
                        this.state.paymentSubmitted ?
                          <div><span className="h5">We're making payment for you. Please wait ...</span><Spinner className="pull-right" animation="border" variant="success" /></div> : <h4>Are you sure! You want to make payment?</h4>
                      }
                    </Modal.Body>
                    {
                        this.state.paymentSubmitted ? null :
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => this.hidePaymentConfirmationModal()}>
                            No
                          </Button>
                          <Button variant="primary" onClick={() => this.confirmPayment()}>
                            Yes
                          </Button>
                        </Modal.Footer>
                    }
                  </Modal>
                </div>
            </div>
      </React.Fragment>
    );
  }
}

NewPayment.propTypes = {
  jobs: PropTypes.array
};
export default NewPayment
