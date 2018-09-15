"use strict";

import axios from 'axios'

var PublisherApi = {
	addPublisher: function(publisher) {
		return axios.post('http://localhost:8761/administrator/publisher', publisher)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	getAllPublishers: function() {
		return axios.get('http://localhost:8761/administrator/publishers')
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	updatePublisher: function(id, publisher) {
		return axios.put('http://localhost:8761/administrator/publisher/'+id, publisher)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	deletePublisher: function(id) {
		return axios.delete('http://localhost:8761/administrator/publisher/'+id)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},
};

module.exports = PublisherApi;
