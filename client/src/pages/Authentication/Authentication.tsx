import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import ApplicationInfo from "./components/ApplicationInfo";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const StyledAuthentication = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
