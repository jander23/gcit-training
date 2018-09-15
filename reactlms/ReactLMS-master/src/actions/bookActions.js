
import BookApi from '../api/bookApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Books

const BooksActions = {
    addBook: function(book){
      BookApi.addBook(book)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'add_book',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    readBooks: () => {
      BookApi.getAllBooks()
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'read_books',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    updateBook: function(id, book){
      BookApi.updateBook(id, book)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_book',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    deleteBook: function(id){
      BookApi.deleteBook(id);
        Dispatcher.dispatch({
          actionType: 'delete_book',
          data: id,
        });
    }
}

module.exports = BooksActions;
