package com.smoothstack.lmsborrower.model;

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
@Table(name = "tbl_library_branch")
public class LibraryBranch {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer branchId;
	
	@Column(name="branchName")
	private String branchName;
	@Column(name="branchAddress")
	private String branchAddress;
	
	@JsonIgnore    
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "branch", cascade = CascadeType.ALL)    
	private Set<BookCopies> copies;
	
	@JsonIgnore    
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "branch", cascade = CascadeType.ALL)    
	private Set<BookLoan> loans;
	
	public LibraryBranch() {}
	
	public LibraryBranch(String n, String a) {
		this.branchName = n;
		this.branchAddress = a;
	}

	public Integer getBranchId() {
		return branchId;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getBranchAddress() {
		return branchAddress;
	}

	public void setBranchAddress(String branchAddress) {
		this.branchAddress = branchAddress;
	}

	public Set<BookCopies> getCopies() {
		return copies;
	}

	public void setCopies(Set<BookCopies> copies) {
		this.copies = copies;
	}

	public Set<BookLoan> getLoans() {
		return loans;
	}

	public void setLoans(Set<BookLoan> loans) {
		this.loans = loans;
	}
}
