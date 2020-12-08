import { useQuery } from '@apollo/client';
import { OPTIONS_PAGE } from '../lib/Queries';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
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
  } = data.pages.nodes[0].acfOptions;

  console.log(navigation);

  return (
    <Container>
      <div className="logo">
        <img src={logo.mediaItemUrl} alt="" />
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
          <p>{contactInfo.email}</p>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-info__address">
          <p>{contactInfo.address}</p>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-info__phone">
          <p>{contactInfo.phone}</p>
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
                  <p>{linkItem.link.title}</p>
                </div>
              ))}
            </div>
            <hr></hr>
          </div>
        ))}
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
