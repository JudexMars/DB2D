import { useGroup } from "providers/GroupProvider";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { css, styled } from "styled-components";

import Button from "components/Button";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

const StyledGroupCreation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 50%;
`;

const StyledTitle = styled.p`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.link.primary};
  font-size: 24px;
  font-weight: 600;
`;

const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

interface StyledInputProps {
  $isError: boolean;
}

export const StyledInput = styled(Input)<StyledInputProps>`
  ${({ theme, $isError }) =>
    $isError &&
    css`
      border-color: ${theme.form.errorColor};
    `}
`;

interface GroupCreateInputs {
  name: string;
}

const GroupCreation = (): JSX.Element => {
  const { createGroup } = useGroup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupCreateInputs>();

  const onSubmitCreate = (data: GroupCreateInputs) => {
    createGroup(data);
  };

  return (
    <StyledGroupCreation>
      <StyledTitle>Придумайте название Вашей группы</StyledTitle>
      <WrapperForm onSubmit={handleSubmit(onSubmitCreate)}>
        <StyledInput
          type='name'
          placeholder='Название вашей группы'
          {...register("name", {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
          $isError={!!errors.name}
        />
        {errors.name && <ErrorMessage>Введите название</ErrorMessage>}
        <StyledButtons>
          <StyledLink to='/group/select'>Назад</StyledLink>
          <Button type='submit'>Создать</Button>
        </StyledButtons>
      </WrapperForm>
    </StyledGroupCreation>
  );
};

export default GroupCreation;
