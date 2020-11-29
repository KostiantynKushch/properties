import { useQuery } from '@apollo/client';
import { HEADER_SETTINGS } from '../lib/Queries';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Link from 'next/link';
import ActiveLink from './ActiveLink';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Header = () => {
  const { loading, error, data } = useQuery(HEADER_SETTINGS);
  if (loading) return <p>Loader ...</p>;
  if (error) return <p>Error :</p>;

  const menuItems = data.menus.nodes[0].menuItems.nodes;

  return (
    <HeaderContainer>
      <SRow>
        <Col>
          <Link href="/">
            <a>
              <img src="/logo_dark.png" alt="" />
            </a>
          </Link>
        </Col>
        <Col>
          <Nav>
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem key={item.id}>
                  <ActiveLink activeClassName="active-link" href={item.path}>
                    <a>{item.label}</a>
                  </ActiveLink>
                </MenuItem>
              ))}
            </MenuList>
          </Nav>
        </Col>
      </SRow>
    </HeaderContainer>
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

const MenuList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  margin-bottom: 0;
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
