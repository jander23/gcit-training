import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _bookCopiesStore = {
  copies: []
};

class BookCopiesStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBookCopies(){
        return _bookCopiesStore.copies;
    }

}

const BookCopiesStore = new BookCopiesStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_copies':
            _bookCopiesStore.copies = action.data;
            BookCopiesStore.emitChange();
            break;
        case 'find_copies':
            BookCopiesStore.emitChange();
            break;
        case 'update_copies':
            var i;
            for (i = 0; i < _bookCopiesStore.copies.length; i++) {
              if (_bookCopiesStore.copies[i].book.bookId == action.data.book.bookId && _bookCopiesStore.copies[i].branch.branchId == action.data.branch.branchId){
                _bookCopiesStore.copies[i] = action.data;
              }
            }
            BookCopiesStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookCopiesStore;
