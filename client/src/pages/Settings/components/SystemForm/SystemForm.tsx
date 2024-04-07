import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "providers/AuthProvider";
import { styled } from "styled-components";

import SettingsSection, { SectionVariant } from "components/SettingsSection";

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
  const { user } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ["names"],
    queryFn: async (): Promise<AccountInfo> => {
      const { data: account } = (await axios.get(
        `/account/${user?.accountId}`,
      )) as {
        data: AccountInfo;
      };

      return account;
    },
  });

  if (isLoading || !data?.firstname || !data?.lastname) {
    return null;
  }

  return (
    <StyledSystemForm>
      <SettingsSection
        title='Внешний вид'
        description='Измените внешний вид и восприятие пользовательского интерфейса в вашем браузере'
      >
        <SettingsSection
          title='Тема интерфейса'
          description='Выберите тему пользовательского интерфейса'
          variant={SectionVariant.Horizontal}
        >
          <ThemeForm />
        </SettingsSection>
        <SettingsSection
          title='Выбор языка'
          description='Выберите язык пользовательского интерфейса'
          variant={SectionVariant.Horizontal}
        >
          test
        </SettingsSection>
      </SettingsSection>
    </StyledSystemForm>
  );
};

export default SystemForm;
