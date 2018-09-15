"use strict";

import axios from 'axios'

var LibraryBranchApi = {
	addBranch: function(branch) {
		return axios.post('http://localhost:8761/administrator/branch', branch)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	getAllBranches: function() {
		return axios.get('http://localhost:8761/administrator/branches')
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	updateBranch: function(id, branch) {
		return axios.put('http://localhost:8761/administrator/branch/'+id, branch)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},

	deleteBranch: function(id) {
		return axios.delete('http://localhost:8761/administrator/branch/'+id)
		.then(response => response.data)
    .catch(function(error){
			var err = error.data;
			return err;
		});
	},
};

module.exports = LibraryBranchApi;
