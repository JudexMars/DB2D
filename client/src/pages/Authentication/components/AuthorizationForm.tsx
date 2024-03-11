import Button from "components/Button";
import Input from "components/Input";

import { StyledLink, TitleForm, WrapperForm } from "./Form.styles";

const AuthorizationForm = (): JSX.Element => {
  return (
    <WrapperForm>
      <TitleForm>Вход в систему</TitleForm>
      <Input placeholder="Логин" />
      <Input placeholder="Пароль" />
      <Button>Войти</Button>
      <p>
        Нет аккаунта?{" "}
        <StyledLink to="/auth/registration">Зарегистрироваться</StyledLink>
      </p>
    </WrapperForm>
  );
};

export default AuthorizationForm;
