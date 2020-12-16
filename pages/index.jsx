import PageHead from '../components/PageHead';
import SectionHeader from '../components/SectionHeader';
import ReviewsSlider from '../components/ReviewsSlider';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { HOME_PAGE } from '../lib/Queries';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { Container, Row, Col } from 'react-bootstrap';
import {
  SCHeroSection,
  SCHeroInner,
  SCFeaturedCities,
  SCFeaturedProperties,
  SCPropertyCard,
  SCDownload,
  SCReviews,
} from '../styles/homeStyles';
import {
  SCSectionTag,
  SCSectionTagDark,
} from '../styles/commonStyledComponens';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faTv,
  faSquare,
  faMapMarkerAlt,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { numFormating, dateFormat } from '../lib/utils';

export default function Home() {
  const { loading, error, data } = useQuery(HOME_PAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const { title, acfHomeFields } = data.pages.nodes[0];
  const {
    heroTitle,
    citiesSection,
    properties,
    download,
    reviewsSection,
  } = acfHomeFields;
  const citiesStat = data.categories.nodes;
  const {
    title: propTitle,
    tag: propTag,
    shortDescription: propDesc,
    featuredProperties,
  } = properties;

  console.log(reviewsSection);

  const getListings = (slug = null) => {
    if (!slug) return;
    const cityCount = citiesStat.filter((item) => item.slug === slug);
    return cityCount.length === 0 ? null : cityCount[0].count;
  };

  return (
    <>
      <PageHead page={title} />
      <main>
        <SCHeroSection>
          <Container>
            <SCHeroInner>
              <div className="title">
                <h1>{heroTitle}</h1>
              </div>
            </SCHeroInner>
          </Container>
        </SCHeroSection>
        <SCFeaturedCities className="featured-cities">
          <Container>
            <Row>
              <Col>
                <SectionHeader
                  tag={citiesSection.tag}
                  title={citiesSection.title}
                  description={citiesSection.shortDescription}
                />
              </Col>
            </Row>

            <div className="featured-cities__cities cities">
              <Row>
                {citiesSection.featuredCities.map((city) => (
                  <Col md="6" lg="3" key={city.id}>
                    <div className="city">
                      <Link href={`/properties?city=${city.slug}`}>
                        <a className="city__query-link">
                          <img
                            src={city.featuredImage.node.sourceUrl}
                            alt={city.title}
                          />
                          <h4 className="city__title">{city.title}</h4>
                          <p className="city__listings">
                            {getListings(city.slug) || '0'} Listings
                          </p>
                          <div className="city__exerpt">
                            {parse(city.excerpt)}
                          </div>
                        </a>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </SCFeaturedCities>
        <SCFeaturedProperties className="featured-properties">
          <Container>
            <Row>
              <Col>
                <SectionHeader
                  tag={propTag}
                  title={propTitle}
                  description={propDesc}
                />
              </Col>
            </Row>
            <div className="featured-properties__cities properties">
              <Row>
                {featuredProperties.map((property) => (
                  <Col key={property.id} sm="12" lg="4">
                    <SCPropertyCard>
                      <div
                        className="header"
                        style={{
                          background: `url(${property.featuredImage.node.sourceUrl}) no-repeat`,
                          backgroundSize: 'cover',
                          backgroundPositionX: 0,
                          backgroundPositionY: '100%',
                        }}
                      >
                        <div className="header__overlay"></div>

                        <div className="price">
                          <p>
                            {' '}
                            <span className="price__amount">
                              ${property.acfProperties.price}
                            </span>{' '}
                            / Night
                          </p>
                        </div>
                      </div>
                      <div className="body">
                        <div className="body__main-info info">
                          <div className="info__location">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="marker"
                            />
                            {property.acfProperties.location}
                          </div>
                          <div className="info__features">
                            <div className="beds">
                              <FontAwesomeIcon icon={faBed} />{' '}
                              <span>
                                {property.acfProperties.highlights.beds}
                              </span>
                            </div>
                            <div className="bathrooms">
                              <FontAwesomeIcon icon={faBath} />{' '}
                              <span>
                                {property.acfProperties.highlights.bathrooms}
                              </span>
                            </div>
                            <div className="tvs">
                              <FontAwesomeIcon icon={faBed} />{' '}
                              <span>
                                {property.acfProperties.highlights.tvs}
                              </span>
                            </div>
                            <div className="sqft">
                              <FontAwesomeIcon icon={faSquare} />{' '}
                              <span>
                                {numFormating(
                                  property.acfProperties.highlights.sqft
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="body__author author">
                          <div className="author__picture">
                            <img
                              src={property.author.node.avatar.url}
                              alt={property.author.node.name}
                            />
                          </div>
                          <div className="author__details details">
                            <div className="details__author-name">
                              {property.author.node.name}
                            </div>
                            <div className="details__publish-date">
                              <span>Listed on </span>
                              {dateFormat(property.date)}
                            </div>
                          </div>
                        </div>
                        <div className="body__actions actions">
                          <div className="actions__save">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="star-icon"
                            />
                            <span>Save</span>
                          </div>
                          <Link href={`/properties/${property.slug}`}>
                            <div className="actions__details">
                              <a>Details</a>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SCPropertyCard>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </SCFeaturedProperties>
        <SCDownload
          style={{
            background: `url(${download.background.sourceUrl}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <Container>
            <Row>
              <Col>
                <div className="download">
                  <SCSectionTagDark className="tag">
                    <span>{download.tag}</span>
                  </SCSectionTagDark>
                  <h2 className="download__title">{download.title}</h2>
                  <div className="download__buttons">
                    {download.downloadButtons.map((button) => (
                      <div className="download__btn" key={button.buttonIcon.id}>
                        <a href={button.buttonLink} target="_blank">
                          <img
                            src={button.buttonIcon.sourceUrl}
                            alt={button.buttonIcon.altText}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </SCDownload>
        {reviewsSection && (
          <SCReviews>
            <Container>
              <Row>
                <Col>
                  <SectionHeader
                    tag={reviewsSection.tag}
                    title={reviewsSection.title}
                    description={reviewsSection.description}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ReviewsSlider reviews={reviewsSection.reviews} />
                </Col>
              </Row>
            </Container>
          </SCReviews>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: HOME_PAGE,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}
