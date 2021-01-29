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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const properties = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(Date.parse(new Date()));
  const [checkOut, setCheckOut] = useState(Date.parse(new Date()));
  const [guests, setGuests] = useState('*');
  // loading data
  const { loading, error, data } = useQuery(PROPERTIES_ARCHIVE_PAGE);

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

  const {
    loading: propsLoading,
    error: propsError,
    data: propsData,
  } = useQuery(GET_PROPERTIES, {
    variables: {
      perPage: 10,
      offset: 0,
      category: queryCity,
      guests: queryGuests,
    },
  });

  //   view settings
  const [perPage, setPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(1);
  const [listView, setListView] = useState(false);

  if (loading || settingsLoading || optionsLoading) return <p>Loading...</p>;
  if (error || settingsError || optionsError) return <p>Error :</p>;
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

          <SCProperties>
            <Container>
              <Row>
                <Col sm="12" lg="8">
                  <Row>
                    {propsLoading && (
                      <>
                        <Col md="6">
                          <SkeletonTheme
                            color="#F2F3F4"
                            highlightColor="#fff"
                            className="skeleton"
                          >
                            <div className="skeleton">
                              <Skeleton height={230} />
                              <div className="skeleton__card-body">
                                <Skeleton
                                  height={26}
                                  width={172}
                                  className="skeleton__location"
                                />
                                <Skeleton
                                  height={26}
                                  width={241}
                                  className="skeleton__features"
                                />
                                <div className="skeleton__author author">
                                  <div className="author__icon">
                                    <Skeleton
                                      circle={true}
                                      height={60}
                                      width={60}
                                    />
                                  </div>
                                  <div className="author__info">
                                    <Skeleton height={26} width={88} />
                                    <Skeleton height={26} width={152} />
                                  </div>
                                </div>
                                <div className="skeleton__buttons">
                                  <Skeleton height={20} width={60} />
                                  <Skeleton height={50} width={150} />
                                </div>
                              </div>
                            </div>
                          </SkeletonTheme>
                        </Col>
                        <Col md="6">
                          <SkeletonTheme
                            color="#F2F3F4"
                            highlightColor="#fff"
                            className="skeleton"
                          >
                            <div className="skeleton">
                              <Skeleton height={230} />
                              <div className="skeleton__card-body">
                                <Skeleton
                                  height={26}
                                  width={172}
                                  className="skeleton__location"
                                />
                                <Skeleton
                                  height={26}
                                  width={241}
                                  className="skeleton__features"
                                />
                                <div className="skeleton__author author">
                                  <div className="author__icon">
                                    <Skeleton
                                      circle={true}
                                      height={60}
                                      width={60}
                                    />
                                  </div>
                                  <div className="author__info">
                                    <Skeleton height={26} width={88} />
                                    <Skeleton height={26} width={152} />
                                  </div>
                                </div>
                                <div className="skeleton__buttons">
                                  <Skeleton height={20} width={60} />
                                  <Skeleton height={50} width={150} />
                                </div>
                              </div>
                            </div>
                          </SkeletonTheme>
                        </Col>
                        <Col md="6">
                          <SkeletonTheme
                            color="#F2F3F4"
                            highlightColor="#fff"
                            className="skeleton"
                          >
                            <div className="skeleton">
                              <Skeleton height={230} />
                              <div className="skeleton__card-body">
                                <Skeleton
                                  height={26}
                                  width={172}
                                  className="skeleton__location"
                                />
                                <Skeleton
                                  height={26}
                                  width={241}
                                  className="skeleton__features"
                                />
                                <div className="skeleton__author author">
                                  <div className="author__icon">
                                    <Skeleton
                                      circle={true}
                                      height={60}
                                      width={60}
                                    />
                                  </div>
                                  <div className="author__info">
                                    <Skeleton height={26} width={88} />
                                    <Skeleton height={26} width={152} />
                                  </div>
                                </div>
                                <div className="skeleton__buttons">
                                  <Skeleton height={20} width={60} />
                                  <Skeleton height={50} width={150} />
                                </div>
                              </div>
                            </div>
                          </SkeletonTheme>
                        </Col>
                        <Col md="6">
                          <SkeletonTheme
                            color="#F2F3F4"
                            highlightColor="#fff"
                            className="skeleton"
                          >
                            <div className="skeleton">
                              <Skeleton height={230} />
                              <div className="skeleton__card-body">
                                <Skeleton
                                  height={26}
                                  width={172}
                                  className="skeleton__location"
                                />
                                <Skeleton
                                  height={26}
                                  width={241}
                                  className="skeleton__features"
                                />
                                <div className="skeleton__author author">
                                  <div className="author__icon">
                                    <Skeleton
                                      circle={true}
                                      height={60}
                                      width={60}
                                    />
                                  </div>
                                  <div className="author__info">
                                    <Skeleton height={26} width={88} />
                                    <Skeleton height={26} width={152} />
                                  </div>
                                </div>
                                <div className="skeleton__buttons">
                                  <Skeleton height={20} width={60} />
                                  <Skeleton height={50} width={150} />
                                </div>
                              </div>
                            </div>
                          </SkeletonTheme>
                        </Col>
                      </>
                    )}
                    {propsError && <p>Properties can't be loaded</p>}
                    {!propsLoading &&
                      !propsError &&
                      propsData &&
                      propsData.properties.nodes.map((property) => (
                        <Col key={property.id}>
                          <PropertyCard
                            backgrounUrl={property.featuredImage.node.sourceUrl}
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

  .skeleton {
    &__card-body {
      padding: 25px;
    }
    &__location {
      margin-bottom: 10px;
    }
    &__features {
      margin-bottom: 10px;
    }
    &__author {
      margin-bottom: 15px;
    }
    &__buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .author {
      display: flex;
      align-items: center;
      &__icon {
        margin-right: 15px;
      }
      &__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }
  }
`;
