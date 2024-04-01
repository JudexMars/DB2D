import { ToastContainer } from "react-toastify";
import { styled } from "styled-components";

interface ToastCenterProps {
  className?: string;
}

const ToastCenter = ({ className }: ToastCenterProps): JSX.Element => (
  <div className={className}>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  </div>
);

export interface StyledToastContainerProps {
  $variant?: string;
}

const StyledToastCenter = styled(ToastCenter)<StyledToastContainerProps>`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: ${({ theme }) => theme.colors.font};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
  .Toastify__toast-theme--dark {
  }
  .Toastify__toast-theme--light {
    background-color: ${({ theme }) => theme.toast.background};
  }
  .Toastify__close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 100%;
    color: white;
    background-color: ${({ theme }) => theme.colors.border};
  }
  .Toastify__toast-body {
  }
`;

export default StyledToastCenter;
