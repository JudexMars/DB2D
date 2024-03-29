package org.judexmars.db2d.service;

import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.dto.account.AccountDto;
import org.judexmars.db2d.dto.account.AccountPasswordDto;
import org.judexmars.db2d.dto.account.AccountSettingsDto;
import org.judexmars.db2d.dto.account.UpdateAccountDto;
import org.judexmars.db2d.dto.auth.request.SignupRequestDto;
import org.judexmars.db2d.exception.AccountNotFoundException;
import org.judexmars.db2d.exception.EmailTakenException;
import org.judexmars.db2d.exception.LanguageNotFoundException;
import org.judexmars.db2d.exception.WrongPasswordException;
import org.judexmars.db2d.mapper.AccountMapper;
import org.judexmars.db2d.model.AccountEntity;
import org.judexmars.db2d.model.AccountSettingsEntity;
import org.judexmars.db2d.model.InterfaceLanguageEntity;
import org.judexmars.db2d.repository.AccountRepository;
import org.judexmars.db2d.repository.AccountSettingsRepository;
import org.judexmars.db2d.repository.InterfaceLanguageRepository;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final AccountSettingsRepository accountSettingsRepository;
    private final InterfaceLanguageRepository interfaceLanguageRepository;
    private final AccountMapper accountMapper;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findByEmail(username)
                .orElseThrow(() -> new AccountNotFoundException(username));
    }

    /**
     * Get account by username
     *
     * @param username account's username
     * @return {@link AccountDto}
     */
    public AccountDto getByEmail(String username) {
        return accountMapper.toAccountDto(((AccountEntity) loadUserByUsername(username)));
    }

    /**
     * Get account by id
     *
     * @param id id to be used
     * @return account
     */
    public AccountDto getById(Long id) {
        return accountMapper.toAccountDto(accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException( id)));
    }

    /**
     * Create new account
     *
     * @param signupRequestDto account to be created
     * @return created account
     * @throws EmailTakenException if account with such email already exists
     */
    public AccountDto createAccount(SignupRequestDto signupRequestDto) throws EmailTakenException {
        if (accountRepository.findByEmail(signupRequestDto.email()).isPresent()) {
            throw new EmailTakenException(signupRequestDto.email());
        }
        var account = accountMapper.toAccount(signupRequestDto);
        account.setPassword(passwordEncoder.encode(signupRequestDto.password()));
        var accountSettings = new AccountSettingsEntity();
        accountSettings.setAccount(account);
        accountSettings.setLanguage(getDefaultLanguage());
        account.setAccountSettings(accountSettings);
        return accountMapper.toAccountDto(accountRepository.save(account));
    }

    /**
     * Get account settings by account's id
     * @param accountId id of the account
     * @return {@link AccountSettingsDto}
     */
    public AccountSettingsDto getAccountSettingsById(Long accountId) {
        return accountMapper.toAccountSettingsDto(accountSettingsRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId)));
    }

    /**
     * Get account settings by account's username
     * @param email username of the account
     * @return {@link AccountSettingsDto}
     */
    public AccountSettingsDto getAccountSettingsByEmail(String email) {
        return accountMapper.toAccountSettingsDto(accountRepository.findByEmail(email)
                .orElseThrow(() -> new AccountNotFoundException(email))
                .getAccountSettings());
    }

    /**
     * Update account's settings by id
     * @param id id of the account
     * @param accountSettingsDto new account's settings
     * @return updated account's settings
     */
    public AccountSettingsDto updateAccountSettingsById(Long id, AccountSettingsDto accountSettingsDto) {
        var accountSettings = accountMapper.toAccountSettings(accountSettingsDto, id);
        var language = interfaceLanguageRepository.findByName(accountSettingsDto.language()).orElseThrow(() -> new LanguageNotFoundException(accountSettingsDto.language()));
        accountSettings.getLanguage().setId(language.getId());
        return accountMapper.toAccountSettingsDto(accountSettingsRepository.save(accountSettings));
    }

    /**
     * Check if the provided id is not related to the current authenticated user
     *
     * @param id provided id
     * @return true, if the id is fake
     */
    public boolean checkFakeId(Long id) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var account = getById(id);
        return !account.email().equals(authentication.getName());
    }

    /**
     * Update account by id
     * @param id account's id
     * @param accountDto new account info
     * @return updated account as {@link AccountDto}
     */
    public AccountDto updateAccountById(Long id, UpdateAccountDto accountDto) {
        var existingAccount = accountRepository.findById(id).orElseThrow(() -> new AccountNotFoundException(id));
        var account = accountMapper.toAccountWithNoNulls(accountDto, existingAccount);
        return accountMapper.toAccountDto(accountRepository.save(account));
    }

    public void updateAccountPassword(Long id, AccountPasswordDto accountPasswordDto) {
        var existingAccount = accountRepository.findById(id).orElseThrow(() -> new AccountNotFoundException(id));
        if (!passwordEncoder.matches(accountPasswordDto.oldPassword(), existingAccount.getPassword()))
        {
            throw new WrongPasswordException();
        }
        existingAccount.setPassword(passwordEncoder.encode(accountPasswordDto.newPassword()));
        accountRepository.save(existingAccount);

    }

    private InterfaceLanguageEntity getDefaultLanguage() {
        return interfaceLanguageRepository.findById(1).orElseThrow(() -> new LanguageNotFoundException(1));
    }
}
