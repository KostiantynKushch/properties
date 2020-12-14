import PageHead from '../components/PageHead';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { HOME_PAGE } from '../lib/Queries';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
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
  const { heroTitle, citiesSection, properties, download } = acfHomeFields;
  const citiesStat = data.categories.nodes;
  const {
    title: propTitle,
    tag: propTag,
    shortDescription: propDesc,
    featuredProperties,
  } = properties;

  const getListings = (slug = null) => {
    if (!slug) return;
    const cityCount = citiesStat.filter((item) => item.slug === slug);
    return cityCount.length === 0 ? null : cityCount[0].count;
  };

  return (
    <>
      <PageHead page={title} />
      <main>
        <HeroSection>
          <Container>
            <HeroInner>
              <div className="title">
                <h1>{heroTitle}</h1>
              </div>
            </HeroInner>
          </Container>
        </HeroSection>
        <FeaturedCities className="featured-cities">
          <Container>
            <Row>
              <Col>
                <div className="featured-cities__header">
                  <SectionTag>
                    <span>{citiesSection.tag}</span>
                  </SectionTag>
                  <h2 className="featured-cities__title">
                    {citiesSection.title}
                  </h2>
                  <div className="featured-cities__short-desc">
                    <p>{citiesSection.shortDescription}</p>
                  </div>
                </div>
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
        </FeaturedCities>
        <FeaturedProperties className="featured-properties">
          <Container>
            <Row>
              <Col>
                <div className="featured-properties__header">
                  <SectionTag>
                    <span>{propTag}</span>
                  </SectionTag>
                  <h2 className="featured-properties__title">{propTitle}</h2>
                  <div className="featured-properties__short-desc">
                    <p>{propDesc}</p>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="featured-properties__cities properties">
              <Row>
                {featuredProperties.map((property) => (
                  <Col key={property.id} sm="12" lg="4">
                    <PropertyCard>
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
                    </PropertyCard>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </FeaturedProperties>
        <Download
          style={{
            background: `url(${download.background.sourceUrl}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <Container>
            <Row>
              <Col>
                <div className="download">
                  <SectionTagDark className="tag">
                    <span>{download.tag}</span>
                  </SectionTagDark>
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
        </Download>
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

const HeroSection = styled.div`
  background: #99a2aa;
  color: #fff;
`;
const HeroInner = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    max-width: 555px;
    text-align: center;
  }
`;

const Section = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
  @media screen and (min-width: 1024px) {
    padding: 120px 0;
  }
  text-align: center;
  color: #77838f;
`;

const FeaturedCities = styled(Section)`
  
  .featured-cities {
    &__header {
      margin-bottom: 30px;
    }
    &__title {
      color: #1e2022;
    }
    &__short-desc {
      max-width: 457px;
      margin: 0 auto;
      margin-bottom: 40px;
    }
  }
  .city {
    display: flex;
    flex-direction: column;
    align-items: center;
	 justify-content: center;
	 border-radius: 4px;
	 transition: box-shadow 0.5s ease;
	 &:hover {
    -webkit-box-shadow: 1px 7px 30px -7px #f45757;
    box-shadow: 1px 7px 30px -7px #f45757;
  }
	 &__query-link{
		 text-decoration: none;
	 }
    img {
      width: 100%;
      max-width: 263px;
      height: 150px;
      object-fit: cover;
      border-radius: 4px 4px 0 0;
      margin-bottom: 15px;
    }
    &__title {
      color: #1e2022;
    }
    &__listings {
      color: #f45757;
      margin-bottom: 10px;
    }
    &__exerpt {
		max-width: 212px;
		margin: 0 auto;
		color: #77838f;
		&:hover{
			color: #77838f;
		}
	 }
	}
  }
`;

const FeaturedProperties = styled(Section)`
  text-align: center;
  background: #f7fafd;
  a {
    text-decoration: none;
  }

  .featured-properties {
    &__title {
      color: #1e2022;
    }
    &__short-desc {
      max-width: 457px;
      margin: 0 auto;
      margin-bottom: 40px;
    }
  }
`;

const SectionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 0.7rem;
    text-align: center;
    background: #ffeeee;
    color: #f45757;
    padding: 5px 20px;
    border-radius: 16px;
    margin-bottom: 15px;
  }
`;

const PropertyCard = styled.div`
  max-width: 360px;
  margin: 0 auto 30px auto;
  color: #77838f;
  border-radius: 4px;
  transition: box-shadow 0.5s ease;
  @media screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
  &:hover {
    -webkit-box-shadow: 1px 7px 30px -7px #f45757;
    box-shadow: 1px 7px 30px -7px #f45757;
  }

  .header {
    height: 230px;
    width: 100%;
    border-radius: 4px 4px 0 0;
    position: relative;
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 2;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.0001) 0%,
        rgba(0, 0, 0, 0.403901) 100%
      );
    }
  }
  .body {
    padding: 15px;
    @media screen and (min-width: 768px) {
      padding: 25px;
    }
    &__main-info {
    }
  }
  .price {
    position: absolute;
    z-index: 3;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    color: #fff;
    p {
      margin-bottom: 0;
    }
    &__amount {
      font-weight: 700;
    }
  }

  .info {
    &__location {
      color: #f45757;
      text-align: left;
      margin-bottom: 10px;
      .marker {
        margin-right: 5px;
      }
    }
    &__features {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #1e2022;
      }
    }
  }
  .author {
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 16px 0;
    margin-bottom: 15px;
    &__picture {
      margin-right: 15px;
      max-width: 60px;
      img {
        border-radius: 50%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
  .details {
    &__author-name {
      text-align: left;
      color: #1e2022;
    }
    &__publish-date {
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__save {
      font-weight: 600;
      .star-icon {
        margin-right: 9px;
      }
    }
    &__details {
      cursor: pointer;
      padding: 15px 48px;
      background: #ffeeee;
      transition: background 0.5s ease;
      a {
        font-weight: 600;
        color: #f45757;
        transition: color 0.1s ease;
      }
      &:hover {
        background: #f45757;
        a {
          color: #ffeeee;
        }
      }
    }
  }
`;

const Download = styled(Section)`
  color: #fff;
  .download {
    &__title {
      font-size: 1.45rem;
      margin-bottom: 20px;
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__btn {
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .download__btn + .download__btn {
    margin-top: 15px;
  }

  @media screen and (min-width: 1024px) {
    .download {
      max-width: 50%;
      margin: 0 auto;
      &__title {
        font-size: 3.45rem;
        margin-bottom: 40px;
      }
      &__buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
`;

const SectionTagDark = styled(SectionTag)`
  span {
    padding: 5px 40px;
    background: rgba(0, 0, 0, 0.15);
    color: #fff;
  }
`;
