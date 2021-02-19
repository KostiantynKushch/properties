import { useState, useEffect, useRef, memo } from 'react';
import { useQuery } from '@apollo/client';
import {
  PROPERTIES_ARCHIVE_PAGE,
  GENERAL_SETTINGS,
  OPTIONS_PAGE,
  GET_PROPERTIES_ID_TO_EXCLUDE,
  GET_PROPERTIES,
} from '../../lib/Queries';
import { initializeApollo } from '../../lib/apolloClient';
import { dateFormatForBackPiker } from '../../lib/utils';
import styled from 'styled-components';
import PageHead from '../../components/PageHead';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import InnerHeroSection from '../../components/InnerHeroSection';
import TitleWithControls from '../../components/TitleWithControls';
import PropSidebarFilter from '../../components/PropSidebarFilter';
import InnerDownloadSection from '../../components/InnerDownloadSection';
import PropertiesCardsList from '../../components/PropertiesCardsList';
import PropertiesPreloader from '../../components/PropertiesPreloader';
import PropertiesPagination from '../../components/PropertiesPagination';
import range from 'ramda/src/range';

const properties = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(Date.parse(new Date()));
  const [rCheckIn, setRCheckIn] = useState(dateFormatForBackPiker(checkIn));
  const [checkOut, setCheckOut] = useState(Date.parse(new Date()));
  const [rCheckOut, setRCheckOut] = useState(dateFormatForBackPiker(checkOut));
  const [guests, setGuests] = useState('*');
  //   view settings
  const [totalPosts, setTotalPosts] = useState(0);
  const [offSetPagination, setOffSetPagination] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState('DESC');
  const [listView, setListView] = useState(false);
  //TODO: change to reactive variables https://www.apollographql.com/docs/react/local-state/reactive-variables/
  const [idsToExclude, setIdsToExclude] = useState([]);
  const [propertiesToShow, setPropertiesToShow] = useState([]);

  // loading page data
  const { loading, error, data } = useQuery(PROPERTIES_ARCHIVE_PAGE);
  const {
    loading: settingsLoading,
    error: settingsError,
    data: settingsData,
  } = useQuery(GENERAL_SETTINGS);
  const {
    loading: optionsLoading,
    error: optionsError,
    data: optionsData,
  } = useQuery(OPTIONS_PAGE);

  const { title } = data.pages.nodes[0];
  const { acfOptions } = optionsData.pages.nodes[0];
  // --- end loading page data

  // getting parameters from router query for properties search
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
      setRCheckIn(dateFormatForBackPiker(checkIn));
    }
    if (queryCheckOut) {
      setCheckOut(parseInt(queryCheckOut));
      setRCheckOut(dateFormatForBackPiker(checkOut));
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
  // --- end of search parameters

  //   display properties

  const {
    loading: excludeIDsLoading,
    error: excludeIDsError,
    data: excludeIDs,
  } = useQuery(GET_PROPERTIES_ID_TO_EXCLUDE, {
    variables: {
      checkIn: rCheckIn,
      checkOut: rCheckOut,
    },
  });

  useEffect(() => {
    if (excludeIDs) {
      setIdsToExclude(excludeIDs.getPostIDsToExclude);
    }
  }, [excludeIDs]);

  const {
    loading: propsLoading,
    error: propsError,
    data: propsData,
  } = useQuery(GET_PROPERTIES, {
    skip: !excludeIDs,
    variables: {
      perPage: perPage,
      offset: offSetPagination,
      category: queryCity,
      guests: queryGuests,
      dateOrder: orderBy,
      arrayToExclude: idsToExclude,
      propertiesToShow: propertiesToShow,
    },
  });

  // start pagination
  useEffect(() => {
    setPages(range(1, Math.ceil(totalPosts / perPage + 1), 1));
  }, [totalPosts, perPage]);

  useEffect(() => {
    if (pages.length > 1) {
      setCurrentPage(1);
    }
  }, [pages]);

  const getOffsetNumber = (perPage, currentPage, clickedPage) => {
    if (clickedPage === currentPage) return;
    if (clickedPage === 1) return 0;
    if (clickedPage > 1) return perPage * (clickedPage - 1);
  };

  const titleRef = useRef(null);

  const scrollToTitle = () =>
    titleRef.current.scrollIntoView({
      behavior: 'smooth',
    });

  const handlePageSwitching = (e) => {
    const clickedPage = parseInt(e.target.value);
    setCurrentPage(clickedPage);
    setOffSetPagination(getOffsetNumber(perPage, currentPage, clickedPage));
    scrollToTitle();
  };
  // end pagination

  //TODO: add excerpt to properties (missed in graphql)
  //TODO: for mobiles move filter into modal (start display desktop filter from 1200px)

  useEffect(() => {
    if (!propsLoading && !propsError && propsData) {
      setTotalPosts(propsData.properties.pageInfo.offsetPagination.total);
    }
  }, [propsData]);

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

          <TitleWithControls
            ref={titleRef}
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
                    {excludeIDsLoading ||
                      (propsLoading && (
                        <PropertiesPreloader listView={listView} />
                      ))}
                    {excludeIDsError ||
                      (propsError && <p>Properties can't be loaded</p>)}
                    {!excludeIDsLoading &&
                      !propsLoading &&
                      !excludeIDsError &&
                      !propsError &&
                      excludeIDs &&
                      propsData && (
                        <PropertiesCardsList
                          propsData={propsData}
                          listView={listView}
                        />
                      )}
                  </Row>
                  <Row>
                    <Col>
                      <div className="pagination-wrapper">
                        <PropertiesPagination
                          pages={pages}
                          currentPage={currentPage}
                          handlePageSwitching={handlePageSwitching}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" lg="4">
                  <PropSidebarFilter
                    amenities={data.propertyAmenities.nodes}
                    extras={data.propertyExtras.nodes}
                    accessibility={data.propertyAccessibilities.nodes}
                    bedroom={data.propertyBedrooms.nodes}
                    propertyType={data.propertyPropertyTypes.nodes}
                    propertiesToShow={propertiesToShow}
                    setPropertiesToShow={setPropertiesToShow}
                    propsCategory={queryCity}
                    propsGuests={queryGuests}
                    propsArrayToExclude={idsToExclude}
                  />
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
  .pagination-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
  }
`;
