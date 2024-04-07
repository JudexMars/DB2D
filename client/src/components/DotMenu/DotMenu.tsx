import { darken } from "polished";
import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import Button from "components/Button";
import Icon, { IconType } from "components/Icon/Icon";

const StyledMenu = styled.ul`
  position: absolute;
  top: 25px;
  right: -70px;
  gap: 5px;
  padding: 20px 10px 20px 10px;
  background-color: ${({ theme }) => theme.dotMenu.background};
  border: 1px solid ${({ theme }) => theme.dotMenu.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  backdrop-filter: blur(${({ theme }) => theme.blur}px);
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur}px);
`;

const StyledMenuItem = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.dotMenu.item.color};
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.dotMenu.item.background};
  }

  &:active {
    background-color: ${({ theme }) =>
      darken(0.05, theme.dotMenu.item.background)};
  }
`;

export interface DotMenuItemProps {
  iconType: IconType;
}

const DotMenuItem = ({
  iconType,
  children,
}: PropsWithChildren<DotMenuItemProps>): JSX.Element => {
  return (
    <StyledMenuItem>
      <Icon type={iconType} />
      <p>{children}</p>
    </StyledMenuItem>
  );
};

const handleOnFocus = () => {
  console.log("Focused");
};

const handleOnBlur = () => {
  console.log("Blurred");
};

const DotMenu = (): JSX.Element => {
  return (
    <StyledMenu onFocus={handleOnFocus} onBlur={handleOnBlur}>
      <DotMenuItem iconType='EditPen'>Изменить роль</DotMenuItem>
      <DotMenuItem iconType='Kick'>Выгнать</DotMenuItem>
    </StyledMenu>
  );
};

export default DotMenu;
