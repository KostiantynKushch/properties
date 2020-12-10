import { useQuery } from '@apollo/client';
import { OPTIONS_PAGE } from '../lib/Queries';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const { loading, error, data } = useQuery(OPTIONS_PAGE);
  if (loading) return <p>Loader ...</p>;
  if (error) return <p>Error : </p>;

  const {
    logo,
    contactInfo,
    navigation,
    tagline,
    copyrighting,
  } = data.pages.nodes[0].acfOptions;

  return (
    <Container fluid="xl">
      <div className="logo">
        <Link href="/">
          <a>
            <img src={logo.mediaItemUrl} alt="Logo" />
          </a>
        </Link>
      </div>
      <div className="tag-line">
        <p>{tagline}</p>
      </div>
      <div className="contact-info">
        <div className="contact-info__title">
          <p>{contactInfo.title}</p>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-info__email">
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-info__address">
          <p>{contactInfo.address}</p>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-info__phone">
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
        </div>
      </div>
      <div className="footer-navigation">
        {navigation.map((item, index) => (
          <div className="footer-navigation__column" key={index}>
            <p>{item.columns.columnTitle}</p>
            <hr></hr>
            <div className="footer-navigation__links">
              {item.columns.navigationLinks.map((linkItem, index) => (
                <div className="link" key={index}>
                  <Link href={linkItem.link.url}>
                    <a>{linkItem.link.title}</a>
                  </Link>
                </div>
              ))}
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
      <div className="footer-copyrighting">
        <p>
          <span>@{new Date().getFullYear()} </span>
          {copyrighting}
        </p>
      </div>
    </Container>
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

export default Footer;
