import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { OPTIONS_PAGE } from '../lib/Queries';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Link from 'next/link';

const Footer = () => {
  const { loading, error, data } = useQuery(OPTIONS_PAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const {
    logo,
    tagline,
    navigation,
    contactInfo,
    copyrighting,
  } = data.pages.nodes[0].acfOptions;
  return (
    <Footer>
      <Container>
        <Row>
          <Col>
            <Logo>
              <Link href="/">
                <a>
                  <img src={logo.mediaItemUrl} alt="Logo" />
                </a>
              </Link>
            </Logo>

            <p>{tagline}</p>
          </Col>

          {navigation.map((column) => (
            <Col key={column.columns.columnTitle}>
              {column.columns.columnTitle}
              {column.columns.navigationLinks.map((item) => (
                <ul>
                  <li>
                    <Link href={item.link.url}>
                      <a>{item.link.title}</a>
                    </Link>
                  </li>
                </ul>
              ))}
            </Col>
          ))}

          <Col>
            <div>{contactInfo.title}</div>
            <div>{contactInfo.address}</div>
            <div>{contactInfo.phone}</div>
            <div>{contactInfo.email}</div>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: OPTIONS_PAGE,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

const Logo = styled.div`
  width: 100%;
`;

export default Footer;
