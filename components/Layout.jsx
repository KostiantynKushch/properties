import { memo } from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <Container fluid="xl">
      <Header />

      {children}

      <h5>Footer</h5>
    </Container>
  );
};

export default memo(Layout);
