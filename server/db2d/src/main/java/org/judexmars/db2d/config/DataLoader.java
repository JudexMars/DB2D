package org.judexmars.db2d.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.model.*;
import org.judexmars.db2d.repository.InterfaceLanguageRepository;
import org.judexmars.db2d.repository.InterfaceThemeRepository;
import org.judexmars.db2d.repository.PrivilegeRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.function.BooleanSupplier;
import java.util.function.Predicate;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final InterfaceLanguageRepository interfaceLanguageRepository;

    private final InterfaceThemeRepository interfaceThemeRepository;

    private final PrivilegeRepository privilegeRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        initInterfaceLanguages();
        initInterfaceThemes();
        initPrivileges();
    }

    private void initInterfaceLanguages() {
        var languages = Arrays.stream(DefaultLanguages.values())
                .map(x -> new InterfaceLanguageEntity().setName(x.name()))
                .toList();

        Predicate<String> condition = (String x) -> interfaceLanguageRepository.findByName(x).isEmpty();

        for (var language : languages) {
            createIf(language, interfaceLanguageRepository, () -> condition.test(language.getName()));
        }
    }

    private void initInterfaceThemes() {
        var themes = Arrays.stream(DefaultThemes.values())
                .map(x -> new InterfaceThemeEntity().setName(x.name()))
                .toList();

        Predicate<String> condition = (String x) -> interfaceThemeRepository.findByName(x).isEmpty();

        for (var theme : themes) {
            createIf(theme, interfaceThemeRepository, () -> condition.test(theme.getName()));
        }
    }

    private void initPrivileges() {
        var privileges = Arrays.stream(DefaultPrivileges.values())
                .map(x -> new PrivilegeEntity().setName(x.name()))
                .toList();

        Predicate<String> condition = (String x) -> privilegeRepository.findByName(x).isEmpty();

        for (var privilege : privileges) {
            createIf(privilege, privilegeRepository, () -> condition.test(privilege.getName()));
        }
    }

    private <T> void createIf(T entity, JpaRepository<T, ?> repository, BooleanSupplier condition) {
        if (condition.getAsBoolean()) {
            repository.save(entity);
        }
    }
}
