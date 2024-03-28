import Button from "components/Button";
import ErrorMessage from "components/ErrorMessage";
import { useAuth } from "providers/AuthProvider";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { isEmail } from "utils/email";

import {
  StyledInput,
  StyledLink,
  TitleForm,
  WrapperForm,
  WrapperInput,
} from "./Form.styled";

export const StyledButton = styled(Button)`
  width: 100%;
`;

interface SignInFormInputs {
  email: string;
  password: string;
}

const SignInForm = (): JSX.Element => {
  const { signIn } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormInputs>();

  const onSubmit = (data: SignInFormInputs) => {
    const { email, password } = data;
    signIn({ email, password });
  };

  return (
    <WrapperForm onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Вход в систему</TitleForm>
      <WrapperInput>
        <StyledInput
          type="email"
          placeholder="email@example.com"
          {...register("email", {
            required: true,
            validate: isEmail,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.email}
        />
        {errors.email && <ErrorMessage>Введите корректную почту</ErrorMessage>}
      </WrapperInput>
      <WrapperInput>
        <StyledInput
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.password}
        />
        {errors.password && <ErrorMessage>Введите пароль</ErrorMessage>}
      </WrapperInput>
      <StyledButton type="submit">Войти</StyledButton>
      <p>
        Нет аккаунта?{" "}
        <StyledLink to="/auth/signUp">Зарегистрироваться</StyledLink>
      </p>
    </WrapperForm>
  );
};

export default SignInForm;
