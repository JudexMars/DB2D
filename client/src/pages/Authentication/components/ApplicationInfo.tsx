import { styled } from "styled-components";

const StyledApplicationInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 10%;
  gap: 30px;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, #677fff, #aa9cbb);
  color: #ffffff;
  clip-path: circle(76% at 82% 34%);
`;

const Title = styled.h1`
  font-size: 96px;
`;

const SubTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  font-weight: 400;
`;

const ApplicationInfo = (): JSX.Element => {
  return (
    <StyledApplicationInfo>
      <Title>DB2D</Title>
      <SubTitle>
        Database tool for developing
        <br />
        departments in big companies
      </SubTitle>
    </StyledApplicationInfo>
  );
};

export default ApplicationInfo;
