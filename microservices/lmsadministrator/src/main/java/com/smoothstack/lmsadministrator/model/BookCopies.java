package com.smoothstack.lmsadministrator.model;

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
@Table(name = "tbl_book_copies")
public class BookCopies {
	@EmbeddedId
	private BookCopiesId bcid;
	
	@Column(name="noOfCopies")
	private Integer noOfCopies;
	
	@ManyToOne(fetch = FetchType.LAZY)    
	@JoinColumn(name="bookId", insertable = false, updatable = false)    
	private Book book;
	
	@ManyToOne(fetch = FetchType.LAZY)    
	@JoinColumn(name="branchId", insertable = false, updatable = false)    
	private LibraryBranch branch;
	
	public BookCopies() {}
	
	public BookCopies(Integer copies, Book b, LibraryBranch lb) {
		this.noOfCopies = copies;
		this.book = b;
		this.branch = lb;
		this.bcid = new BookCopiesId(b.getBookId(),lb.getBranchId());
	}

	public BookCopiesId getBcid() {
		return bcid;
	}

	public void setBcid(BookCopiesId bcid) {
		this.bcid = bcid;
	}

	public Integer getNoOfCopies() {
		return noOfCopies;
	}

	public void setNoOfCopies(Integer noOfCopies) {
		this.noOfCopies = noOfCopies;
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
}
