import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ActiveLink from './ActiveLink';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Sling as Hamburger } from 'hamburger-react';

const Header = ({ menuItems, logo }) => {
  const [isOpenHamb, setOpenHamb] = useState(false);

  const { pathname } = useRouter();

  return (
    <SCHeader>
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
              <Nav>
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

                <Hamburger
                  className="hamb"
                  toggled={isOpenHamb}
                  toggle={setOpenHamb}
                  color="#77838f"
                />
              </Nav>
            </Col>
          </SRow>
        </HeaderContainer>

        <MobileMenu>
          <div className={`mob-nav ${isOpenHamb ? 'show' : ''}`}>
            <MobileMenuList>
              {menuItems.map((item) => (
                <MenuItem key={item.id}>
                  <ActiveLink activeClassName="active-link" href={item.path}>
                    <a>{item.label}</a>
                  </ActiveLink>
                </MenuItem>
              ))}
            </MobileMenuList>
          </div>
        </MobileMenu>
      </Container>
    </SCHeader>
  );
};

const SCHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #fff;
  z-index: 3;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: -30px;

  .hamburger-react {
    z-index: 4;
    @media screen and (min-width: 1042px) {
      display: none;
    }
  }
`;

const LogoCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileMenu = styled.nav`
  .mob-nav {
    display: none;
    z-index: 3;
    -webkit-box-shadow: 1px 7px 30px -7px #f45757;
    box-shadow: 1px 7px 30px -7px #f45757;
  }
  .mob-nav.show {
    display: initial;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 10%;

    @media screen and (min-width: 640px) {
      left: 30%;
    }
    @media screen and (min-width: 768px) {
      left: 50%;
    }
    background: #fff;
    @media screen and (min-width: 1042px) {
      display: none;
    }
  }
`;

const MenuList = styled.ul`
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  margin-bottom: 0;
  @media screen and (min-width: 1042px) {
    display: flex;
  }
`;

const MobileMenuList = styled(MenuList)`
  display: flex;
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
