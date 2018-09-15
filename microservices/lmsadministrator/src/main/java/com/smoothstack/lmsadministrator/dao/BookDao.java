package com.smoothstack.lmsadministrator.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmsadministrator.model.Author;
import com.smoothstack.lmsadministrator.model.Book;
import com.smoothstack.lmsadministrator.model.Publisher;

@Repository
public interface BookDao extends JpaRepository<Book, Integer> {

	@Query("SELECT b FROM Book b WHERE b.title = ?1 AND b.publisher.publisherName = ?2 AND b.author.authorName = ?3")
	List<Book> findAllByTitleAuthorNamePublisherName(String title, String publisherName, String authorName);

	@Query("SELECT b FROM Book b WHERE b.author = ?1")
	List<Book> findAllByAuthor(Author au);
	
	@Query("SELECT b FROM Book b WHERE b.publisher = ?1")
	List<Book> findAllByPublisher(Publisher pu);

	@Query("SELECT b FROM Book b WHERE b.title LIKE %?1%")
	List<Book> searchByTitle(String title);
}
