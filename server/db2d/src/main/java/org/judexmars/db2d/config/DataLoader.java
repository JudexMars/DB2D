package org.judexmars.db2d.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.model.InterfaceLanguageEntity;
import org.judexmars.db2d.repository.InterfaceLanguageRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.function.BooleanSupplier;
import java.util.function.Predicate;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final InterfaceLanguageRepository interfaceLanguageRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        initInterfaceLanguages();
    }

    private void initInterfaceLanguages() {

        var ru = InterfaceLanguageEntity.builder().name("ru").build();
        var en = InterfaceLanguageEntity.builder().name("en").build();

        Predicate<String> condition = (String x) -> interfaceLanguageRepository.findByName(x).isEmpty();

        createIf(ru, interfaceLanguageRepository, () -> condition.test("ru"));
        createIf(en, interfaceLanguageRepository, () -> condition.test("en"));
    }

    private <T> T createIf(T entity, JpaRepository<T, ?> repository, BooleanSupplier condition) {
        if (condition.getAsBoolean()) {
            return repository.save(entity);
        }
        return null;
    }
}
