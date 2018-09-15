"use strict";

import axios from 'axios'

var BookLoanApi = {
	checkOut: function(borrower, book, branch) {
		return axios.post('http://localhost:8761/borrower/'+borrower+'/books/'+book+'/branches/'+branch)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	getAllLoans: function(borrower) {
		return axios.get('http://localhost:8761/borrower/'+borrower+'/loans')
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	overrideLoan: function(borrower, book, date) {
		return axios.put('http://localhost:8761/administrator/borrower/'+borrower+'/book/'+book+'/days/'+date)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	returnBook: function(book, borrower) {
		return axios.delete('http://localhost:8761/borrower/'+borrower+'/books/'+book)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	}
};

module.exports = BookLoanApi;
