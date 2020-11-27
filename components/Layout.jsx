import { memo } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <h5>Footer</h5>
    </>
  );
};

export default memo(Layout);
