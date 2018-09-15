package com.smoothstack.lmsborrower.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class BookCopiesId implements Serializable {
	@Column(name="bookId")
	private Integer bookId;
	@Column(name="branchId")
	private Integer branchId;
	
	public BookCopiesId() {
		
	}
	
	public BookCopiesId(Integer book, Integer branch) {
		this.bookId = book;
		this.branchId = branch;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public Integer getBranchId() {
		return branchId;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}
	
	
}
