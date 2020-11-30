import { memo } from 'react';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <Container fluid="xl">
      {children}

      <h5>Footer</h5>
    </Container>
  );
};

export default memo(Layout);
