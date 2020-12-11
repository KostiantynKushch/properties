import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { HEADER_SETTINGS } from '../lib/Queries';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ActiveLink from './ActiveLink';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Sling as Hamburger } from 'hamburger-react';

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Header = () => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [isOpenHamb, setOpenHamb] = useState(false);

  const { pathname } = useRouter();

  const debouncedHandleResize = debounce(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 300);

  useEffect(() => {
    debouncedHandleResize();

    window.addEventListener('resize', debouncedHandleResize);

    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width <= 768) {
      if (isOpenHamb) setOpenHamb(false);
    }
  }, [pathname]);

  const { loading, error, data } = useQuery(HEADER_SETTINGS);
  if (loading) return <p>Loader ...</p>;
  if (error) return <p>Error : </p>;

  const menuItems = data.menus.nodes[0].menuItems.nodes;
  const { logo } = data.pages.nodes[0].acfOptions;
  return (
    <header>
      <Container fluid="xl">
        <HeaderContainer>
          <SRow>
            <LogoCol>
              <Link href="/">
                <a>
                  <img src={logo.mediaItemUrl} alt="Logo" />
                </a>
              </Link>
            </LogoCol>
            <Col>
              <Nav
                style={
                  dimensions.width <= 768
                    ? { justifyContent: 'flex-end', marginRight: '-30px' }
                    : {}
                }
              >
                {dimensions.width > 768 && (
                  <MenuList>
                    {menuItems.map((item) => (
                      <MenuItem key={item.id}>
                        <ActiveLink
                          activeClassName="active-link"
                          href={item.path}
                        >
                          <a>{item.label}</a>
                        </ActiveLink>
                      </MenuItem>
                    ))}
                  </MenuList>
                )}

                {dimensions.width <= 768 && (
                  <Hamburger
                    toggled={isOpenHamb}
                    toggle={setOpenHamb}
                    color="#77838f"
                  />
                )}
              </Nav>
            </Col>
          </SRow>
        </HeaderContainer>
        {dimensions.width <= 768 && (
          <MobileMenu>
            <MobileMenuContainer className={isOpenHamb ? 'show' : null}>
              <MobileMenuList>
                {menuItems.map((item) => (
                  <MenuItem key={item.id}>
                    <ActiveLink activeClassName="active-link" href={item.path}>
                      <a>{item.label}</a>
                    </ActiveLink>
                  </MenuItem>
                ))}
              </MobileMenuList>
            </MobileMenuContainer>
          </MobileMenu>
        )}
      </Container>
    </header>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: HEADER_SETTINGS,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LogoCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileMenu = styled.nav`
  position: relative;
  .show {
    background: #fff;
    transform: translateY(100vh);
  }
`;

const MobileMenuContainer = styled.div`
  position: absolute;
  top: -100vh;
  left: -15px;
  height: calc(100vh - 80px);
  width: 100vw;
  z-index: 3;
  transition: transform 0.5s ease;
`;

const MenuList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  margin-bottom: 0;
`;

const MobileMenuList = styled(MenuList)`
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const MenuItem = styled.li`
  list-style: none;
  a {
    color: #77838f;
  }
  a.active-link {
    color: #f45757;
  }
  a:hover {
    text-decoration: none;
    color: #f45757;
  }
`;

const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SRow = styled(Row)`
  width: 100%;
`;

export default Header;
