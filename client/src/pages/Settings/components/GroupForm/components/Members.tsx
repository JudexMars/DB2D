import { useGroup } from "providers/GroupProvider";
import { styled } from "styled-components";

import SettingsSection from "components/SettingsSection";

import MemberCard from "./MemberCard";

const StyledMembers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Members = (): JSX.Element => {
  const { fetchGroupMembersQuery } = useGroup();
  const { isLoading, data, refetch } = fetchGroupMembersQuery;
  refetch();

  return (
    <StyledMembers>
      <SettingsSection
        title='Состав команды'
        description='Добавляйте и изменяйте участников команды'
      >
        <StyledList>
          {!isLoading &&
            data?.map((member) => (
              <MemberCard
                key={member.id}
                name={member.firstName}
                role={member.role}
              />
            ))}
        </StyledList>
      </SettingsSection>
    </StyledMembers>
  );
};

export default Members;
