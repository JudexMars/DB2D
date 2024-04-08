import { darken } from "polished";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import Avatar from "components/Avatar";
import Button from "components/Button";
import DotMenu, { MenuItem } from "components/DotMenu";
import Icon from "components/Icon";

const StyledMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

const StyledDotsHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  width: 230px;
`;

const StyledDots = styled(Button)`
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0px;
  height: 24px;
  width: 24px;
  border-radius: ${({ theme }) => theme.borderRadius}px;

  &:hover {
    background-color: ${({ theme }) =>
      darken(0.05, theme.dotMenu.item.background)};
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const StyledName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const StyledRole = styled.p`
  font-size: 16px;
  font-weight: 300;
`;

const MemberCard = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  // Change on API implementation
  const menu: MenuItem[] = [
    {
      icon: "EditPen",
      title: "Изменить роль",
      onClick: () => setIsOpen(!isOpen),
    },
    {
      icon: "Kick",
      title: "Выгнать",
      onClick: () => setIsOpen(!isOpen),
    },
  ];

  return (
    <StyledMemberCard>
      <StyledDotsHeader>
        <StyledDots onClick={() => setIsOpen(!isOpen)}>
          <Icon type='Dots' />
        </StyledDots>
        {isOpen && (
          <DotMenu
            ref={menuRef}
            items={menu}
            onClose={() => setIsOpen(false)}
          />
        )}
      </StyledDotsHeader>
      <Avatar size={96} />
      <StyledInfo>
        <StyledName>Агарков</StyledName>
        <StyledRole>Фронтендер</StyledRole>
      </StyledInfo>
    </StyledMemberCard>
  );
};

export default MemberCard;
