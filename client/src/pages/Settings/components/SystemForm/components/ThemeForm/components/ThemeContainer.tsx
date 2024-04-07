import { useTheme } from "providers/ThemeProvider";
import { css, styled } from "styled-components";

import { ThemeType } from "styles/styled";

interface StyledThemeContainerProps {
  $isActive?: boolean;
}

const StyledThemeContainer = styled.div<StyledThemeContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  cursor: pointer;

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #677fff;
    `}
`;

const ThemeBlock = styled.div`
  width: 150px;
  height: 100px;
  padding: 10px 0;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

const ThemeTitle = styled.p`
  color: inherit;
  font-size: 16px;
`;

interface ThemeContainerProps {
  type: ThemeType;
}

const ThemeContainer = ({ type }: ThemeContainerProps): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const themeTitle = type === ThemeType.Light ? "Светлая" : "Темная";

  return (
    <StyledThemeContainer
      $isActive={theme?.type === type}
      onClick={() => setTheme(type)}
    >
      <ThemeBlock />
      <ThemeTitle>{themeTitle}</ThemeTitle>
    </StyledThemeContainer>
  );
};

export default ThemeContainer;
