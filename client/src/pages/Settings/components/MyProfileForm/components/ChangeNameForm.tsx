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

export interface AccountInfo {
  email: string;
  firstname: string;
  lastname: string;
}

interface InfoFormInputs {
  firstname: string;
  lastname: string;
}

interface ChangeNameFormProps {
  firstname: string;
  lastname: string;
}

const ChangeNameForm = ({
  firstname,
  lastname,
}: ChangeNameFormProps): JSX.Element => {
  const { changeName } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoFormInputs>({
    defaultValues: { firstname, lastname },
  });

  const onSubmitName = (data: InfoFormInputs) => {
    changeName(data);
  };

  return (
    <SettingsSection
      title="Основаная информация"
      description="Измените внешний вид и восприятие пользовательского интерфейса в Вашем браузере"
    >
      <WrapperForm onSubmit={handleSubmit(onSubmitName)}>
        <StyledInput
          type="firstname"
          label="Имя"
          placeholder="Ваше имя"
          {...register("firstname", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.firstname}
        />
        {errors.firstname && <ErrorMessage>Введите имя</ErrorMessage>}
        <StyledInput
          type="lastname"
          label="Фамилия"
          placeholder="Ваша фамилия"
          {...register("lastname", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.lastname}
        />
        {errors.lastname && <ErrorMessage>Введите фамилию</ErrorMessage>}
        <StyledButton type="submit">Сохранить</StyledButton>
      </WrapperForm>
    </SettingsSection>
  );
};

export default ChangeNameForm;
