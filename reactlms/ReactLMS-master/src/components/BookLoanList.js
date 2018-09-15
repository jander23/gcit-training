"use strict"

import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import BookLoanActions from '../actions/bookLoanActions';
import BorrowerActions from '../actions/borrowerActions';

Modal.setAppElement('#app')

export class BookLoanList extends React.Component{

    createLoanRow(loan){
        return (
            <tr key={[loan.book.bookId, loan.borrower.cardNo]}>
                <td> {loan.book.title} </td>
                <td> {loan.dueDate} </td>
                <td><button
                  onClick={() => BookLoanActions.deleteBookLoan(loan.book.bookId, loan.borrower.cardNo)}
                  >Return</button></td>
            </tr>
        );
    }

    componentDidMount(){
        BookLoanActions.readLoans(this.props.userId);
        BorrowerActions.readBorrowers();
    }

    render() {
      var i;
      var myBorrowerName = "nobody";
      for (i = 0; i < this.props.borrowerList.length; i++){
        if (this.props.borrowerList[i].cardNo == this.props.userId){
          myBorrowerName = this.props.borrowerList[i].name;
        }
      }
        return(
            <div>
                <h1>My Loans</h1>
                <h2>Browsing as {myBorrowerName}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>DueDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.loanList.map(this.createLoanRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

BookLoanList.propTypes = {
    loanList: PropTypes.array.isRequired,
    borrowerList: PropTypes.array,
    userId: PropTypes.number.isRequired
};
