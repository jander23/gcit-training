"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {BorrowerList} from '../components/BorrowerList';

export class Borrowers extends React.Component{

    render() {
        return(
            <div>
                <BorrowerList
                  borrowerList = {this.props.borrowerList}
                  loanList = {this.props.loanList} />
            </div>
        );
    }
}

Borrowers.propTypes = {
    borrowerList: PropTypes.array.isRequired,
    loanList: PropTypes.array
};
