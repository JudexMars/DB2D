import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components";

const StyledNavigationBar = styled.div`
  position: relative;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  padding: 4px;

  overflow: hidden;

  background-color: ${({ theme }) => theme.navigation.background};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: color 0.3s ease-in-out;
`;

const StyledNavLink = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 46px;
  list-style-type: none;
  text-decoration: none;

  color: ${({ theme }) => theme.navigation.color};

  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.navigation.activeItem.color};
    background-color: ${({ theme }) => theme.navigation.activeItem.background};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    box-shadow: 0 0 25px 10px ${({ theme }) => theme.colors.shadow};

    transition: all 0.3s ease-in-out;
  }
`;

const StyledLinkHighlighter = styled.div`
  position: absolute;
  font-weight: 600;
  color: ${({ theme }) => theme.navigation.activeItem.color};
  background-color: ${({ theme }) => theme.navigation.activeItem.background};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 0 25px 10px ${({ theme }) => theme.colors.shadow};

  transition: all 0.6s cubic-bezier(0.21, 0.61, 0.36, 1);
`;

export interface NavigationItemProps extends NavLinkProps {
  title: string;
  onClick?: () => void;
}

interface NavigationBarProps {
  items: NavigationItemProps[];
}

const NavigationBar = ({ items }: NavigationBarProps): JSX.Element => {
  return (
    <StyledNavigationBar>
      {items.map(({ title, ...rest }) => (
        <StyledNavLink key={title} {...rest}>
          {title}
        </StyledNavLink>
      ))}
      <StyledLinkHighlighter />
    </StyledNavigationBar>
  );
};

export default NavigationBar;
