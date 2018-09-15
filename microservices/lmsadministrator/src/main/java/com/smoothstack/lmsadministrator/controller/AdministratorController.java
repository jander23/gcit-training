package com.smoothstack.lmsadministrator.controller;

import java.sql.Date;
import java.util.Calendar;
import java.util.GregorianCalendar;
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

import com.smoothstack.lmsadministrator.dao.AuthorDao;
import com.smoothstack.lmsadministrator.dao.BookCopiesDao;
import com.smoothstack.lmsadministrator.dao.BookDao;
import com.smoothstack.lmsadministrator.dao.BookLoanDao;
import com.smoothstack.lmsadministrator.dao.BorrowerDao;
import com.smoothstack.lmsadministrator.dao.LibraryBranchDao;
import com.smoothstack.lmsadministrator.dao.PublisherDao;
import com.smoothstack.lmsadministrator.exception.ForbiddenException;
import com.smoothstack.lmsadministrator.exception.ResourceNotFoundException;
import com.smoothstack.lmsadministrator.model.Author;
import com.smoothstack.lmsadministrator.model.Book;
import com.smoothstack.lmsadministrator.model.BookCopies;
import com.smoothstack.lmsadministrator.model.BookLoan;
import com.smoothstack.lmsadministrator.model.Borrower;
import com.smoothstack.lmsadministrator.model.LibraryBranch;
import com.smoothstack.lmsadministrator.model.Publisher;

@RestController
@CrossOrigin
public class AdministratorController {
	@Autowired
	private BookDao bdao;
	@Autowired
	private AuthorDao adao;
	@Autowired
	private PublisherDao pdao;
	@Autowired
	private LibraryBranchDao lbdao;
	@Autowired
	private BorrowerDao bdao2;
	@Autowired
	private BookLoanDao bldao;
	@Autowired
	private BookCopiesDao bcdao;
	
