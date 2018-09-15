package com.smoothstack.lmsadministrator.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "tbl_book")
public class Book {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer bookId;
	
	@Column(name="title")
	private String title;
	
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "authId") 
	private Author author;
	
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "pubId") 
	private Publisher publisher;
	
	@JsonIgnore    
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book", cascade = CascadeType.ALL)    
	private Set<BookCopies> copies;
	
	@JsonIgnore    
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book", cascade = CascadeType.ALL)    
	private Set<BookLoan> loans;
	
	public Book() {}
	
	public Book(String t, Author a, Publisher p) {
		this.title = t;
		this.author = a;
		this.publisher = p;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Publisher getPublisher() {
		return publisher;
	}

	public void setPublisher(Publisher publisher) {
		this.publisher = publisher;
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
