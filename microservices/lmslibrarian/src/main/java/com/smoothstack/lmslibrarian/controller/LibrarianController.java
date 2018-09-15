package com.smoothstack.lmslibrarian.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.smoothstack.lmslibrarian.dao.BookCopiesDao;
import com.smoothstack.lmslibrarian.dao.BookDao;
import com.smoothstack.lmslibrarian.dao.LibraryBranchDao;
import com.smoothstack.lmslibrarian.exception.ResourceNotFoundException;
import com.smoothstack.lmslibrarian.model.Book;
import com.smoothstack.lmslibrarian.model.BookCopies;
import com.smoothstack.lmslibrarian.model.LibraryBranch;

@RestController
@CrossOrigin
public class LibrarianController {
	@Autowired
	BookCopiesDao bcdao;
	@Autowired
	LibraryBranchDao lbdao;
	@Autowired
	BookDao bdao;
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches",method=RequestMethod.GET)
	public List<LibraryBranch> getBranches(){
		return lbdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/books",method=RequestMethod.GET)
	public List<Book> getBooks(){
		return bdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches/{branchId}/books",method=RequestMethod.GET)
	public List<BookCopies> getBooksAtBranch(@PathVariable("branchId") Integer branchId){
		return bcdao.findByBookCopiesIdBranchId(branchId);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches/{branchId}/books/{bookId}",method=RequestMethod.GET)
	public Integer getCopiesOfBookAtBranch(@PathVariable("branchId") Integer branchId, @PathVariable("bookId") Integer bookId) {
		Optional<BookCopies> obc = bcdao.findByBookCopiesId(bookId, branchId);
		if (obc.isPresent()) {
			return obc.get().getNoOfCopies();
		}
		else {
			return 0;
		}
	}
	
	// TODO: how can I make this return different codes depending whether it creates or updates?
	@ResponseStatus(HttpStatus.CREATED)
	@RequestMapping(path="/branches/{branchId}/books/{bookId}/copies/{noOfCopies}",method=RequestMethod.POST)
	public BookCopies addBooks(@PathVariable("bookId") Integer bookId, @PathVariable("branchId") Integer branchId, @PathVariable("noOfCopies") Integer noOfCopies) {
		// first check that the book and branch exist	
		Optional<Book> b = bdao.findById(bookId);
		Optional<LibraryBranch> lb = lbdao.findById(branchId);
		if (!b.isPresent() || !lb.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("The book or branch do not exist");
		}
		else {
			// next check if a bookcopies entry already exists
			Optional<BookCopies> bc = bcdao.findByBookCopiesId(bookId, branchId);
			if (!bc.isPresent()) {
				// branch did not have that book, add new entry
				BookCopies copies = new BookCopies(noOfCopies,b.get(),lb.get());
				return bcdao.save(copies);
			}
			else {
				// update existing entry by increasing how many copies it has
				BookCopies copies = bc.get();
				copies.setNoOfCopies(copies.getNoOfCopies()+noOfCopies);
				return bcdao.save(copies);
			}
		}
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches/{branchId}",method=RequestMethod.PUT)
	public LibraryBranch updateBranch(@PathVariable("branchId") Integer branchId, @RequestBody LibraryBranch branch) {
		Optional<LibraryBranch> lb = lbdao.findById(branchId);
		if(!lb.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No branch exists at ID "+branchId);
		}
		LibraryBranch bornch = lb.get();
		bornch.setBranchName(branch.getBranchName());
		bornch.setBranchAddress(branch.getBranchAddress());
		return lbdao.save(bornch);
	}
}
