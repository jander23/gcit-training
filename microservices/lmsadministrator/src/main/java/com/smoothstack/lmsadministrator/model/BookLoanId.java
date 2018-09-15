package com.smoothstack.lmsadministrator.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class BookLoanId implements Serializable {
	@Column(name="bookId")
	private Integer bookId;
	@Column(name="cardNo")
	private Integer cardNo;
	@Column(name="branchId")
	private Integer branchId;
	
	public BookLoanId() {}
	
	public BookLoanId(Integer book, Integer card, Integer branch) {
		this.bookId = book;
		this.cardNo = card;
		this.branchId = branch;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public Integer getCardNo() {
		return cardNo;
	}

	public void setCardNo(Integer cardNo) {
		this.cardNo = cardNo;
	}
	
	public Integer getBranchId() {
		return branchId;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}
}
