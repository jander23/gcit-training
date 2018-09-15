"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export class Header extends React.Component{
  // TODO: use a switch case to change this depending on user type
  // current default is admin

    render() {
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img width="90px" height="30px" src="images/logo.png" />
                    </Link>
                    {this.props.userType === "administrator" && <ul className="nav navbar-nav">
                        <li><Link to="/" replace>Home</Link></li>
                        <li><Link to="/admin/books" replace>Books</Link></li>
                        <li><Link to="/admin/publishers" replace>Publishers</Link></li>
                        <li><Link to="/admin/branches" replace>Library Branches</Link></li>
                        <li><Link to="/admin/borrowers" replace>Borrowers</Link></li>
                    </ul>}
                    {this.props.userType === "librarian" && <ul className="nav navbar-nav">
                        <li><Link to="/" replace>Home</Link></li>
                        <li><Link to="/librarian/books" replace>Books</Link></li>
                    </ul>}
                    {this.props.userType === "borrower" && <ul className="nav navbar-nav">
                        <li><Link to="/" replace>Home</Link></li>
                        <li><Link to="/borrower/books" replace>Books</Link></li>
                        <li><Link to="/borrower/branches" replace>Library Branches</Link></li>
                        <li><Link to="/borrower/loans" replace>My Loans</Link></li>
                    </ul>}
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    userType: PropTypes.string.isRequired,
    userId: PropTypes.number
};
