import { styled } from "styled-components";

import Icon, { IconType } from "components/Icon";

const StyledOptionValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;

  border: 1px solid ${({ theme }) => theme.form.input.colors.border};
`;

const StyledValue = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.form.input.colors.font};
`;

interface OptionValueProps {
  icon: IconType;
  title: string;
}

const OptionValue = ({ icon, title }: OptionValueProps): JSX.Element => {
  return (
    <StyledOptionValue>
      <StyledIconWrapper>
        <Icon type={icon} />
      </StyledIconWrapper>
      <StyledValue>{title}</StyledValue>
    </StyledOptionValue>
  );
};

export default OptionValue;
