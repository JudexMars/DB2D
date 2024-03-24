import { useRef } from "react";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "providers/AuthProvider";
import { styled } from "styled-components";

import { StyledLink, TitleForm, WrapperForm } from "./Form.styled";

export const StyledButton = styled(Button)`
  width: 100%;
`;

const AuthorizationForm = (): JSX.Element => {
  const { signIn } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginClick = () => {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    if (email && password) {
      signIn({ email, password });
    }
  };

  return (
    <WrapperForm>
      <TitleForm>Вход в систему</TitleForm>
      <Input ref={emailRef} label="Email" placeholder="email@example.com" />
      <Input ref={passwordRef} placeholder="Пароль" />
      <StyledButton onClick={onLoginClick}>Войти</StyledButton>
      <p>
        Нет аккаунта?{" "}
        <StyledLink to="/auth/signUp">Зарегистрироваться</StyledLink>
      </p>
    </WrapperForm>
  );
};

export default AuthorizationForm;
