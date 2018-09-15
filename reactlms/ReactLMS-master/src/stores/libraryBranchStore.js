import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _libraryBranchStore = {
  branches: []
};

class LibraryBranchStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBranches(){
        return _libraryBranchStore.branches;
    }

}

const LibraryBranchStore = new LibraryBranchStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_branches':
            _libraryBranchStore.branches = action.data;
            LibraryBranchStore.emitChange();
            break;
        case 'add_branch':
            _libraryBranchStore.branches = _libraryBranchStore.branches.concat([action.data]);
            LibraryBranchStore.emitChange();
            break;
        case 'update_branch':
            var i;
            for (i = 0; i < _libraryBranchStore.branches.length; i++) {
              if (_libraryBranchStore.branches[i].branchId == action.data.branchId){
                _libraryBranchStore.branches[i] = action.data;
              }
            }
            LibraryBranchStore.emitChange();
            break;
        case 'delete_branch':
            for (i = 0; i < _libraryBranchStore.branches.length; i++) {
              if (_libraryBranchStore.branches[i].branchId == action.data){
                _libraryBranchStore.branches.splice(i, 1);
              }
            }
            LibraryBranchStore.emitChange();
            break;
        default:
            return;
    }
} );

export default LibraryBranchStore;
