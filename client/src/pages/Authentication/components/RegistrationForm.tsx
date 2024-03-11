import Button from "components/Button";
import Input from "components/Input";
import { styled } from "styled-components";

import { StyledLink, TitleForm, WrapperForm } from "./Form.styles";

const WrapperNames = styled.div`
  display: flex;

  gap: 30px;
`;

const RegistrationForm = (): JSX.Element => {
  return (
    <WrapperForm>
      <TitleForm>Регистрация</TitleForm>
      <WrapperNames>
        <Input label="Имя" placeholder="Мото" />
        <Input label="Фамилия" placeholder="Мото" />
      </WrapperNames>
      <Input label="Логин" placeholder="Мото-Мото" />
      <Input label="Пароль" placeholder="12345678" />
      <Input label="Подтверждение пароля" placeholder="12345678" />
      <Button>Зарегистрироваться</Button>
      <p>
        Есть аккаунт? <StyledLink to="/auth/login">Войти</StyledLink>
      </p>
    </WrapperForm>
  );
};

export default RegistrationForm;
