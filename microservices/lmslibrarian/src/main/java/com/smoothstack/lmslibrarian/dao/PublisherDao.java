package com.smoothstack.lmslibrarian.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmslibrarian.model.Publisher;


@Repository
public interface PublisherDao extends JpaRepository<Publisher, Integer> {
	
	@Query("SELECT p FROM Publisher p WHERE p.publisherName = ?1")
	List<Publisher> findAllByPublisherName(String publisherName);

}