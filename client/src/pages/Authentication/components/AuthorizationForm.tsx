import { useRef } from "react";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "providers/AuthProvider";

import { StyledLink, TitleForm, WrapperForm } from "./Form.styled";

const AuthorizationForm = (): JSX.Element => {
  const { signIn } = useAuth();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginClick = () => {
    const login = loginRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    if (login && password) {
      signIn({ login, password });
    }
  };

  return (
    <WrapperForm>
      <TitleForm>Вход в систему</TitleForm>
      <Input ref={loginRef} placeholder="Логин" />
      <Input ref={passwordRef} placeholder="Пароль" />
      <Button onClick={onLoginClick}>Войти</Button>
      <p>
        Нет аккаунта?{" "}
        <StyledLink to="/auth/register">Зарегистрироваться</StyledLink>
      </p>
    </WrapperForm>
  );
};

export default AuthorizationForm;
