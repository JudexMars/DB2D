import { SettingsProvider } from "providers/SettingsProvider";
import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import GroupForm from "./components/GroupForm";
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
    <SettingsProvider>
      <StyledSettings>
        <Routes>
          <Route path='myProfile' element={<MyProfileForm />} />
          <Route path='group' element={<GroupForm />} />
        </Routes>
      </StyledSettings>
    </SettingsProvider>
  );
};

export default Settings;
