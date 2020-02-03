import React from "react"
import PropTypes from "prop-types"
class NewPayment extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedJobs: [],
      discount: '',
      payment: '',
      carNo: '',
      submitted: false,
    };
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

  createPayment() {
    this.state.submitted = true;
    if (this.state.selectedJobs.length > 0) {
      if (this.state.carNo) {
        if ((this.totalPrice() + this.totalPrice()*0.10) - this.state.discount >= 0) {
          if ((this.totalPrice() + this.totalPrice()*0.10 - this.state.discount) - this.state.payment >= 0) {

          } else {
            alert("Payment can't be greater than total amount.");
          }
        } else {
          alert("Discount can't be greater than total amount.");
        }
      } else {
        alert("Car no can't be blank.");
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
                <div className="col-8">
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
                          <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th className="text-center" scope="col" colSpan="2">Comment</th>
                            <th className="text-right" scope="col">
                              <textarea
                                className="form-control"
                                type="text"
                                value={this.state.comment}
                                onChange={this.handleCommentChange}></textarea>
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
                </div>
                <div className="col-4 left-border">
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
