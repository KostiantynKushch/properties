import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { SCSection } from '../styles/commonStyledComponens';

const HomeHeroSection = ({ heroTitle }) => {
  return (
    <SCHeroSection>
      <Container>
        <SCHeroInner>
          <div className="title">
            <h1>{heroTitle}</h1>
          </div>
        </SCHeroInner>
      </Container>
    </SCHeroSection>
  );
};

export default HomeHeroSection;

const SCHeroSection = styled.div`
  background: #99a2aa;
  color: #fff;
`;
const SCHeroInner = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    max-width: 555px;
    text-align: center;
  }
`;
