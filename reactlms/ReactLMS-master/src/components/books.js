"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {BookList} from '../components/BookList';

export class Books extends React.Component{

    render() {
        return(
            <div>
                <BookList
                  bookList = {this.props.bookList}
                  borrowerList = {this.props.borrowerList}
                  copiesList = {this.props.copiesList}
                  userType = {this.props.userType}
                  userId = {this.props.userId}
                  libraryBranchList = {this.props.libraryBranchList} />
            </div>
        );
    }
}

Books.propTypes = {
  bookList: PropTypes.array.isRequired,
  borrowerList: PropTypes.array,
  copiesList: PropTypes.array,
  userType: PropTypes.string.isRequired,
  userId: PropTypes.number,
  libraryBranchList: PropTypes.array
};
