"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {BookLoanList} from '../components/BookLoanList';

export class BookLoans extends React.Component{

    render() {
        return(
            <div>
                <BookLoanList
                  loanList = {this.props.loanList}
                  borrowerList = {this.props.borrowerList}
                  userId = {this.props.userId} />
            </div>
        );
    }
}

BookLoans.propTypes = {
  loanList: PropTypes.array.isRequired,
  borrowerList: PropTypes.array,
  userId: PropTypes.number.isRequired
};
