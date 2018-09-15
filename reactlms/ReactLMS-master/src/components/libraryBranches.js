"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {LibraryBranchList} from '../components/LibraryBranchList';

export class LibraryBranches extends React.Component{

    render() {
        return(
            <div>
                <LibraryBranchList
                  libraryBranchList = {this.props.libraryBranchList}
                  borrowerList = {this.props.borrowerList}
                  copiesList = {this.props.copiesList}
                  bookList = {this.props.bookList}
                  userType = {this.props.userType}
                  userId = {this.props.userId} />
            </div>
        );
    }
}

LibraryBranches.propTypes = {
    libraryBranchList: PropTypes.array.isRequired,
    borrowerList: PropTypes.array,
    copiesList: PropTypes.array,
    bookList: PropTypes.array,
    userType: PropTypes.string.isRequired,
    userId: PropTypes.number
};
