import ErrorMessage from "components/ErrorMessage";
import SettingsSection from "components/SettingsSection";
import { useSettings } from "providers/SettingsProvider";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

import { StyledButton, StyledInput, WrapperForm } from "./Form.styled";

export const StyledMyProfileForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: column;
  max-width: max-content;
  gap: 30px;
`;

interface PasswordFormInputs {
  oldPassword: string;
  newPassword: string;
}

const ChangePasswordForm = (): JSX.Element => {
  const { changePassword } = useSettings();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  const onSubmitPassword = (data: PasswordFormInputs) => {
    changePassword(data);
    reset();
  };

  return (
    <SettingsSection
      title="Изменить пароль"
      description="Обновите доступ к Вашей учетной записи"
    >
      <WrapperForm onSubmit={handleSubmit(onSubmitPassword)}>
        <StyledInput
          type="password"
          label="Новый пароль"
          placeholder="12345678"
          {...register("newPassword", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.newPassword}
        />
        {errors.newPassword && (
          <ErrorMessage>Введите новый пароль</ErrorMessage>
        )}
        <StyledInput
          type="password"
          label="Подтвердите старый пароль"
          placeholder="12345678"
          {...register("oldPassword", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.oldPassword}
        />
        {errors.oldPassword && (
          <ErrorMessage>Введите предыдущий пароль</ErrorMessage>
        )}
        <StyledButton type="submit">Сохранить</StyledButton>
      </WrapperForm>
    </SettingsSection>
  );
};

export default ChangePasswordForm;
