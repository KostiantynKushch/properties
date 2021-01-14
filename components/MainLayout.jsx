import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children, options, menuItems }) => {
  return (
    <>
      <Header logo={options.logo} menuItems={menuItems} />
      <main>{children}</main>
      <Footer options={options} />
    </>
  );
};

export default MainLayout;
