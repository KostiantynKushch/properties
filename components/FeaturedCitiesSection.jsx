import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SCSection } from '../styles/commonStyledComponents';
import SectionHeader from './SectionHeader';
import Link from 'next/link';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

const FeaturedCitiesSection = ({
  tag,
  title,
  shortDescription,
  featuredCities,
  citiesStat,
}) => {
  const getListings = (slug = null) => {
    if (!slug) return;
    const cityCount = citiesStat.filter((item) => item.slug === slug);
    return cityCount.length === 0 ? null : cityCount[0].count;
  };
  return (
    <SCFeaturedCities className="featured-cities">
      <Container>
        <Row>
          <Col>
            <SectionHeader
              tag={tag}
              title={title}
              description={shortDescription}
            />
          </Col>
        </Row>

        <div className="featured-cities__cities cities">
          <Row>
            {featuredCities.map((city) => (
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
                      <div className="city__excerpt">{parse(city.excerpt)}</div>
                    </a>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </SCFeaturedCities>
  );
};

export default FeaturedCitiesSection;

FeaturedCitiesSection.propTypes = {
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  featuredCities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      featuredImage: PropTypes.shape({
        node: PropTypes.shape({
          sourceUrl: PropTypes.string,
        }),
      }),
    }).isRequired
  ).isRequired,
  citiesStat: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      slug: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const SCFeaturedCities = styled(SCSection)`
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
    &__query-link {
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
    &__excerpt {
      max-width: 212px;
      margin: 0 auto;
      color: #77838f;
      &:hover {
        color: #77838f;
      }
    }
  }
`;
