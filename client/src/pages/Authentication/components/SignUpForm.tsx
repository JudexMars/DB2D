import { useAuth } from "providers/AuthProvider";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

import Button from "components/Button";
import ErrorMessage from "components/ErrorMessage";

import { isEmail } from "utils/email";

import {
  StyledInput,
  StyledLink,
  TitleForm,
  WrapperForm,
  WrapperInput,
} from "./Form.styled";

const WrapperNames = styled.div`
  display: flex;

  gap: 30px;
`;

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm(): JSX.Element {
  const { signUp } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormInputs>();

  const onSubmit = (data: SignUpFormInputs) => {
    signUp(data);
  };

  return (
    <WrapperForm onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Регистрация</TitleForm>
      <WrapperNames>
        <WrapperInput>
          <StyledInput
            label='Имя'
            placeholder='Имя'
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("firstName", {
              required: true,
              setValueAs: (v) => v.trim(),
            })}
            $isError={!!errors.firstName}
          />
          {errors.firstName && <ErrorMessage>Введите имя</ErrorMessage>}
        </WrapperInput>
        <WrapperInput>
          <StyledInput
            label='Фамилия'
            placeholder='Фамилия'
            {...register("lastName", {
              required: true,
              setValueAs: (v) => v.trim(),
            })}
            $isError={!!errors.lastName}
          />
          {errors.lastName && <ErrorMessage>Введите фамилию</ErrorMessage>}
        </WrapperInput>
      </WrapperNames>
      <WrapperInput>
        <StyledInput
          type='email'
          label='Email'
          placeholder='email@example.com'
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
          type='password'
          label='Пароль'
          placeholder='12345678'
          {...register("password", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.password}
        />
        {errors.password && <ErrorMessage>Введите пароль</ErrorMessage>}
      </WrapperInput>
      <WrapperInput>
        <StyledInput
          type='password'
          label='Подтверждение пароля'
          placeholder='12345678'
          {...register("confirmPassword", {
            required: true,
            validate: (value, formState) => value === formState.password,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ErrorMessage>Введенные пароли отличаются</ErrorMessage>
        )}
      </WrapperInput>
      <Button type='submit'>Зарегистрироваться</Button>
      <p>
        Есть аккаунт? <StyledLink to='/auth/signIn'>Войти</StyledLink>
      </p>
    </WrapperForm>
  );
}

export default SignUpForm;
