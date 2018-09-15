
import PublisherApi from '../api/publisherApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Books

const PublishersActions = {
    addPublisher: function(publisher){
      PublisherApi.addPublisher(publisher)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'add_publisher',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    readPublishers: function(){
      PublisherApi.getAllPublishers()
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'read_publishers',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    updatePublisher: function(id, publisher){
      PublisherApi.updatePublisher(id, publisher)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_publisher',
          data: res
        });
      })
      .catch(err => {
        return err;
      })
    },

    deletePublisher: function(id){
      PublisherApi.deletePublisher(id);
        Dispatcher.dispatch({
          actionType: 'delete_publisher',
          data: id
        });
    }
}

module.exports = PublishersActions;
