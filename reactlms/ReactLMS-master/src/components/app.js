"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {Books} from './books.js';
import BookStore from '../stores/bookStore';
import {Publishers} from './publishers.js';
import PublisherStore from '../stores/publisherStore';
import {LibraryBranches} from './libraryBranches.js';
import LibraryBranchStore from '../stores/libraryBranchStore';
import {Borrowers} from './borrowers.js';
import BorrowerStore from '../stores/borrowerStore';
import {BookLoans} from './bookLoans.js';
import BookLoanStore from '../stores/bookLoanStore';
import BookCopiesStore from '../stores/bookCopiesStore';


export class App extends React.Component{

    constructor(props) {
        super(props);
        // alphabetize state vars
        this.state = {
            bookList:[],
            publisherList:[],
            libraryBranchList:[],
            borrowerList:[],
            loanList:[],
            copiesList:[],
            userType:"administrator",
            userId:-1
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    handleOptionChange(event){
      this.setState({userType: event.target.value});
    }

    handleIdChange(event){
      this.setState({userId: Number(event.target.value)});
    }

    render() {
        return(
            <div>
                <form>
                  <div className="text-right">
                    <label>
                      Enter your id number:
                      <input type="text"
                      userid={this.state.userId}
                      onChange={this.handleIdChange}/>
                    </label>
                    <label>
                      <input type="radio" value="administrator"
                      checked={this.state.userType==="administrator"}
                      onChange={this.handleOptionChange}/>
                      Admin
                    </label>
                    <label>
                      <input type="radio" value="borrower"
                      checked={this.state.userType==="borrower"}
                      onChange={this.handleOptionChange}/>
                      Borrower
                    </label>
                    <label>
                      <input type="radio" value="librarian"
                      checked={this.state.userType==="librarian"}
                      onChange={this.handleOptionChange}/>
                      Librarian
                    </label>
                  </div>
                </form>
                <Header userType={this.state.userType} userId={this.state.userId} />
                <Switch>
                    {/*In its own function*/}
                    <Route exact path='/' component={Home}/>
                    <Route path='/admin/books' render={(props) => (<Books {...props}
                      bookList={this.state.bookList}
                      borrowerList={this.state.borrowerList}
                      copiesList={this.state.copiesList}
                      libraryBranchList={this.state.libraryBranchList}
                      userType={this.state.userType} />)}/>
                    <Route path='/admin/publishers' render={(props) => (<Publishers {...props} publisherList={this.state.publisherList} />)}/>
                    <Route path='/admin/branches' render={(props) => (<LibraryBranches {...props}
                      libraryBranchList={this.state.libraryBranchList}
                      borrowerList={this.state.borrowerList}
                      userType={this.state.userType} />)}/>
                    <Route path='/admin/borrowers' render={(props) => (<Borrowers {...props}
                      borrowerList={this.state.borrowerList}
                      loanList={this.state.loanList}/>)}/>
                    <Route path='/borrower/books' render={(props) => (<Books {...props}
                      libraryBranchList={this.state.libraryBranchList}
                      borrowerList={this.state.borrowerList}
                      copiesList={this.state.copiesList}
                      userId={this.state.userId}
                      userType={this.state.userType}
                      bookList={this.state.bookList} />)}/>
                    <Route path='/borrower/branches' render={(props) => (<LibraryBranches {...props}
                      libraryBranchList={this.state.libraryBranchList}
                      borrowerList={this.state.borrowerList}
                      copiesList={this.state.copiesList}
                      userId={this.state.userId}
                      userType={this.state.userType}
                      bookList={this.state.bookList} />)}/>
                    <Route path='/borrower/loans' render={(props) => (<BookLoans {...props}
                        loanList={this.state.loanList}
                        borrowerList={this.state.borrowerList}
                        userId={this.state.userId} />)}/>
                    <Route path='/librarian/books' render={(props) => (<Books {...props}
                      bookList={this.state.bookList}
                      borrowerList={this.state.borrowerList}
                      copiesList={this.state.copiesList}
                      libraryBranchList={this.state.libraryBranchList}
                      userId={this.state.userId}
                      userType={this.state.userType} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        BorrowerStore.addChangeListener(this._onBorrowerChange.bind(this));
        PublisherStore.addChangeListener(this._onPublisherChange.bind(this));
        LibraryBranchStore.addChangeListener(this._onLibraryBranchChange.bind(this));
        BookLoanStore.addChangeListener(this._onLoansChange.bind(this));
        BookCopiesStore.addChangeListener(this._onCopiesChange.bind(this));
    }

    componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        BorrowerStore.removeChangeListener(this._onBorrowerChange.bind(this));
        PublisherStore.removeChangeListener(this._onPublisherChange.bind(this));
        LibraryBranchStore.removeChangeListener(this._onLibraryBranchChange.bind(this));
        BookLoanStore.removeChangeListener(this._onLoansChange.bind(this));
        BookCopiesStore.removeChangeListener(this._onCopiesChange.bind(this));
    }

    _onBookChange(){
        this.setState({bookList: BookStore.getAllBooks()});
    }

    _onBorrowerChange(){
        this.setState({borrowerList: BorrowerStore.getAllBorrowers()});
    }

    _onPublisherChange(){
        this.setState({publisherList: PublisherStore.getAllPublishers()});
    }

    _onLibraryBranchChange(){
        this.setState({libraryBranchList: LibraryBranchStore.getAllBranches()});
    }

    _onLoansChange(){
      this.setState({loanList: BookLoanStore.getAllLoans()});
    }

    _onCopiesChange(){
      this.setState({copiesList: BookCopiesStore.getAllBookCopies()});
    }
}
