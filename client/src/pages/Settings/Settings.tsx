import { SettingsProvider } from "providers/SettingsProvider";
import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import NavigationBar, { NavigationItemProps } from "components/NavigationBar";

import MyProfileForm from "./components/MyProfileForm";
import SystemForm from "./components/SystemForm";
import { RouteLinks } from "./constants";

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  max-height: inherit;
`;

const links: NavigationItemProps[] = [
  { title: "Мой профиль", to: RouteLinks.MyProfile },
  { title: "Система", to: RouteLinks.System },
];

const Settings = (): JSX.Element => {
  return (
    <SettingsProvider>
      <StyledSettings>
        <NavigationBar items={links} />
        <Routes>
          <Route path={RouteLinks.MyProfile} element={<MyProfileForm />} />
          <Route path={RouteLinks.System} element={<SystemForm />} />
        </Routes>
      </StyledSettings>
    </SettingsProvider>
  );
};

export default Settings;
