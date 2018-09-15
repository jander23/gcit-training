package com.smoothstack.lmsborrower.dao;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmsborrower.model.BookCopies;
import com.smoothstack.lmsborrower.model.BookCopiesId;

@Repository
public interface BookCopiesDao extends JpaRepository<BookCopies,BookCopiesId> {
	
	@Query("Select bc From BookCopies bc where bc.bcid.bookId = ?1 and bc.bcid.branchId = ?2")
	Optional<BookCopies> findByBookCopiesId(Integer bookId, Integer branchId);
	@Modifying
	@Transactional
	@Query("Delete From BookCopies bc where bc.bcid.bookId = ?1 and bc.bcid.branchId = ?2")
	Optional<BookCopies> deleteByBookCopiesId(Integer bookId, Integer branchId);
	@Query("Select bc From BookCopies bc Where bc.bcid.branchId = ?1")
	List<BookCopies> findByBookCopiesIdBranchId(Integer branchId);
	@Query("SELECT bc FROM BookCopies bc WHERE bc.bcid.bookId = ?1")
	List<BookCopies> findByBookCopiesIdBookId(Integer bookId);
}
