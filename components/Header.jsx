import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const HEADER_SETTINGS = gql`
  query GetMainMenu {
    __typename
    menus(where: { location: PRIMARY }) {
      nodes {
        menuItems {
          nodes {
            id
            label
            path
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(HEADER_SETTINGS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const menuItems = data.menus.nodes[0].menuItems.nodes;
  return (
    <Row>
      <Col>
        <Nav>
          <MenuList>
            {menuItems.map((item) => (
              <MenuItem key={item.id}>
                <Link href={item.path}>
                  <a>{item.label}</a>
                </Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Link href="/properties/single_property">
                <a>Single Property</a>
              </Link>
            </MenuItem>
          </MenuList>
        </Nav>
      </Col>
    </Row>
  );
};

const Nav = styled.nav``;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuItem = styled.li`
  list-style: none;

  a:hover {
    text-decoration: none;
  }
`;

export default Header;
