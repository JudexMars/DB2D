import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import GroupCreation from "./components/GroupCreation";
import GroupSelection from "./components/GroupSelection";

const StyledGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Group = (): JSX.Element => {
  return (
    <StyledGroup>
      <Routes>
        <Route path='create' element={<GroupCreation />} />
        <Route path='select' element={<GroupSelection />} />
      </Routes>
    </StyledGroup>
  );
};

export default Group;
