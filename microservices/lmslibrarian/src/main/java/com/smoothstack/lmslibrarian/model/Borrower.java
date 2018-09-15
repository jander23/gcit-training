package com.smoothstack.lmslibrarian.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "tbl_borrower")
public class Borrower {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer cardNo;
	
	@Column(name="name")
	private String name;
	@Column(name="address")
	private String address;
	@Column(name="phone")
	private String phone;
	
	@JsonIgnore    
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "borrower", cascade = CascadeType.ALL)    
	private Set<BookLoan> loans;
	
	public Borrower () {}
	
	public Borrower (String n, String a, String p) {
		this.name = n;
		this.address = a;
		this.phone = p;
	}

	public Integer getCardNo() {
		return cardNo;
	}

	public void setCardNo(Integer cardNo) {
		this.cardNo = cardNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Set<BookLoan> getLoans() {
		return loans;
	}

	public void setLoans(Set<BookLoan> loans) {
		this.loans = loans;
	}
}
