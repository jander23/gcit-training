"use strict";

import axios from 'axios'

var BookCopiesApi = {
	getAllCopies: function() {
		return axios.get('http://localhost:8761/administrator/copies')
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

  getCopiesHere: function(branchId, bookId) {
		return axios.get('http://localhost:8761/librarian/branches/'+branchId+'/books/'+bookId)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	addCopies: function(bookId, branchId, copies) {
		return axios.post('http://localhost:8761/librarian/branches/'+branchId+'/books/'+bookId+'/copies/'+copies)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	}
};

module.exports = BookCopiesApi;
