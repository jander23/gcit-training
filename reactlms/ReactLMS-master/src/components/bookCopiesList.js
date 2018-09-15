"use strict"

import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import BookCopiesActions from '../actions/bookCopiesActions';

Modal.setAppElement('#app')

export class BookLoanList extends React.Component{

    createCopiesRow(copies){
        return (
            <tr key={copies.book.bookId, copies.branch.branchId}>
                <td> {copies.book.title} </td>
                <td> {copies.branch.branchName} </td>
            </tr>
        );
    }

    componentDidMount(){
        BookCopiesActions.readCopies(this.props.userId);
    }

    render() {
        return(
            <div>
                <h1>My Loans</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.copiesList.map(this.createCopiesRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

BookLoanList.propTypes = {
    copiesList: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired
};
