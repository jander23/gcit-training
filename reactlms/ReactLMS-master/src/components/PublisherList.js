"use strict"

import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import PublisherActions from '../actions/publisherActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app')

export class PublisherList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      modalIsOpen: false,
      updateId: -1,
      publisherName: "",
      publisherAddress: "",
      publisherPhone: ""};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleNameChange(event) {
    this.setState({publisherName: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({publisherAddress: event.target.value});
  }

  handlePhoneChange(event) {
    this.setState({publisherPhone: event.target.value});
  }

  handleUpdate(id){
    this.setState({updateId: id});
    this.openModal();
  }

  handleAdd(){
    this.setState({updateId: -1});
    this.openModal();
  }

  handleSubmit(event) {
    var input = {
      "publisherName":this.state.publisherName,
      "publisherAddress":this.state.publisherAddress,
      "publisherPhone":this.state.publisherPhone
    };
    PublisherActions.addPublisher(input);
    event.preventDefault();
    this.closeModal();
  }

  handleSubmit2(event) {
    var input = {
      "publisherName":this.state.publisherName,
      "publisherAddress":this.state.publisherAddress,
      "publisherPhone":this.state.publisherPhone
    };
    PublisherActions.updatePublisher(this.state.updateId, input);
    event.preventDefault();
    this.closeModal();
  }

    createPublisherRow(publisher){
        if (publisher.publisherId == 0){
          return null;
        }
        return (
            <tr key={publisher.publisherId}>
                <td> {publisher.publisherName} </td>
                <td> {publisher.publisherAddress} </td>
                <td> {publisher.publisherPhone} </td>
                <td><button
                  onClick={() => this.handleUpdate(publisher.publisherId)}
                  >Update</button></td>
                <td><button
                  onClick={() => PublisherActions.deletePublisher(publisher.publisherId)}
                  >Delete</button></td>
            </tr>
        );
    }

    componentDidMount(){
        PublisherActions.readPublishers();
    }

    render() {
        return(
            <div>
                {this.state.updateId == -1 && <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Add Modal"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter values for new Publisher</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Publisher Name:
                      <input type="text" name={this.state.publisherName} onChange={this.handleNameChange} />
                    </label>
                    <label>
                      Publisher Address:
                      <input type="text" address={this.state.publisherAddress} onChange={this.handleAddressChange} />
                    </label>
                    <label>
                      Publisher Phone:
                      <input type="text" phone={this.state.publisherPhone} onChange={this.handlePhoneChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </Modal>}
                {this.state.updateId != -1 && <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Update Modal"
                >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Please enter new values for this publisher</h2>
                  <button onClick={this.closeModal}>Cancel</button>
                  <form onSubmit={this.handleSubmit2}>
                    <label>
                      Publisher Name:
                      <input type="text" name={this.state.publisherName} onChange={this.handleNameChange} />
                    </label>
                    <label>
                      Publisher Address:
                      <input type="text" address={this.state.publisherAddress} onChange={this.handleAddressChange} />
                    </label>
                    <label>
                      Publisher Phone:
                      <input type="text" phone={this.state.publisherPhone} onChange={this.handlePhoneChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </Modal>}
                <h1>Publishers</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th><button
                            onClick={this.handleAdd}>Add</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.publisherList.map(this.createPublisherRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

PublisherList.propTypes = {
    publisherList: PropTypes.array.isRequired
};
