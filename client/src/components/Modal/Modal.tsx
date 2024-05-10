import { styled } from "styled-components";

const StyledBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ModalProps {
  title: string;
  content: string;
  applyButton: string;
  cancelButton?: string;
  onApply: () => void;
}

const Modal = ({
  title,
  content,
  applyButton,
  cancelButton,
  onApply,
}: ModalProps) => {
  return (
    <StyledModal>
      <div>{title}</div>
      <div>{content}</div>
      <div>{applyButton}</div>
      <div>{cancelButton}</div>
      <button onClick={onApply} type='submit'>
        Apply
      </button>
    </StyledModal>
  );
};

export default Modal;
