import { styled } from "styled-components";

import GroupCard, { GroupCardVariant } from "./GroupCard";

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

const StyledGroupsList = styled.div`
  display: flex;
  gap: 20px;
`;

const GroupSelection = (): JSX.Element => {
  return (
    <StyledGroupCreation>
      <StyledTitle>Выберите группу</StyledTitle>
      <StyledGroupsList>
        <GroupCard title='Frontend отдел' />
        <GroupCard title='Backend отдел' />
        <GroupCard title='Backend отдел' />
        <GroupCard variant={GroupCardVariant.New} title='Создать свою группу' />
      </StyledGroupsList>
    </StyledGroupCreation>
  );
};

export default GroupSelection;
