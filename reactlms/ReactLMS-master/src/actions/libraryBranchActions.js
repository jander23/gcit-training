
import LibraryBranchApi from '../api/libraryBranchApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Books

const LibraryBranchesActions = {
    addBranch: function(branch){
      LibraryBranchApi.addBranch(branch)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'add_branch',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    readBranches: function(){
      LibraryBranchApi.getAllBranches()
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'read_branches',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    updateBranch: function(id, branch){
      LibraryBranchApi.updateBranch(id, branch)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_branch',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    deleteBranch: function(id){
      LibraryBranchApi.deleteBranch(id);
        Dispatcher.dispatch({
          actionType: 'delete_branch',
          data: id
        });
    }
}

module.exports = LibraryBranchesActions;
