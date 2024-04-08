package org.judexmars.db2d.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.model.InterfaceLanguageEntity;
import org.judexmars.db2d.model.InterfaceThemeEntity;
import org.judexmars.db2d.model.PrivilegeEntity;
import org.judexmars.db2d.repository.InterfaceLanguageRepository;
import org.judexmars.db2d.repository.InterfaceThemeRepository;
import org.judexmars.db2d.repository.PrivilegeRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
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

        var ru = InterfaceLanguageEntity.builder().name("ru").build();
        var en = InterfaceLanguageEntity.builder().name("en").build();

        Predicate<String> condition = (String x) -> interfaceLanguageRepository.findByName(x).isEmpty();

        createIf(ru, interfaceLanguageRepository, () -> condition.test("ru"));
        createIf(en, interfaceLanguageRepository, () -> condition.test("en"));
    }

    private void initInterfaceThemes() {

        var light = new InterfaceThemeEntity().setName("light");
        var dark = new InterfaceThemeEntity().setName("dark");

        Predicate<String> condition = (String x) -> interfaceThemeRepository.findByName(x).isEmpty();

        createIf(light, interfaceThemeRepository, () -> condition.test("light"));
        createIf(dark, interfaceThemeRepository, () -> condition.test("dark"));
    }

    private void initPrivileges() {

        var privileges = List.of(
                new PrivilegeEntity().setName("READ_CONTENT"),
                new PrivilegeEntity().setName("WRITE_CONTENT"),
                new PrivilegeEntity().setName("EDIT_CONTENT"),
                new PrivilegeEntity().setName("DELETE_CONTENT"),
                new PrivilegeEntity().setName("MANAGE_ACCOUNTS"),
                new PrivilegeEntity().setName("EDIT_GROUP_INFO")
        );

        Predicate<String> condition = (String x) -> privilegeRepository.findByName(x).isEmpty();

        for (var privilege : privileges) {
            createIf(privilege, privilegeRepository, () -> condition.test(privilege.getName()));
        }
    }

    private <T> T createIf(T entity, JpaRepository<T, ?> repository, BooleanSupplier condition) {
        if (condition.getAsBoolean()) {
            return repository.save(entity);
        }
        return null;
    }
}
