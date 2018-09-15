import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _borrowerStore = {
  borrowers: []
};

class BorrowerStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBorrowers(){
        return _borrowerStore.borrowers;
    }

}

const BorrowerStore = new BorrowerStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_borrowers':
            _borrowerStore.borrowers = action.data;
            BorrowerStore.emitChange();
            break;
        case 'add_borrower':
            _borrowerStore.borrowers = _borrowerStore.borrowers.concat([action.data]);
            BorrowerStore.emitChange();
            break;
        case 'update_borrower':
            var i;
            for (i = 0; i < _borrowerStore.borrowers.length; i++) {
              if (_borrowerStore.borrowers[i].cardNo == action.data.cardNo){
                _borrowerStore.borrowers[i] = action.data;
              }
            }
            BorrowerStore.emitChange();
            break;
        case 'delete_borrower':
            for (i = 0; i < _borrowerStore.borrowers.length; i++) {
              if (_borrowerStore.borrowers[i].cardNo === action.data){
                _borrowerStore.borrowers.splice(i, 1);
              }
            }
            BorrowerStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BorrowerStore;
