import { styled } from "styled-components";

import { ThemeType } from "styles/styled";

import ThemeContainer from "./components/ThemeContainer";

const StyledThemeForm = styled.div`
  display: flex;
  gap: 20px;
`;

const ThemeForm = (): JSX.Element => (
  <StyledThemeForm>
    <ThemeContainer type={ThemeType.Light} />
    <ThemeContainer type={ThemeType.Dark} />
  </StyledThemeForm>
);

export default ThemeForm;
