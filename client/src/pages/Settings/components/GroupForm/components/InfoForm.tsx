import { useGroup } from "providers/GroupProvider";
import { useForm } from "react-hook-form";
import { css, styled } from "styled-components";

import Avatar, { AvatarVariant } from "components/Avatar";
import Button from "components/Button";
import ErrorMessage from "components/ErrorMessage";
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
  justify-content: start;
  align-items: center;
  flex-direction: row;
  padding: 10px 0px 10px 20px;
  gap: 20px;
  width: 100%;
`;

const StyledFormWrapper = styled.form`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const StyledInput = styled(Input)<StyledInputProps>`
  width: 400px;
  ${({ theme, $isError }) =>
    $isError &&
    css`
      border-color: ${theme.form.errorColor};
    `}
`;

const StyledButton = styled(Button)`
  font-size: 24px;
  height: 55px;
`;

interface StyledInputProps {
  $isError: boolean;
}

interface ChangeGroupInfo {
  name: string;
  description: string;
}

const InfoForm = (): JSX.Element => {
  const { activeGroup, setGroupInfo } = useGroup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeGroupInfo>();

  const onSubmitSet = (data: ChangeGroupInfo) => {
    setGroupInfo(data);
  };

  return (
    <StyledInfoForm>
      <SettingsSection
        title='Информация о команде'
        description='Измените основную информацию о команде'
      >
        <StyledInfoWrapper>
          <Avatar variant={AvatarVariant.Squared} size={150} isShadow />
          <StyledFormWrapper onSubmit={handleSubmit(onSubmitSet)}>
            <StyledInput
              type='name'
              label='Название команды'
              placeholder={activeGroup?.name}
              {...register("name", {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
              $isError={!!errors.name}
            />
            {errors.name && <ErrorMessage>Введите название</ErrorMessage>}
            <StyledButton type='submit'>Сохранить</StyledButton>
          </StyledFormWrapper>
        </StyledInfoWrapper>
      </SettingsSection>
    </StyledInfoForm>
  );
};

export default InfoForm;
