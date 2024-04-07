import { styled } from "styled-components";

import Header, { HeaderProps } from "./components/Header";

const StyledSettingsSection = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const StyledHorizontalContent = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledSeparation = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0px 20px 0px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export enum SectionVariant {
  Veritcal = "vertical",
  Horizontal = "horizontal",
}

interface SectionProps extends HeaderProps {
  variant?: SectionVariant;
  children?: React.ReactNode;
}

const SettingsSection = ({
  title,
  description,
  variant = SectionVariant.Veritcal,
  children,
}: SectionProps): JSX.Element => {
  if (variant === SectionVariant.Horizontal) {
    return (
      <StyledSettingsSection>
        <StyledHorizontalContent>
          <Header title={title} description={description} />
          {children}
        </StyledHorizontalContent>
        <StyledSeparation />
      </StyledSettingsSection>
    );
  }

  return (
    <StyledSettingsSection>
      <Header title={title} description={description} />
      <StyledSeparation />
      {children}
    </StyledSettingsSection>
  );
};

export default SettingsSection;
