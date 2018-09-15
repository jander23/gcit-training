import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _bookStore = {
  books: []
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.books;
    }

}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_books':
            _bookStore.books = action.data;
            BookStore.emitChange();
            break;
        case 'add_book':
            _bookStore.books = _bookStore.books.concat([action.data]);
            BookStore.emitChange();
            break;
        case 'update_book':
            var i;
            for (i = 0; i < _bookStore.books.length; i++) {
              if (_bookStore.books[i].bookId == action.data.bookId){
                _bookStore.books[i] = action.data;
              }
              if (_bookStore.books[i].author.authorId == action.data.author.authorId){
                _bookStore.books[i].author = action.data.author;
              }
            }
            BookStore.emitChange();
            break;
        case 'delete_book':
            for (i = 0; i < _bookStore.books.length; i++) {
              if (_bookStore.books[i].bookId == action.data){
                _bookStore.books.splice(i, 1);
              }
            }
            BookStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookStore;
