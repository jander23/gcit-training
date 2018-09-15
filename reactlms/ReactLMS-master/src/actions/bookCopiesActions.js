import BookCopiesApi from '../api/bookCopiesApi';
import Dispatcher from '../dispatcher/appDispatcher';

const BookCopiesActions = {

    readCopies: function(){
      BookCopiesApi.getAllCopies()
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'read_copies',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    findCopies: function(branchId, bookId){
      BookCopiesApi.getCopiesHere(branchId, bookId)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'find_copies',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    addCopies: function(bookId, branchId, copies){
      BookCopiesApi.addCopies(bookId, branchId, copies)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_copies',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    }
}

module.exports = BookCopiesActions;
