import { styled } from "styled-components";

import InfoForm from "./components/InfoForm";
import Members from "./components/Members";

export const StyledGroupForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

const OrganizationForm = (): JSX.Element => {
  return (
    <StyledGroupForm>
      <InfoForm />
      <Members />
    </StyledGroupForm>
  );
};

export default OrganizationForm;
