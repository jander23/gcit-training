
import BookLoanApi from '../api/bookLoanApi';
import Dispatcher from '../dispatcher/appDispatcher';

const BookLoansActions = {
    addBookLoan: function(borrower, book, branch){
      BookLoanApi.checkOut(borrower, book, branch)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'add_loan',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    readLoans: function(borrower){
      BookLoanApi.getAllLoans(borrower)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'read_loans',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    updateLoan: function(borrower, book, date){
      BookLoanApi.overrideLoan(borrower, book, date)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_loan',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    deleteBookLoan: function(book, borrower){
      BookLoanApi.returnBook(book, borrower);
      Dispatcher.dispatch({
        actionType: 'delete_loan',
        data: book,
        data2: borrower
      });
    }
}

module.exports = BookLoansActions;
