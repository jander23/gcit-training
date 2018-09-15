"use strict"

import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import LibraryBranchActions from '../actions/libraryBranchActions';
import BookLoanActions from '../actions/bookLoanActions';
import BookActions from '../actions/bookActions';
import BookCopiesActions from '../actions/bookCopiesActions';
import BorrowerActions from '../actions/borrowerActions'

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

export class LibraryBranchList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      modalIsOpen: false,
      updateId: -1,
      clickedBranch: -1,
      branchName: "",
      branchAddress: ""};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleNameChange(event) {
    this.setState({branchName: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({branchAddress: event.target.value});
  }

  handleUpdate(id){
    this.setState({updateId: id});
    this.openModal();
  }

  handleAdd(){
    this.setState({updateId: -1});
    this.openModal();
  }

  handleBooks(branchId){
    this.setState({updateId: -2});
    this.setState({clickedBranch: branchId})
    this.openModal();
  }

  handleSubmit(event) {
    var input = {
      "branchName":this.state.branchName,
      "branchAddress":this.state.branchAddress
    };
    LibraryBranchActions.addBranch(input);
    event.preventDefault();
    this.closeModal();
  }

  handleSubmit2(event) {
    var input = {
      "branchName":this.state.branchName,
      "branchAddress":this.state.branchAddress
    };
    LibraryBranchActions.updateBranch(this.state.updateId, input);
    event.preventDefault();
    this.closeModal();
  }

  handleCheckOut(bookId){
    BookLoanActions.addBookLoan(this.props.userId, bookId, this.state.clickedBranch);
    alert("Checked out book!");
    this.closeModal();
  }

    createBranchRow(branch){
        if (branch.branchId==0){
          return null;
        }
        return (
            <tr key={branch.branchId}>
                <td> {branch.branchName} </td>
                <td> {branch.branchAddress} </td>
                {this.props.userType==="administrator"&&<td><button
                  onClick={() => this.handleUpdate(branch.branchId)}
                  >Update</button></td>}
                {this.props.userType==="administrator"&&<td><button
                  onClick={() => LibraryBranchActions.deleteBranch(branch.branchId)}
                  >Delete</button></td>}
                {this.props.userType==="borrower"&&<td><button
                  onClick={() => this.handleBooks(branch.branchId)}
                  >View Books</button></td>}
            </tr>
        );
    }

    createBookRow(book){
      var bookExist = false;
      var i;
      for (i=0; i<this.props.copiesList.length; i++){
        if (this.props.copiesList[i].book.bookId == book.bookId && this.props.copiesList[i].branch.branchId == this.state.clickedBranch && this.props.copiesList[i].noOfCopies > 0) {
          bookExist = true;
        }
      }
      if (!bookExist){
        return null;
      }
      // skip books that are not available at branch (state.userId)
      return (
          <tr key={book.bookId}>
              <td> {book.title} </td>
              <td> {book.author.authorName} </td>
              <td><button
                onClick={() => this.handleCheckOut(book.bookId)}
                >Check Out</button></td>
          </tr>
      );
    }

    componentDidMount(){
        LibraryBranchActions.readBranches();
        BookActions.readBooks();
        BookCopiesActions.readCopies();
        BorrowerActions.readBorrowers();
    }

    render() {
      var i;
      var myBorrowerName = "nobody"
      for (i = 0; i < this.props.borrowerList.length; i++){
        if (this.props.borrowerList[i].cardNo == this.props.userId){
          myBorrowerName = this.props.borrowerList[i].name;
        }
      }
        return(
            <div>
                {this.state.updateId == -1 && <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Add Modal"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter values for new Branch</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Branch Name:
                      <input type="text" name={this.state.branchName} onChange={this.handleNameChange} />
                    </label>
                    <label>
                      Branch Address:
                      <input type="text" address={this.state.branchAddress} onChange={this.handleAddressChange} />
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

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter new values for this branch</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit2}>
                    <label>
                      Branch Name:
                      <input type="text" name={this.state.branchName} onChange={this.handleNameChange} />
                    </label>
                    <label>
                      Branch Address:
                      <input type="text" address={this.state.branchAddress} onChange={this.handleAddressChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </Modal>}
                {this.state.updateId == -2 && <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Books At Branch"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Books at Branch</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <table className="table">
                      <thead>
                          <tr>
                              <th>Title</th>
                              <th>Author</th>
                              <th>Publisher</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.props.bookList.map(this.createBookRow, this)}
                      </tbody>
                  </table>
                </Modal>}
                <h1>Branches</h1>
                {this.props.userType === "borrower" && <h2>Browsing as {myBorrowerName}</h2>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            {this.props.userType==="administrator"&&<th><button
                            onClick = {this.handleAdd}>Add</button></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.libraryBranchList.map(this.createBranchRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

LibraryBranchList.propTypes = {
  libraryBranchList: PropTypes.array.isRequired,
  borrowerList: PropTypes.array,
  copiesList: PropTypes.array,
  bookList: PropTypes.array,
  userType: PropTypes.string.isRequired,
  userId: PropTypes.number
};
