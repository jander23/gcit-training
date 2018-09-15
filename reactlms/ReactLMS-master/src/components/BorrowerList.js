"use strict"

import React from 'react';
import Modal from 'react-modal'
import PropTypes from 'prop-types';
import BorrowerActions from '../actions/borrowerActions';
import BookLoanActions from '../actions/bookLoanActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app')

export class BorrowerList extends React.Component{
    constructor(props){
      super(props);
      this.state={
        modalIsOpen: false,
        loanId: -1,
        loanUser:"",
        loanBook:"",
        days:0,
        updateId: -1,
        name: "",
        address: "",
        phone: ""};
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handlePhoneChange = this.handlePhoneChange.bind(this);
      this.handleDaysChange = this.handleDaysChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
      this.handleSubmit3 = this.handleSubmit3.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.showLoans = this.showLoans.bind(this);
      this.hideLoans = this.hideLoans.bind(this);
      this.handleOverride = this.handleOverride.bind(this);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
      this.subtitle.style.color = '#f00';
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    showLoans(name, cardNo) {
      this.setState({loanId: cardNo});
      this.setState({loanUser: name})
      BookLoanActions.readLoans(cardNo);
    }

    hideLoans() {
      this.setState({loanId: -1});
      BorrowerActions.readBorrowers();
    }

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    handleAddressChange(event) {
      this.setState({address: event.target.value});
    }

    handlePhoneChange(event) {
      this.setState({phone: event.target.value});
    }

    handleUpdate(id){
      this.setState({updateId: id});
      this.openModal();
    }

    handleAdd(){
      this.setState({updateId: -1});
      this.openModal();
    }

    handleDaysChange(event){
      this.setState({days: Number(event.target.value)});
    }

    handleOverride(cardNo, bookId){
      this.setState({updateId: -2});
      this.setState({loanBook: bookId})
      this.openModal();
    }

    handleSubmit(event) {
      var input = {
        "name":this.state.name,
        "address":this.state.address,
        "phone":this.state.phone
      };
      BorrowerActions.addBorrower(input);
      event.preventDefault();
      this.closeModal();
    }

    handleSubmit2(event) {
      var input = {
        "name":this.state.name,
        "address":this.state.address,
        "phone":this.state.phone
      };
      BorrowerActions.updateBorrower(this.state.updateId, input);
      event.preventDefault();
      this.closeModal();
    }

    handleSubmit3(event) {
      BookLoanActions.updateLoan(this.state.loanId, this.state.loanBook, this.state.days)
      event.preventDefault();
      this.closeModal();
    }

    createBorrowerRow(borrower){
        if (borrower.cardNo == 0){
          return null;
        }
        return (
            <tr key={borrower.cardNo}>
                <td> {borrower.name} </td>
                <td> {borrower.address} </td>
                <td> {borrower.phone} </td>
                <td><button
                  onClick={() => this.handleUpdate(borrower.cardNo)}
                  >Update</button></td>
                <td><button
                  onClick={() => BorrowerActions.deleteBorrower(borrower.cardNo)}
                  >Delete</button></td>
                <td><button
                  onClick={() => this.showLoans(borrower.name, borrower.cardNo)}
                  >Show Loans</button></td>
            </tr>
        );
    }

    createLoanRow(loan){
      if (this.props.loanList.isEmpty){
        return (
          <div>Borrower has no loans</div>
        )
      }
        return (
            <tr key={[loan.book.bookId, loan.borrower.borrowerId]}>
                <td> {loan.book.title} </td>
                <td> {loan.branch.branchName} </td>
                <td> {loan.dueDate} </td>
                <td><button
                  onClick={() => this.handleOverride(loan.borrower.cardNo, loan.book.bookId)}
                  >Override Due Date</button></td>
            </tr>
        );
    }

    componentDidMount(){
        BorrowerActions.readBorrowers();
        BookLoanActions.readLoans(0)
        this.setState({loanId: -1});
    }

    render() {
        return(
            <div>
              {this.state.updateId == -2 && <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Override Modal"
              >

                <h2 ref={subtitle => this.subtitle = subtitle}>How many days will you extend this loan?</h2>
                <button onClick={this.closeModal}>Cancel</button>
                <form onSubmit={this.handleSubmit3}>
                  <label>
                    Extention in days:
                    <input type="text" name={this.state.days} onChange={this.handleDaysChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </Modal>}
              {this.state.updateId == -1 && <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Add Modal"
              >

                <h2 ref={subtitle => this.subtitle = subtitle}>Please enter values for new borrower</h2>
                <button onClick={this.closeModal}>Cancel</button>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Name:
                    <input type="text" name={this.state.name} onChange={this.handleNameChange} />
                  </label>
                  <label>
                    Address:
                    <input type="text" address={this.state.address} onChange={this.handleAddressChange} />
                  </label>
                  <label>
                    Phone:
                    <input type="text" phone={this.state.phone} onChange={this.handlePhoneChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </Modal>}
              {this.state.updateId > -1 && <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Update Modal"
              >

                <h2 ref={subtitle => this.subtitle = subtitle}>Please enter new values for this borrower</h2>
                <button onClick={this.closeModal}>Cancel</button>
                <form onSubmit={this.handleSubmit2}>
                  <label>
                    Name:
                    <input type="text" name={this.state.name} onChange={this.handleNameChange} />
                  </label>
                  <label>
                    Address:
                    <input type="text" address={this.state.address} onChange={this.handleAddressChange} />
                  </label>
                  <label>
                    Phone:
                    <input type="text" phone={this.state.phone} onChange={this.handlePhoneChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </Modal>}
                {this.state.loanId == -1 && <h1>Borrowers</h1>}
                {this.state.loanId != -1 && <h1>{this.state.loanUser}</h1>}
                {/* TODO: right here is where I would put a search bar */}
                {this.state.loanId == -1 && <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th><button
                              onClick = {this.handleAdd}
                              >Add</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.borrowerList.map(this.createBorrowerRow, this)}
                    </tbody>
                </table>}
                {this.state.loanId != -1 && <table className="table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Branch</th>
                            <th>Due</th>
                            <th><button
                              onClick = {this.hideLoans}
                              >Back</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.loanList.map(this.createLoanRow, this)}
                    </tbody>
                </table>}
            </div>
        );
    }
}

BorrowerList.propTypes = {
    borrowerList: PropTypes.array.isRequired,
    loanList: PropTypes.array
};
