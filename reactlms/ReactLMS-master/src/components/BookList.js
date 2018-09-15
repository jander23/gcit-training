"use strict"

import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import LibraryBranchActions from '../actions/libraryBranchActions';
import BookLoanActions from '../actions/bookLoanActions';
import BookCopiesActions from '../actions/bookCopiesActions';
import BorrowerActions from '../actions/borrowerActions';

// bootstrap modals

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

export class BookList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      modalIsOpen: false,
      updateId: -1,
      clickedBook: -1,
      branchName: "",
      branchAddress: "",
      title: "",
      author: "",
      publisher: ""};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handlePublisherChange = this.handlePublisherChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateBranch = this.updateBranch.bind(this);
    this.handleCopiesChange = this.handleCopiesChange.bind(this);
    this.handleCopies = this.handleCopies.bind(this);
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

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleAuthorChange(event) {
    this.setState({author: event.target.value});
  }

  handlePublisherChange(event) {
    this.setState({publisher: event.target.value});
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

  showBranches(bookId){
    this.setState({updateId: -2});
    this.setState({clickedBook: bookId});
    this.openModal();
  }

  updateBranch(){
    this.setState({updateId: -3});
    this.openModal();
  }

  handleCopiesChange(event){
    this.setState({noOfCopies: Number(event.target.value)})
  }

  handleCopies(bookId){
    BookCopiesActions.addCopies(bookId, this.props.userId, this.state.noOfCopies);
  }

  handleSubmit(event) {
    var input = {
      "title":this.state.title,
      "author":{"authorName":this.state.author},
      "publisher":{"publisherName":this.state.publisher,
                  "publisherAddress": "",
                  "publisherPhone": ""}
    };
    BookActions.addBook(input);
    event.preventDefault();
    this.closeModal();
  }

  handleSubmit2(event) {
    var input = {
      "title":this.state.title,
      "author":{"authorName":this.state.author},
      "publisher":{"publisherName":this.state.publisher,
                  "publisherAddress": "",
                  "publisherPhone": ""}
    };
    BookActions.updateBook(this.state.updateId, input);
    event.preventDefault();
    this.closeModal();
  }

  handleSubmit3(event) {
    var input = {
      "branchName":this.state.branchName,
      "branchAddress":this.state.branchAddress
    };
    LibraryBranchActions.updateBranch(this.props.userId, input);
    event.preventDefault();
    this.closeModal();
  }

  handleCheckOut(branchId){
    BookLoanActions.addBookLoan(this.props.userId, this.state.clickedBook, branchId);
    alert("Checked out book!");
    this.closeModal();
  }

  countCopies(bookId){
    var i;
    for (i=0; i<this.props.copiesList.length; i++){
      if(this.props.copiesList[i].branch.branchId == this.props.userId && this.props.copiesList[i].book.bookId == bookId){
        return this.props.copiesList[i].noOfCopies;
      }
    }
    return 0;
  }

    createBookRow(book){
        if(book.bookId==0){
          return null;
        }
        return (
            <tr key={book.bookId}>
                <td> {book.title} </td>
                <td> {book.author.authorName} </td>
                <td> {book.publisher.publisherName} </td>
                {this.props.userType==="librarian"&&<td> {this.countCopies(book.bookId)} </td>}
                {this.props.userType==="administrator"&&<td><button
                  onClick={() => this.handleUpdate(book.bookId)}
                  >Update</button></td>}
                {this.props.userType==="administrator"&&<td><button
                  onClick={() => BookActions.deleteBook(book.bookId)}
                  >Delete</button></td>}
                {this.props.userType==="borrower"&&<td><button
                  onClick={() => this.showBranches(book.bookId)}
                  >Find Books</button></td>}
                {this.props.userType==="librarian"&&<td><button
                  onClick={() => this.handleCopies(book.bookId)}
                  >Add Copies</button></td>}
            </tr>
        );
    }

    createBranchRow(branch){
      var branchExist = false;
      var i;
      for (i=0; i<this.props.copiesList.length; i++){
        if (this.props.copiesList[i].book.bookId == this.state.clickedBook && this.props.copiesList[i].branch.branchId == branch.branchId && this.props.copiesList[i].noOfCopies > 0) {
          branchExist = true;
        }
      }
      if (!branchExist){
        return null;
      }
      // skip branches that lack book
      return (
        <tr key={branch.branchId}>
          <td> {branch.branchName} </td>
          <td> {branch.branchAddress} </td>
          <td><button
            onClick={() => this.handleCheckOut(branch.branchId)}
            >Check Out</button></td>
        </tr>
      );
    }

    componentDidMount(){
        BookActions.readBooks();
        LibraryBranchActions.readBranches();
        BookCopiesActions.readCopies();
        BorrowerActions.readBorrowers();
    }

    render() {
      BookCopiesActions.readCopies();
      var myBranchName = "invalid_branch";
      var myBranchAddress = "invalid_branch";
      var myBorrowerName = "invalid_user";
      var i;
      for (i = 0; i < this.props.libraryBranchList.length; i++){
        if (this.props.libraryBranchList[i].branchId == this.props.userId){
          myBranchName = this.props.libraryBranchList[i].branchName;
          myBranchAddress = this.props.libraryBranchList[i].branchAddress;
        }
      }
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

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter values for new Book</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Title:
                      <input type="text" title={this.state.title} onChange={this.handleTitleChange} />
                    </label>
                    <label>
                      Author:
                      <input type="text" author={this.state.author} onChange={this.handleAuthorChange} />
                    </label>
                    <label>
                      Publisher:
                      <input type="text" publisher={this.state.publisher} onChange={this.handlePublisherChange} />
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

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter new values for this book</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit2}>
                    <label>
                      Title:
                      <input type="text" title={this.state.title} onChange={this.handleTitleChange} />
                    </label>
                    <label>
                      Author:
                      <input type="text" author={this.state.author} onChange={this.handleAuthorChange} />
                    </label>
                    <label>
                      Publisher:
                      <input type="text" publisher={this.state.publisher} onChange={this.handlePublisherChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </Modal>}
                {this.state.updateId == -2 && <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Branches with Book"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Branches with Book</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <table className="table">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Address</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.props.libraryBranchList.map(this.createBranchRow, this)}
                      </tbody>
                  </table>
                </Modal>}
                {this.state.updateId == -3 && <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Branch Update Modal"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter new info for your branch</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit3}>
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
                <h1>Books</h1>
                {this.props.userType === "borrower" && <h2>Browsing as {myBorrowerName}</h2>}
                {this.props.userType === "librarian" && <h2>at {myBranchName} in {myBranchAddress}</h2>}
                {this.props.userType==="librarian"&&<label>
                  Copies to add
                  <input type="number"
                    copies={this.state.noOfCopies}
                    onChange={this.handleCopiesChange}/>
                </label>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            {this.props.userType==="librarian"&&<th>Copies At Branch</th>}
                            {this.props.userType==="librarian"&&<th><button onClick={this.updateBranch}>Update Branch Details</button></th>}
                            {this.props.userType==="administrator" && <th><button onClick={this.handleAdd}>Add</button></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookList.map(this.createBookRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    borrowerList: PropTypes.array,
    copiesList: PropTypes.array,
    userType: PropTypes.string.isRequired,
    userId: PropTypes.number,
    libraryBranchList: PropTypes.array
};
