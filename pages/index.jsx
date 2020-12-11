import PageHead from '../components/PageHead';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { HOME_PAGE } from '../lib/Queries';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

export default function Home() {
  const { loading, error, data } = useQuery(HOME_PAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const { title, acfHomeFields } = data.pages.nodes[0];
  const { heroTitle, citiesSection } = acfHomeFields;
  const citiesStat = data.categories.nodes;
  console.log(citiesStat);

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
                  <div className="section-tag">{citiesSection.tag}</div>
                  <h3 className="featured-cities__title">
                    {citiesSection.title}
                  </h3>
                  <div className="featured-cities__short-desc">
                    <p>{citiesSection.shortDescription}</p>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="featured-cities__cities cities">
              <Row>
                {citiesSection.featuredCities.map((city) => (
                  <Col lg="3" key={city.id}>
                    <div className="city">
                      <img
                        src={
                          city.featuredImage.node.mediaDetails.sizes[0]
                            .sourceUrl
                        }
                        alt={city.title}
                      />
                      <h4 className="city__title">{city.title}</h4>
                      <p className="city__listings">
                        {getListings(city.slug) || '0'} Listings
                      </p>
                      <div className="city__exerpt">{parse(city.excerpt)}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </FeaturedCities>
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

const FeaturedCities = styled.div`
  .city {
    img {
      max-width: 263px;
    }
  }
`;
