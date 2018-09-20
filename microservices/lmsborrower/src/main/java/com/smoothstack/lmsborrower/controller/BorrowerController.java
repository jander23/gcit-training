package com.smoothstack.lmsborrower.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.smoothstack.lmsborrower.dao.BookCopiesDao;
import com.smoothstack.lmsborrower.dao.BookDao;
import com.smoothstack.lmsborrower.dao.BookLoanDao;
import com.smoothstack.lmsborrower.dao.BorrowerDao;
import com.smoothstack.lmsborrower.dao.LibraryBranchDao;
import com.smoothstack.lmsborrower.exception.ResourceNotFoundException;
import com.smoothstack.lmsborrower.model.Book;
import com.smoothstack.lmsborrower.model.BookCopies;
import com.smoothstack.lmsborrower.model.BookLoan;
import com.smoothstack.lmsborrower.model.Borrower;
import com.smoothstack.lmsborrower.model.LibraryBranch;

@RestController
@CrossOrigin
@RequestMapping(path="/borrower")
public class BorrowerController {
	@Autowired
	private BookLoanDao bldao;
	@Autowired
	private BookCopiesDao bcdao;
	@Autowired
	private BookDao bdao;
	@Autowired
	private LibraryBranchDao lbdao;
	@Autowired
	private BorrowerDao bdao2;
	
	// TODO: need book copies by branch, and branches by "has copy of book"
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches",method=RequestMethod.GET)
	public List<LibraryBranch> getBranches(){
		return lbdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/{cardNo}/loans",method=RequestMethod.GET)
	public List<BookLoan> getLoans(@PathVariable("cardNo") Integer cardNo){
		List<BookLoan> myLoans;
		myLoans = bldao.findByBookLoanIdCardNo(cardNo);
		return myLoans;
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches/{branchId}/books",method=RequestMethod.GET)
	public List<BookCopies> getCopies(@PathVariable("branchId") Integer branchId){
		List<BookCopies> copies;
		copies = bcdao.findByBookCopiesIdBranchId(branchId);
		return copies;
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@RequestMapping(path="/{cardNo}/books/{bookId}/branches/{branchId}",method=RequestMethod.POST)
	public BookLoan checkOutBook(@PathVariable("cardNo") Integer cardNo, @PathVariable("branchId") Integer branchId, @PathVariable("bookId") Integer bookId) {
		Optional<BookCopies> copies = bcdao.findByBookCopiesId(bookId, branchId);
		List<BookLoan> loans = bldao.findAllByBookLoanIdBranchIdBookId(bookId, branchId);
		// return null if book doesn't exist, or all copies loaned out
		if (!copies.isPresent() || copies.get().getNoOfCopies() == loans.size()){
			// book not available at this branch, return error 404
			throw new ResourceNotFoundException("Book with id "+bookId+" is not present at branch with id "+branchId);
		}
		// this can all be assumed to work, if copies returned and the borrower could log in
		Book b = bdao.findById(bookId).get();
		LibraryBranch lb = lbdao.findById(branchId).get();
		Borrower b2 = bdao2.findById(cardNo).get();
		BookLoan bl = new BookLoan(b,lb,b2);
		return bldao.save(bl);
	}
	
	@RequestMapping(path="/{cardNo}/books/{bookId}",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void returnBook(@PathVariable("cardNo") Integer cardNo, @PathVariable("bookId") Integer bookId) {
		Optional<BookLoan> bl = bldao.findByBookLoanId(bookId, cardNo);
		if (!bl.isPresent()) {
			// error 404, book loan doesn't exist
			throw new ResourceNotFoundException("User with card "+cardNo+" has not borrowed book with id "+bookId);
		}
		bldao.deleteByBookLoanId(bookId, cardNo);
	}
}
