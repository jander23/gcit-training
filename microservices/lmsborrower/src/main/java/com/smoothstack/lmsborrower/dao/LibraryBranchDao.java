package com.smoothstack.lmsborrower.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smoothstack.lmsborrower.model.LibraryBranch;


@Repository
public interface LibraryBranchDao extends JpaRepository<LibraryBranch, Integer>{

	@Query("SELECT lb FROM LibraryBranch lb WHERE lb.branchName = ?1 AND lb.branchAddress = ?2")
	List<LibraryBranch> findAllByBranchNameBranchAddress(String branchName, String branchAddress);

}
