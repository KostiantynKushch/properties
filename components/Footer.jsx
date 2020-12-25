import { useQuery } from '@apollo/client';
import { OPTIONS_PAGE } from '../lib/Queries';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { getPhoneMask } from '../lib/utils';

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
    <StFooter>
      <Container fluid="xl">
        <div className="inner">
          <Row>
            <Col sm="12" md="6" lg="5">
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
            </Col>
            {navigation.map((item, index) => (
              <Col
                sm="6"
                md="3"
                lg="2"
                className="footer-navigation"
                key={index}
              >
                <p className="footer-navigation__title">
                  {item.columns.columnTitle}
                </p>
                <div className="footer-navigation__links">
                  {item.columns.navigationLinks.map((linkItem, index) => (
                    <div className="link-wraper" key={index}>
                      <Link href={linkItem.link.url}>
                        <a className="footer-navigation__link">
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="footer-navigation__arrow"
                          />

                          {linkItem.link.title}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </Col>
            ))}
            <Col sm="12" lg="3">
              <div className="contact-info">
                <div className="contact-info__title">
                  <p>{contactInfo.title}</p>
                </div>
                <div className="contact-info__address">
                  <p>{contactInfo.address}</p>
                </div>
                <div className="contact-info__phone">
                  <a href={`tel:${contactInfo.phone}`}>
                    Phone: {getPhoneMask(`${contactInfo.phone}`)}
                  </a>
                </div>
                <div className="contact-info__email">
                  <a href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="copyrighting">
          <p>
            <span>@{new Date().getFullYear()} </span>
            {copyrighting}
          </p>
        </div>
      </Container>
    </StFooter>
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

const StFooter = styled.footer`
  padding: 30px 0 10px;
  color: #77838f;
  @media screen and (min-width: 768px) {
    padding: 60px 0 28px;
  }

  .inner {
    @media screen and (min-width: 768px) {
      margin-bottom: 40px;
    }
  }

  .logo {
    margin-bottom: 10px;
  }
  .tag-line {
    color: inherit;
  }
  .footer-navigation {
    margin-bottom: 15px;
    &__title {
      font-size: 16px;
      margin-bottom: 5px;
      color: #1e2022;
    }
    &__link {
    }
    &__arrow {
      margin-right: 15px;
    }
  }
  .contact-info {
    margin-bottom: 15px;
    p {
      margin-bottom: 0;
    }

    &__title {
      color: #1e2022;
    }
    &__email,
    &__phone {
    }
  }
  .copyrighting {
    text-align: center;
    border-top: 1px solid #eeeeee;
    padding-top: 10px;
    p {
      margin-bottom: 0;
    }
    @media screen and (min-width: 768px) {
      padding-top: 25px;
    }
  }
`;

export default Footer;
