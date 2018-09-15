package com.smoothstack.lmsborrower.dao;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmsborrower.model.BookLoan;
import com.smoothstack.lmsborrower.model.BookLoanId;

@Repository
public interface BookLoanDao extends JpaRepository<BookLoan, BookLoanId> {
	@Query("Select bl From BookLoan bl where bl.blid.bookId = ?1 and bl.blid.cardNo = ?2")
	Optional<BookLoan> findByBookLoanId(Integer bookId, Integer cardNo);
	@Modifying
	@Transactional
	@Query("Delete From BookLoan bl where bl.blid.bookId = ?1 and bl.blid.cardNo = ?2")
	void deleteByBookLoanId(Integer bookId, Integer cardNo);
	@Query("Select bl From BookLoan bl Where bl.blid.cardNo = ?1")
	List<BookLoan> findByBookLoanIdCardNo(Integer cardNo);
	@Query("SELECT bl FROM BookLoan bl WHERE bl.blid.bookId = ?1")
	List<BookLoan> findByBookLoanIdBookId(Integer bookId);
	@Query("SELECT bl FROM BookLoan bl WHERE bl.blid.bookId = ?1 AND bl.blid.branchId = ?2")
	List<BookLoan> findAllByBookLoanIdBranchIdBookId(Integer bookId, Integer branchId);
}
