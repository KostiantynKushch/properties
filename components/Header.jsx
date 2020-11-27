import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

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
    <ul>
      {menuItems.map((item) => (
        <li key={item.id}>
          <Link href={item.path}>
            <a>{item.label}</a>
          </Link>
        </li>
      ))}
      <li>
        <Link href="/properties/single_property">
          <a>Single Property</a>
        </Link>
      </li>
    </ul>
  );
};

export default Header;
