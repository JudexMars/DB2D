import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import ToggleTheme from "containers/ToggleTheme";

import ApplicationInfo from "./components/ApplicationInfo";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const StyledAuthentication = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledToggleTheme = styled(ToggleTheme)`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const WrapperForm = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Authentication = (): JSX.Element => {
  return (
    <StyledAuthentication>
      <StyledToggleTheme />
      <WrapperForm>
        <Routes>
          <Route path='signIn' element={<SignInForm />} />
          <Route path='signUp' element={<SignUpForm />} />
        </Routes>
      </WrapperForm>
      <ApplicationInfo />
    </StyledAuthentication>
  );
};

export default Authentication;
