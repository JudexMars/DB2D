import { styled } from "styled-components";

import InfoForm from "./components/InfoForm";
import Members from "./components/Members";

export const StyledGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

const GroupForm = (): JSX.Element => {
  return (
    <StyledGroupWrapper>
      <InfoForm />
      <Members />
    </StyledGroupWrapper>
  );
};

export default GroupForm;
