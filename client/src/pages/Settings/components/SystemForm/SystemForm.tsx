import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useAuth } from "providers/AuthProvider";
import { styled } from "styled-components";

import SettingsSection, { SectionVariant } from "components/SettingsSection";

import LanguageForm from "./components/LanguageForm";
import ThemeForm from "./components/ThemeForm";

export const StyledSystemForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: column;
  max-width: max-content;
  gap: 30px;
`;

export interface AccountInfo {
  firstname: string;
  lastname: string;
}

const SystemForm = (): JSX.Element | null => {
  const { _: t } = useLingui();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <StyledSystemForm>
      <SettingsSection
        title={t(msg`Внешний вид`)}
        description={t(
          msg`Измените внешний вид и восприятие пользовательского интерфейса в вашем браузере`,
        )}
      >
        <SettingsSection
          title={t(msg`Тема интерфейса`)}
          description={t(msg`Выберите тему пользовательского интерфейса`)}
          variant={SectionVariant.Horizontal}
        >
          <ThemeForm />
        </SettingsSection>
        <SettingsSection
          title={t(msg`Выбор языка`)}
          description={t(msg`Выберите язык пользовательского интерфейса`)}
          variant={SectionVariant.Horizontal}
        >
          <LanguageForm />
        </SettingsSection>
      </SettingsSection>
    </StyledSystemForm>
  );
};

export default SystemForm;
