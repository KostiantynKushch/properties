import { useState, useEffect, memo } from 'react';
import { useQuery } from '@apollo/client';
import {
  PROPERTIES_ARCHIVE_PAGE,
  GENERAL_SETTINGS,
  OPTIONS_PAGE,
  GET_PROPERTIES,
} from '../../lib/Queries';
import { initializeApollo } from '../../lib/apolloClient';
import parse from 'html-react-parser';
import styled from 'styled-components';
import PageHead from '../../components/PageHead';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import InnerHeroSection from '../../components/InnerHeroSection';
import TitleWithControlls from '../../components/TitleWithControlls';
import PropSidebarFilter from '../../components/PropSidebarFilter';
import InnerDownloadSection from '../../components/InnerDownloadSection';
import PropertyCard from '../../components/PropertyCard';

const properties = () => {
  // loading data
  const { loading, error, data } = useQuery(PROPERTIES_ARCHIVE_PAGE);
  const {
    loading: propsLoading,
    error: propsError,
    data: propsData,
  } = useQuery(GET_PROPERTIES, {
    variables: { perPage: 10, offset: 0 },
  });
  const {
    loding: settingsLoading,
    error: settingsError,
    data: settingsData,
  } = useQuery(GENERAL_SETTINGS);
  const {
    loding: optionsLoading,
    error: optionsError,
    data: optionsData,
  } = useQuery(OPTIONS_PAGE);

  const { title } = data.pages.nodes[0];
  const { acfOptions } = optionsData.pages.nodes[0];

  // search logic
  const router = useRouter();
  const {
    city: queryCity,
    checkin: queryCheckIn,
    checkout: queryCheckOut,
    guests: queryGuests,
  } = router.query;

  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(Date.parse(new Date()));
  const [checkOut, setCheckOut] = useState(Date.parse(new Date()));
  const [guests, setGuests] = useState('*');

  useEffect(() => {
    if (queryCity) {
      setCity(queryCity);
    }
    if (queryCheckIn) {
      setCheckIn(parseInt(queryCheckIn));
    }
    if (queryCheckOut) {
      setCheckOut(parseInt(queryCheckOut));
    }
    if (queryGuests) {
      setGuests(queryGuests);
    }
  }, [router]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      queryCity !== city ||
      queryCheckIn !== checkIn ||
      queryCheckOut !== checkOut ||
      queryGuests !== guests
    ) {
      router.replace(
        `/properties/?city=${city}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
      );
    }
  };

  //   view settings
  const [perPage, setPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(1);
  const [listView, setListView] = useState(false);

  if (loading || propsLoading || settingsLoading || optionsLoading)
    return <p>Loading...</p>;
  if (error || propsError || settingsError || optionsError)
    return <p>Error :</p>;

  console.log(propsData);

  return (
    <>
      <PageHead page={title} />
      {settingsData && optionsData && (
        <MainLayout
          options={acfOptions}
          menuItems={settingsData.menus.nodes[0].menuItems.nodes}
        >
          <InnerHeroSection
            city={city}
            setCity={setCity}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            handleSearch={handleSearch}
          />

          <TitleWithControlls
            title={title}
            perPage={perPage}
            setPerPage={setPerPage}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            listView={listView}
            setListView={setListView}
          />
          {propsData && (
            <SCProperties>
              <Container>
                <Row>
                  <Col sm="12" lg="8">
                    <Row>
                      {propsData.properties.nodes.map((property) => (
                        <Col key={property.id}>
                          <PropertyCard
                            price={property.acfProperties.price}
                            location={property.acfProperties.location}
                            beds={property.acfProperties.highlights.beds}
                            bathrooms={
                              property.acfProperties.highlights.bathrooms
                            }
                            tvs={property.acfProperties.highlights.tvs}
                            sqft={property.acfProperties.highlights.sqft}
                            authorPic={property.author.node.avatar.url}
                            authorName={property.author.node.name}
                            date={property.date}
                            slug={property.slug}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col sm="12" lg="4">
                    <PropSidebarFilter />
                  </Col>
                </Row>
              </Container>
            </SCProperties>
          )}

          <InnerDownloadSection
            title={acfOptions.downloadTitle}
            description={acfOptions.downloadDescription}
            downloadButtons={acfOptions.downloadButtons}
          />
        </MainLayout>
      )}
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PROPERTIES_ARCHIVE_PAGE,
  });
  await apolloClient.query({
    query: GET_PROPERTIES,
  });

  await apolloClient.query({
    query: OPTIONS_PAGE,
  });
  await apolloClient.query({
    query: GENERAL_SETTINGS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default memo(properties);

const SCProperties = styled.div`
  padding: 80px 0 120px;
`;
