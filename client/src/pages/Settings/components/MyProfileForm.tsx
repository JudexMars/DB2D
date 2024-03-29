import { createContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Avatar, { AvatarVariant } from "components/Avatar/Avatar";
import ErrorMessage from "components/ErrorMessage";
import { useAuth } from "providers/AuthProvider";
import { useSettings } from "providers/SettingsProvider";
import { UseFormReturn, useForm } from "react-hook-form";
import { styled } from "styled-components";

import CategoryForm from "./CategoryForm";
import { StyledButton, StyledInput, WrapperForm } from "./Form.styled";

export const StyledMyProfileForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: column;
  max-width: max-content;
  gap: 30px;
`;

const StyledHeadInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledHeadTextInfo = styled.div`
  flex-direction: column;
`;

const StyledP1 = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const StyledP2 = styled.p`
  font-size: 16px;
  font-weight: 300;
`;

export interface AccountInfo {
  email: string;
  firstname: string;
  lastname: string;
}

interface InfoFormInputs {
  firstname: string;
  lastname: string;
}

interface PasswordFormInputs {
  oldPassword: string;
  newPassword: string;
}

interface MyProfileForm {
  changeNameForm: UseFormReturn<InfoFormInputs>;
  changePasswordForm: UseFormReturn<PasswordFormInputs>;
}

const MyProfileContext = createContext<MyProfileForm | null>(null);

const MyProfileForm = (): JSX.Element => {
  const { user } = useAuth();
  const { changeName, changePassword } = useSettings();

  const changeNameForm = useForm<InfoFormInputs>();
  const changePasswordForm = useForm<PasswordFormInputs>();

  const onSubmitName = (data: InfoFormInputs) => {
    const { firstname, lastname } = data;
    changeName({ firstname, lastname });
    changeNameForm.reset();
  };

  const onSubmitPassword = (data: PasswordFormInputs) => {
    const { oldPassword, newPassword } = data;
    changePassword({ oldPassword, newPassword });
    changePasswordForm.reset();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["names"],
    queryFn: async (): Promise<AccountInfo> => {
      const { data } = (await axios.get(`/account/${user?.accountId}`)) as {
        data: AccountInfo;
      };

      changeNameForm.setValue("firstname", data.firstname);
      changeNameForm.setValue("lastname", data.lastname);
      return data;
    },
  });

  return (
    <StyledMyProfileForm>
      <StyledHeadInfo>
        <Avatar variant={AvatarVariant.Rounded}></Avatar>
        <StyledHeadTextInfo>
          <StyledP1>{isLoading ? "Loading..." : `${data?.email}`}</StyledP1>
          <StyledP2>
            {isLoading ? "..." : `${data?.firstname} ${data?.lastname}`}
          </StyledP2>
        </StyledHeadTextInfo>
      </StyledHeadInfo>
      <MyProfileContext.Provider value={{ changeNameForm, changePasswordForm }}>
        <CategoryForm
          title="Основаная информация"
          description="Измените внешний вид и восприятие пользовательского интерфейса в Вашем браузере"
        >
          <WrapperForm onSubmit={changeNameForm.handleSubmit(onSubmitName)}>
            <StyledInput
              type="firstname"
              label="Имя"
              placeholder="Ваше имя"
              {...changeNameForm.register("firstname", {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
              $isError={!!changeNameForm.formState.errors.firstname}
            />
            {changeNameForm.formState.errors.firstname && (
              <ErrorMessage>Введите имя</ErrorMessage>
            )}
            <StyledInput
              type="lastname"
              label="Фамилия"
              placeholder="Ваша фамилия"
              {...changeNameForm.register("lastname", {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
              $isError={!!changeNameForm.formState.errors.lastname}
            />
            {changeNameForm.formState.errors.lastname && (
              <ErrorMessage>Введите фамилию</ErrorMessage>
            )}
            <StyledButton type="submit">Сохранить</StyledButton>
          </WrapperForm>
        </CategoryForm>
        <CategoryForm
          title="Изменить пароль"
          description="Обновите доступ к Вашей учетной записи"
        >
          <WrapperForm
            onSubmit={changePasswordForm.handleSubmit(onSubmitPassword)}
          >
            <StyledInput
              type="newPassowrd "
              label="Новый пароль"
              placeholder="12345678"
              {...changePasswordForm.register("newPassword", {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
              $isError={!!changePasswordForm.formState.errors.newPassword}
            />
            {changePasswordForm.formState.errors.newPassword && (
              <ErrorMessage>Введите новый пароль</ErrorMessage>
            )}
            <StyledInput
              type="oldPassword"
              label="Подтвердите старый пароль"
              placeholder="12345678"
              {...changePasswordForm.register("oldPassword", {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
              $isError={!!changePasswordForm.formState.errors.oldPassword}
            />
            {changePasswordForm.formState.errors.oldPassword && (
              <ErrorMessage>Введите предыдущий пароль</ErrorMessage>
            )}
            <StyledButton type="submit">Сохранить</StyledButton>
          </WrapperForm>
        </CategoryForm>
      </MyProfileContext.Provider>
    </StyledMyProfileForm>
  );
};

export default MyProfileForm;
