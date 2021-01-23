import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const TitleWithControlls = ({ title, content }) => {
  return (
    <SCControlls>
      <Container>
        <h1>{title}</h1>
        <div className="content">{content}</div>
      </Container>
    </SCControlls>
  );
};

export default TitleWithControlls;

const SCControlls = styled.div``;
