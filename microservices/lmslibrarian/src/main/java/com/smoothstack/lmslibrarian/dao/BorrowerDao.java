package com.smoothstack.lmslibrarian.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmslibrarian.model.Borrower;


@Repository
public interface BorrowerDao extends JpaRepository<Borrower,Integer> {

	@Query("SELECT b FROM Borrower b WHERE b.name = ?1 AND b.address = ?2 AND b.phone = ?3")
	List<Borrower> findAllByNameAddressPhone(String name, String address, String phone);

}
