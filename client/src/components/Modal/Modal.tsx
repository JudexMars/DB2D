import React from "react";
import { styled } from "styled-components";

import Button from "components/Button";
import Icon from "components/Icon";

const StyledBackground = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  font-size: 20px;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  width: 100%;
`;

const StyledButton = styled(Button)`
  background-color: inherit;
  padding: 0px;

  &:hover {
    background-color: inherit;
  }
`;

export interface ModalProps {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <StyledBackground>
      <StyledModal>
        <StyledTitle>
          <p>{title}</p>
          <StyledButton onClick={onClose}>
            <Icon type='CloseModal' />
          </StyledButton>
        </StyledTitle>
        {children}
      </StyledModal>
    </StyledBackground>
  );
};

export default Modal;
