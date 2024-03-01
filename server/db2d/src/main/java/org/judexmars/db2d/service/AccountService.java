package org.judexmars.db2d.service;

import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.exception.AccountAlreadyExistsException;
import org.judexmars.db2d.exception.EmailTakenException;
import org.judexmars.db2d.exception.ResourceNotFoundException;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.repository.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getByName(username);
    }

    /**
     * Get account by name
     *
     * @param name account's name
     * @return account
     */
    public AccountEntity getByName(String name) {
        return accountRepository.findByUsername(name).orElseThrow(() -> new ResourceNotFoundException("Аккаунт", name));
    }

    /**
     * Get account by id
     *
     * @param id id to be used
     * @return account
     */
    public AccountEntity getById(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Аккаунт", id));
    }


    /**
     * Create new account
     *
     * @param account account to be created
     * @return created account
     * @throws AccountAlreadyExistsException if account with such username already exists
     */
    public AccountEntity createAccount(AccountEntity account) throws AccountAlreadyExistsException {
        if (accountRepository.findByUsername(account.getUsername()).isPresent()) {
            throw new AccountAlreadyExistsException(account.getUsername());
        }
        if (accountRepository.findByEmail(account.getEmail()).isPresent()) {
            throw new EmailTakenException(account.getEmail());
        }
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }
}
