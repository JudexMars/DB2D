import { darken } from "polished";
import { forwardRef, useState } from "react";
import { styled } from "styled-components";

import Button from "components/Button";
import Icon, { IconType } from "components/Icon/Icon";
import Modal from "components/Modal";

const StyledMenu = styled.ul`
  position: absolute;
  top: 25px;
  right: -70px;
  gap: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dotMenu.background};
  border: 1px solid ${({ theme }) => theme.dotMenu.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0px 5px 10px ${({ theme }) => theme.colors.shadow};
`;

const StyledMenuItem = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.dotMenu.item.color};
  font-weight: 500;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.dotMenu.item.background};
  }

  &:active {
    background-color: ${({ theme }) =>
      darken(0.05, theme.dotMenu.item.background)};
  }
`;

const ModalHolder = styled.div`
  width: 100%;
`;

export interface DotMenuItemProps {
  iconType: IconType;
}

export interface MenuItem {
  icon: IconType;
  title: string;
  modalTitle?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

interface DotMenuProps {
  items: MenuItem[];
  onClose: () => void;
}

const DotMenu = forwardRef<HTMLUListElement, DotMenuProps>(
  ({ items, onClose }: DotMenuProps): JSX.Element => {
    const [isDotMenuModalOpen, setIsDotMenuModalOpen] = useState(false);

    return (
      <StyledMenu tabIndex={0} ref={(ul) => ul?.focus()} onBlur={onClose}>
        {items.map(({ icon, title, modalTitle, children }) => (
          <ModalHolder key={title}>
            <StyledMenuItem
              onClick={() => setIsDotMenuModalOpen(!isDotMenuModalOpen)}
            >
              <Icon type={icon} />
              <p>{title}</p>
            </StyledMenuItem>
            {modalTitle && isDotMenuModalOpen && (
              <Modal
                title={modalTitle}
                onClose={() => setIsDotMenuModalOpen(!isDotMenuModalOpen)}
              >
                {children}
              </Modal>
            )}
          </ModalHolder>
        ))}
      </StyledMenu>
    );
  },
);
export default DotMenu;
