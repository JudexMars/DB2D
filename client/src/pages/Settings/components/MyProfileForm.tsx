import Button from "components/Button";
import Input from "components/Input";
import { styled } from "styled-components";

import CategoryForm from "./CategoryForm";

export const WrapperForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: column;
  max-width: max-content;
  gap: 30px;
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  margin-left: auto;
  padding: 10px 10px;
`;

const MyProfileForm = (): JSX.Element => {
  return (
    <WrapperForm>
      <CategoryForm
        title="Основаная информация"
        description="Измените внешний вид и восприятие пользовательского интерфейса в Вашем браузере"
      >
        <Input label="Имя" placeholder="Мото" />
        <Input label="Фамилия" placeholder="Мото" />
        <Input label="Логин" placeholder="Мото-Мото" />
      </CategoryForm>
      <StyledButton>Сохранить</StyledButton>
      <CategoryForm
        title="Изменить пароль"
        description="Обновите доступ к Вашей учетной записи"
      >
        <Input label="Новый пароль" placeholder="12345678" />
        <Input label="Подтвердите старый пароль" placeholder="12345678" />
      </CategoryForm>
      <StyledButton>Сохранить</StyledButton>
    </WrapperForm>
  );
};

export default MyProfileForm;
