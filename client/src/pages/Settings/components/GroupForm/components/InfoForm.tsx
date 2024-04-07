import { styled } from "styled-components";

import Avatar, { AvatarVariant } from "components/Avatar";
import Input from "components/Input";
import SettingsSection from "components/SettingsSection";

const StyledInfoForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0px 10px 20px;
  gap: 20px;
`;

const StyledInput = styled(Input)`
  width: 400px;
`;

const InfoForm = (): JSX.Element => {
  return (
    <StyledInfoForm>
      <SettingsSection
        title='Информация о команде'
        description='Измените основную информацию о команде'
      >
        <StyledInfoWrapper>
          <Avatar variant={AvatarVariant.Squared} size={150} isShadow />
          <StyledInput
            label='Название команды'
            placeholder='Введите название команды'
          />
        </StyledInfoWrapper>
      </SettingsSection>
    </StyledInfoForm>
  );
};

export default InfoForm;
