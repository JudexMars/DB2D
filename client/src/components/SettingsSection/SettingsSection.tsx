import { styled } from "styled-components";

const StyledSection = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const StyledTitle = styled.h1`
  font-weight: 600px;
  font-size: 20px;
`;

const StyledDescription = styled.h3`
  font-weight: 400;
  font-size: 16px;
`;

const StyledSeparation = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0px 20px 0px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export interface SectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Section = ({
  title,
  description,
  children,
}: SectionProps): JSX.Element => {
  return (
    <StyledSection>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      <StyledSeparation />
      {children}
    </StyledSection>
  );
};

export default Section;
