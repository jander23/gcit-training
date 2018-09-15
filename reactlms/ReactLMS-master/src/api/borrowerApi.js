"use strict";

import axios from 'axios'

var BorrowerApi = {
	addBorrower: function(borrower) {
		return axios.post('http://localhost:8761/administrator/borrower', borrower)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	getAllBorrowers: function() {
		return axios.get('http://localhost:8761/administrator/borrowers')
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	updateBorrower: function(id, borrower) {
		return axios.put('http://localhost:8761/administrator/borrower/'+id, borrower)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	deleteBorrower: function(id) {
		return axios.delete('http://localhost:8761/administrator/borrower/'+id)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	}
};

module.exports = BorrowerApi;
