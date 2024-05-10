import { useGroup } from "providers/GroupProvider";
import { styled } from "styled-components";

import GroupCard, { GroupCardVariant } from "./GroupCard";

const StyledGroupSelection = styled.div`
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

const StyledGroupsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const GroupSelection = (): JSX.Element => {
  const { fetchGroupsQuery, selectActiveGroupState } = useGroup();
  const { isLoading, data, refetch } = fetchGroupsQuery;
  refetch();

  return (
    <StyledGroupSelection>
      <StyledTitle>Выберите группу</StyledTitle>
      <StyledGroupsList>
        <GroupCard variant={GroupCardVariant.New} title='Создать свою группу' />
        {!isLoading &&
          data?.map((group) => (
            <GroupCard
              key={group.id}
              title={group.name}
              onClick={() => selectActiveGroupState({ id: group.id })}
            />
          ))}
      </StyledGroupsList>
    </StyledGroupSelection>
  );
};

export default GroupSelection;
