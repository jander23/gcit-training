"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {BookCopiesList} from '../components/BookCopiesList';

export class BookCopies extends React.Component{

    render() {
        return(
            <div>
                <BookCopiesList
                  copiesList = {this.props.copiesList}
                  userId = {this.props.userId} />
            </div>
        );
    }
}

BookCopies.propTypes = {
  copiesList: PropTypes.array.isRequired,
  userId: PropTypes.number
};
