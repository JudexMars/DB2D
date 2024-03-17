import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import MyProfileForm from "./components/MyProfileForm";

const StyledSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: inherit;
`;

const Settings = (): JSX.Element => {
  return (
    <StyledSettings>
      <Routes>
        <Route path="my-profile" element={<MyProfileForm />} />
      </Routes>
    </StyledSettings>
  );
};

export default Settings;
