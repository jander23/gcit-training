package com.smoothstack.lmslibrarian.model;

import java.sql.Date;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "tbl_book_loans")
public class BookLoan {
	@EmbeddedId
	private BookLoanId blid;
	
	@Column(name="dateOut")
	private Date dateOut;
	
	@Column(name="dueDate")
	private Date dueDate;
	
	@ManyToOne(fetch = FetchType.LAZY)    
	@JoinColumn(name="bookId", insertable = false, updatable = false)    
	private Book book;
	
	@ManyToOne(fetch = FetchType.LAZY)    
	@JoinColumn(name="branchId", insertable = false, updatable = false)    
	private LibraryBranch branch;
	
	@ManyToOne(fetch = FetchType.LAZY)    
	@JoinColumn(name="cardNo", insertable = false, updatable = false)    
	private Borrower borrower;
	
	public BookLoan() {}
	
	public BookLoan(Book b, LibraryBranch lb, Borrower b2) {
		this.blid = new BookLoanId(b.getBookId(),b2.getCardNo(),lb.getBranchId());
		this.book = b;
		this.branch = lb;
		this.borrower = b2;
		Calendar now = Calendar.getInstance();
		this.dateOut = new Date(now.getTime().getTime());
		now.add(Calendar.WEEK_OF_YEAR, 2); 
		this.dueDate = new Date(now.getTime().getTime());
	}

	public BookLoanId getBlid() {
		return blid;
	}

	public void setBlid(BookLoanId blid) {
		this.blid = blid;
	}

	public Date getDateOut() {
		return dateOut;
	}

	public void setDateOut(Date dateOut) {
		this.dateOut = dateOut;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public LibraryBranch getBranch() {
		return branch;
	}

	public void setBranch(LibraryBranch branch) {
		this.branch = branch;
	}

	public Borrower getBorrower() {
		return borrower;
	}

	public void setBorrower(Borrower borrower) {
		this.borrower = borrower;
	}
}
