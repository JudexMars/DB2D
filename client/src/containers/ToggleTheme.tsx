import { useTheme } from "providers/ThemeProvider";
import { css, styled } from "styled-components";

import Icon from "components/Icon";

import { ThemeType } from "styles/styled";

const StyledToggleTheme = styled.div`
  width: 64px;
  height: 34px;

  cursor: pointer;
`;

const StyledInput = styled.input`
  visibility: hidden;
`;

const StyledSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.toggle.background};
  border-radius: 34px;

  transition: 0.4s;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 4px;
    bottom: 4px;

    height: 26px;
    width: 26px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 50%;
    box-shadow: 0 0 25px 5px ${({ theme }) => theme.colors.shadow};

    transition: 0.4s;
    transform: translateX(26px);
  }

  ${StyledInput}:checked + &::before {
    transform: translateX(0px);
  }
`;

interface StyledIconProps {
  $isDarkTheme: boolean;
}

const StyledIcon = styled(Icon)<StyledIconProps>`
  color: ${({ theme }) => theme.colors.font};
  position: absolute;
  top: 8px;
  left: 8px;

  ${({ $isDarkTheme }) =>
    $isDarkTheme &&
    css`
      right: 8px;
      left: auto;
    `};
`;

interface ToggleThemeProps {
  className?: string;
}

const ToggleTheme = ({ className }: ToggleThemeProps) => {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme.type === ThemeType.Dark;

  return (
    <StyledToggleTheme className={className} onClick={toggleTheme}>
      <StyledInput id='theme-check' type='checkbox' checked={isDarkTheme} />
      <StyledSpan />
      <StyledIcon
        type={isDarkTheme ? "Sun" : "Moon"}
        $isDarkTheme={isDarkTheme}
        width={18}
        height={18}
      />
    </StyledToggleTheme>
  );
};

export default ToggleTheme;
