import PageHead from '../components/PageHead';
import NewsletterSection from '../components/NewsletterSection';
import DownloadSection from '../components/DownloadSection';
import ReviewsSection from '../components/ReviewsSection';
import FeaturedPropertiesSection from '../components/FeaturedPropertiesSection';
import FeaturedCitiesSection from '../components/FeaturedCitiesSection';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { HOME_PAGE } from '../lib/Queries';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import { SCHeroSection, SCHeroInner } from '../styles/homeStyles';

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
    newsletter,
  } = acfHomeFields;
  const citiesStat = data.categories.nodes;

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

        {citiesSection && (
          <FeaturedCitiesSection
            tag={citiesSection.tag}
            title={citiesSection.title}
            shortDescription={citiesSection.shortDescription}
            featuredCities={citiesSection.featuredCities}
            citiesStat={citiesStat}
          />
        )}

        {properties && (
          <FeaturedPropertiesSection
            title={properties.title}
            tag={properties.tag}
            shortDescription={properties.shortDescription}
            featuredProperties={properties.featuredProperties}
          />
        )}

        {download && (
          <DownloadSection
            backgroundUrl={download.background.sourceUrl}
            tag={download.tag}
            title={download.title}
            downloadButtons={download.downloadButtons}
          />
        )}

        {reviewsSection && (
          <ReviewsSection
            tag={reviewsSection.tag}
            title={reviewsSection.title}
            description={reviewsSection.description}
            reviews={reviewsSection.reviews}
          />
        )}
        {newsletter && (
          <NewsletterSection
            title={newsletter.title}
            description={newsletter.description}
            formId={newsletter.formId}
            fieldId={newsletter.fieldId}
          />
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
