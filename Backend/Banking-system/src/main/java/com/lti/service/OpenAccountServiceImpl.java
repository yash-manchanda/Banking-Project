package com.lti.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;

import com.lti.dto.CreateAccountStatus;
import com.lti.dto.ViewUserDetailsDto;
import com.lti.exception.ServiceException;
import com.lti.pojo.OpenAccount;
import com.lti.repository.OpenAccountRepo;

@Service
public class OpenAccountServiceImpl implements OpenAccountService {

	@Autowired
	private OpenAccountRepo repo;
	
	@Override
	public void createAccount(OpenAccount account) {
		// TODO Auto-generated method stub

		boolean isAccountThere = repo.isAccountPresent(account.getAadharCard());
		if(isAccountThere) {
			throw new ServiceException("Account already exist");
		}
		else {
			String initialAccNumber = "50005001";
			String initialRefId = "30001";
			Long numOfAccount = repo.numberOfAccountPresent();
			String maxAccountNumber = repo.maxAccountNumber();
			String maxRefId = repo.maxRefId();
			if(numOfAccount == 0) {
				account.setAccountNumber(initialAccNumber);
				account.setRefernceId(initialRefId);
			}else {
				int updatedMaxAccNo = Integer.parseInt(maxAccountNumber) + 1;
				int updatedRefId = Integer.parseInt(maxRefId) + 1;
				account.setAccountNumber(Integer.toString(updatedMaxAccNo));
				account.setRefernceId(Integer.toString(updatedRefId));
			}
			repo.save(account);
		}
	}
	@Override
	public List<OpenAccount> getAllAccounts() {
		return repo.viewAllRecords();
	}
	
	@Override
	public OpenAccount getAccountById(String refId) {
		try {
		System.out.println("ref is "+refId);
			String acNo = repo.findAccountNumberByRefId(refId);
			System.out.println("acc is "+acNo);
			return repo.getAccountByAccNumber(acNo);
		}
		catch (NullPointerException e) {
			// TODO: handle exception
			throw new ServiceException();
		}
	}
	
	@Override
	public void addAccountStatus(CreateAccountStatus status) {
		try {
			System.out.println(status);
			repo.updateAccountStatus(status.getApprovedByAdmin(), status.getAdminRemark(), status.getAccountNumber());
		}
		catch (InvalidDataAccessApiUsageException e) {
			throw new ServiceException("Error !!!");
		}
	}
	@Override
	public ViewUserDetailsDto userDetails(String accNo) {
		OpenAccount account = repo.getAccountByAccNumber(accNo);
		ViewUserDetailsDto details = new ViewUserDetailsDto();
		details.setAadharCard(account.getAadharCard());
		details.setEmail(account.getEmail());
		details.setFirstName(account.getFirstName());
		details.setLastName(account.getLastName());
		details.setMiddleName(account.getMiddleName());
		details.setMobileNumber(account.getMobileNumber());
		details.setResAddress1(account.getResAddress1());
		details.setResAddress2(account.getResAddress2());
		details.setResCity(account.getResCity());
		details.setResLandMark(account.getResLandMark());
		details.setResPincode(account.getResPincode());
		details.setResState(account.getResState());
		details.setOccupation(account.getOccupation());
		details.setAccountBalance(account.getAccountBalance());
		return details;
	}
}