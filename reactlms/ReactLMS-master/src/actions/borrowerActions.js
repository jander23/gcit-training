
import BorrowerApi from '../api/borrowerApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Books

const BorrowersActions = {
    addBorrower: function(borrower){
      BorrowerApi.addBorrower(borrower)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'add_borrower',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    readBorrowers: () => {
      BorrowerApi.getAllBorrowers()
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'read_borrowers',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    updateBorrower: function(id, borrower){
      BorrowerApi.updateBorrower(id, borrower)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_borrower',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    deleteBorrower: function(id){
      BorrowerApi.deleteBorrower(id);
      Dispatcher.dispatch({
        actionType: 'delete_borrower',
        data: id
      });
    }
}

module.exports = BorrowersActions;