	// TODO: The following print-all methods should be ~PAGINATED~!!! probably
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/borrowers",method=RequestMethod.GET)
	public List<Borrower> getBorrowers(){
		return bdao2.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/publishers",method=RequestMethod.GET)
	public List<Publisher> getPublishers(){
		return pdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/books",method=RequestMethod.GET)
	public List<Book> getBooks(){
		return bdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/authors",method=RequestMethod.GET)
	public List<Author> getAuthors(){
		return adao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branches",method=RequestMethod.GET)
	public List<LibraryBranch> getBranches(){
		return lbdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/loans",method=RequestMethod.GET)
	public List<BookLoan> getLoans(){
		return bldao.findAll();
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/copies",method=RequestMethod.GET)
	public List<BookCopies> getCopies(){
		return bcdao.findAll();
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@RequestMapping(path="/book",method=RequestMethod.POST)
	public Book addBookAndAuthor(@RequestBody Book book) {
		List<Book> b = bdao.findAllByTitleAuthorNamePublisherName(book.getTitle(),book.getAuthor().getAuthorName(),book.getPublisher().getPublisherName());
		if (!b.isEmpty()) {
			// error 405, book already exists
			throw new ForbiddenException(book.getTitle()+" is already in the database");
		}
		List<Publisher> p = pdao.findAllByPublisherName(book.getPublisher().getPublisherName());
		if (p.isEmpty()) {
			// error 404, publisher not available
			throw new ResourceNotFoundException(book.getPublisher().getPublisherName()+" does not exist in the database, add that first");
		}
		book.setPublisher(p.get(0));
		List<Author> a = adao.findAllByAuthorName(book.getAuthor().getAuthorName());
		if (a.isEmpty()) {
			// Add new author, then new book
			Author auth = book.getAuthor();
			auth = adao.save(auth);
			return bdao.save(book);
		}
		// Add new book only
		book.setAuthor(a.get(0));
		return bdao.save(book);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/book/{bookId}",method=RequestMethod.PUT)
	public Book updateBookAndAuthor(@PathVariable("bookId") Integer bookId, @RequestBody Book book) {
		List<Publisher> p = pdao.findAllByPublisherName(book.getPublisher().getPublisherName());
		if (p.isEmpty()) {
			// error 404 no valid publisher entry
			throw new ResourceNotFoundException(book.getPublisher().getPublisherName()+" is not found in the database");
		}
		else {
			Optional<Book> b = bdao.findById(bookId);
			if (!b.isPresent()) {
				// 404
				throw new ResourceNotFoundException("No book found at ID "+bookId);
			}
			Book b2 = b.get();
			Author a = b2.getAuthor();
			a.setAuthorName(book.getAuthor().getAuthorName());
			a = adao.save(a);
			b2.setTitle(book.getTitle());
			b2.setAuthor(a);
			b2.setPublisher(p.get(0));
			return bdao.save(b2);
		}
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@RequestMapping(path="/book/{bookId}",method=RequestMethod.DELETE)
	public void deleteBookAndAuthor(@PathVariable("bookId") Integer bookId) {
		if (bookId == 0) {
			// error 405
			throw new ForbiddenException("Can't delete item at index 0");
		}
		Optional<Book> b = bdao.findById(bookId);
		if (!b.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No book exists at ID "+bookId);
		}
		Publisher p = b.get().getPublisher();
		Author a = b.get().getAuthor();
		bdao.deleteById(bookId);
		// if no books under publisher/author, cascade delete to those too
		List<Book> a2 = bdao.findAllByAuthor(a);
		List<Book> p2 = bdao.findAllByPublisher(p);
		if (a2.isEmpty()) {
			adao.deleteById(a.getAuthorId());
		}
		if (p2.isEmpty()) {
			pdao.deleteById(p.getPublisherId());
		}
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@RequestMapping(path="/publisher",method=RequestMethod.POST)
	public Publisher addPublisher(@RequestBody Publisher pub) {
		List<Publisher> p = pdao.findAllByPublisherName(pub.getPublisherName());
		if (!p.isEmpty()) {
			// error 405, publisher already exists
			throw new ForbiddenException(pub.getPublisherName()+" already exists");
		}
		return pdao.save(pub);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/publisher/{publisherId}",method=RequestMethod.PUT)
	public Publisher updatePublisher(@PathVariable("publisherId") Integer publisherId, @RequestBody Publisher publisher) {
		Optional<Publisher> p = pdao.findById(publisherId);
		if(!p.isPresent()) {
			// 404
			throw new ResourceNotFoundException("No publisher exists with ID "+publisherId);
		}
		Publisher pub = p.get();
		pub.setPublisherName(publisher.getPublisherName());
		pub.setPublisherAddress(publisher.getPublisherAddress());
		pub.setPublisherPhone(publisher.getPublisherPhone());
		return pdao.save(pub);
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@RequestMapping(path="/publisher/{publisherId}",method=RequestMethod.DELETE)
	public void deletePublisher(@PathVariable("publisherId") Integer publisherId) {
		if (publisherId == 0) {
			// error 405
			throw new ForbiddenException("Cannot delete value at index 0");
		}
		Optional<Publisher> p = pdao.findById(publisherId);
		if (!p.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No publisher exists at ID "+publisherId);
		}
		pdao.deleteById(publisherId);
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@RequestMapping(path="/branch",method=RequestMethod.POST)
	public LibraryBranch addBranch(@RequestBody LibraryBranch branch) {
		List<LibraryBranch> lb = lbdao.findAllByBranchNameBranchAddress(branch.getBranchName(), branch.getBranchAddress());
		if (!lb.isEmpty()) {
			// error 405, branch already exists
			throw new ForbiddenException(branch.getBranchName()+" already exists");
		}
		return lbdao.save(branch);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/branch/{branchId}",method=RequestMethod.PUT)
	public LibraryBranch updateBranch(@PathVariable("branchId") Integer branchId, @RequestBody LibraryBranch branch) {
		Optional<LibraryBranch> lb = lbdao.findById(branchId);
		if(!lb.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No branch found at ID "+branchId);
		}
		LibraryBranch bornch = lb.get();
		bornch.setBranchName(branch.getBranchName());
		bornch.setBranchAddress(branch.getBranchAddress());
		return lbdao.save(bornch);
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@RequestMapping(path="/branch/{branchId}",method=RequestMethod.DELETE)
	public void deleteBranch(@PathVariable("branchId") Integer branchId) {
		if (branchId==0) {
			// error 405
			throw new ForbiddenException("Cannot delete value at index 0");
		}
		Optional<LibraryBranch> lb = lbdao.findById(branchId);
		if (!lb.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No branch exists with ID "+branchId);
		}
		lbdao.deleteById(branchId);
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@RequestMapping(path="/borrower",method=RequestMethod.POST)
	public Borrower addBorrower(@RequestBody Borrower borr) {
		List<Borrower> b = bdao2.findAllByNameAddressPhone(borr.getName(), borr.getAddress(), borr.getPhone());
		if (!b.isEmpty()) {
			// error 405, borrower already exists
			throw new ForbiddenException(borr.getName()+" is already in the database with this information");
		}
		return bdao2.save(borr);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="borrower/{cardNo}",method=RequestMethod.PUT)
	public Borrower updateBorrower(@PathVariable("cardNo") Integer cardNo, @RequestBody Borrower newBorrower) {
		Optional<Borrower> b = bdao2.findById(cardNo);
		if(!b.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No borrower exists with card "+cardNo);
		}
		Borrower borr = b.get();
		borr.setName(newBorrower.getName());
		borr.setAddress(newBorrower.getAddress());
		borr.setPhone(newBorrower.getPhone());
		return bdao2.save(borr);
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@RequestMapping(path="/borrower/{cardNo}",method=RequestMethod.DELETE)
	public void deleteBorrower(@PathVariable("cardNo") Integer cardNo) {
		if(cardNo==0) {
			// error 405
			throw new ForbiddenException("Cannot delete value at index 0");
		}
		Optional<Borrower> b = bdao2.findById(cardNo);
		if (!b.isPresent()) {
			//  error 404
			throw new ResourceNotFoundException("No borrower exists with card "+cardNo);
		}
		bdao2.deleteById(cardNo);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(path="/borrower/{cardNo}/book/{bookId}/days/{days}",method=RequestMethod.PUT)
	public BookLoan overrideLoan(@PathVariable("cardNo") Integer cardNo, @PathVariable("bookId") Integer bookId, @PathVariable("days") Integer days) {
		Optional<BookLoan> bl = bldao.findByBookLoanId(bookId, cardNo);
		if (!bl.isPresent()) {
			// error 404
			throw new ResourceNotFoundException("No loan exists with values: bookId = "+bookId+" and cardNo = "+cardNo);
		}
		BookLoan loan = bl.get();
		Calendar due = new GregorianCalendar();
		due.setTimeInMillis(loan.getDueDate().getTime());
		due.add(Calendar.DAY_OF_YEAR, days);
		loan.setDueDate(new Date(due.getTime().getTime()));
		return bldao.save(loan);
	}
}
