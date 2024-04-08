import { styled } from "styled-components";

import SettingsSection from "components/SettingsSection";

import MemberCard from "./MemberCard";

const StyledMembers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Members = (): JSX.Element => {
  return (
    <StyledMembers>
      <SettingsSection
        title='Состав команды'
        description='Добавляйте и изменяйте участников команды'
      >
        <StyledList>
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </StyledList>
      </SettingsSection>
    </StyledMembers>
  );
};

export default Members;
