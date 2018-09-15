"use strict";

import Axios from 'axios'
/*var books = require('./bookModel').books;

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); // pass by value
};*/

var BookApi = {
	addBook: function(book) {
		return Axios.post("http://localhost:8761/administrator/book", book)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	getAllBooks: function() {
		return Axios.get("http://localhost:8761/administrator/books")
    .then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	updateBook: function(id, book) {
		return Axios.put("http://localhost:8761/administrator/book/"+id, book)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	deleteBook: function(id) {
    Axios.delete("http://localhost:8761/administrator/book/"+id)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},
};

module.exports = BookApi;
