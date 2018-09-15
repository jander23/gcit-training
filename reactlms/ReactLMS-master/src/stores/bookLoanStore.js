import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _bookLoanStore = {
  loans: []
};

class BookLoanStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllLoans(){
        return _bookLoanStore.loans;
    }

}

const BookLoanStore = new BookLoanStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_loans':
            _bookLoanStore.loans = action.data;
            BookLoanStore.emitChange();
            break;
        case 'add_loan':
            _bookLoanStore.loans = _bookLoanStore.loans.concat([action.data]);
            BookLoanStore.emitChange();
            break;
        case 'update_loan':
            var i;
            for (i = 0; i < _bookLoanStore.loans.length; i++) {
              if (_bookLoanStore.loans[i].book.bookId == action.data.book.bookId && _bookLoanStore.loans[i].borrower.cardNo == action.data.borrower.cardNo){
                _bookLoanStore.loans[i] = action.data;
              }
            }
            BookLoanStore.emitChange();
            break;
        case 'delete_loan':
            for (i = 0; i < _bookLoanStore.loans.length; i++) {
              if (_bookLoanStore.loans[i].book.bookId == action.data && _bookLoanStore.loans[i].borrower.cardNo == action.data2){
                _bookLoanStore.loans.splice(i, 1);
              }
            }
            BookLoanStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookLoanStore;
