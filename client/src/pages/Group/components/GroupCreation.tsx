import { Link } from "react-router-dom";
import { styled } from "styled-components";

import Button from "components/Button";
import Input from "components/Input";

const StyledGroupCreation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 40%;
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

const GroupCreation = (): JSX.Element => {
  return (
    <StyledGroupCreation>
      <StyledTitle>Придумайте название Вашей группы</StyledTitle>
      <Input placeholder='Название вашей группы' />
      <StyledButtons>
        <StyledLink to='/group/select'>Назад</StyledLink>
        <Button>Создать</Button>
      </StyledButtons>
    </StyledGroupCreation>
  );
};

export default GroupCreation;
