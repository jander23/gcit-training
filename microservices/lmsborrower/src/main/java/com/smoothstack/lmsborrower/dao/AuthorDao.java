package com.smoothstack.lmsborrower.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmsborrower.model.Author;

@Repository
public interface AuthorDao extends JpaRepository<Author, Integer> {

	@Query("SELECT a FROM Author a WHERE a.authorName = ?1")
	List<Author> findAllByAuthorName(String authorName);

}
