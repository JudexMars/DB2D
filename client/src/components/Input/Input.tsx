import { forwardRef } from "react";
import { styled } from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const StyledLabel = styled.label`
  padding: 0px 20px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  color: ${({ theme }) => theme.form.input.colors.font};
  font-size: 20px;
  font-weight: 600;
`;

const StyledInput = styled.input`
  padding: 15px 20px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.form.input.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  color: ${({ theme }) => theme.form.input.colors.font};
  font-size: 20px;
  font-weight: 200;
`;

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, ...rest }: InputProps, ref): JSX.Element => {
    return (
      <StyledWrapper>
        {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
        <StyledInput id={label} ref={ref} placeholder={placeholder} {...rest} />
      </StyledWrapper>
    );
  },
);

export default Input;
