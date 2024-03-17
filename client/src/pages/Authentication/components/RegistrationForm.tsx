import { useRef } from "react";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "providers/AuthProvider";
import { styled } from "styled-components";

import { StyledLink, TitleForm, WrapperForm } from "./Form.styled";

const WrapperNames = styled.div`
  display: flex;

  gap: 30px;
`;

const RegistrationForm = (): JSX.Element => {
  const { signUp } = useAuth();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onRegisterClick = () => {
    const firstName = firstNameRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();
    const login = loginRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const confirmPassword = confirmPasswordRef.current?.value.trim();
    if (
      firstName &&
      lastName &&
      login &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      signUp({ firstName, lastName, login, email, password, confirmPassword });
    }
  };

  return (
    <WrapperForm>
      <TitleForm>Регистрация</TitleForm>
      <WrapperNames>
        <Input ref={firstNameRef} label="Имя" placeholder="Мото" />
        <Input ref={lastNameRef} label="Фамилия" placeholder="Мото" />
      </WrapperNames>
      <Input ref={loginRef} label="Логин" placeholder="Мото-Мото" />
      <Input ref={emailRef} label="Email" placeholder="email@example.com" />
      <Input ref={passwordRef} label="Пароль" placeholder="12345678" />
      <Input
        ref={confirmPasswordRef}
        label="Подтверждение пароля"
        placeholder="12345678"
      />
      <Button onClick={onRegisterClick}>Зарегистрироваться</Button>
      <p>
        Есть аккаунт? <StyledLink to="/auth/signin">Войти</StyledLink>
      </p>
    </WrapperForm>
  );
};

export default RegistrationForm;
