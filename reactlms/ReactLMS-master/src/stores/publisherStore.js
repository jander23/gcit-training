import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _publisherStore = {
  publishers: []
};

class PublisherStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllPublishers(){
        return _publisherStore.publishers;
    }

}

const PublisherStore = new PublisherStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_publishers':
            _publisherStore.publishers = action.data;
            PublisherStore.emitChange();
            break;
        case 'add_publisher':
            _publisherStore.publishers = _publisherStore.publishers.concat([action.data]);
            PublisherStore.emitChange();
            break;
        case 'update_publisher':
            var i;
            for (i = 0; i < _publisherStore.publishers.length; i++) {
              if (_publisherStore.publishers[i].publisherId == action.data.publisherId){
                _publisherStore.publishers[i] = action.data;
              }
            }
            PublisherStore.emitChange();
            break;
        case 'delete_publisher':
            for (i = 0; i < _publisherStore.publishers.length; i++) {
              if (_publisherStore.publishers[i].publisherId == action.data){
                _publisherStore.publishers.splice(i, 1);
              }
            }
            PublisherStore.emitChange();
            break;
        default:
            return;
    }
} );

export default PublisherStore;
