import { useState, useEffect, memo } from 'react';
import { useQuery } from '@apollo/client';
import {
  PROPERTIES_ARCHIVE_PAGE,
  GENERAL_SETTINGS,
  OPTIONS_PAGE,
} from '../../lib/Queries';
import { initializeApollo } from '../../lib/apolloClient';
import parse from 'html-react-parser';

import PageHead from '../../components/PageHead';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import InnerHeroSection from '../../components/InnerHeroSection';
import TitleWithControlls from '../../components/TitleWithControlls';

const properties = () => {
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
  if (loading || settingsLoading || optionsLoading) return <p>Loading...</p>;
  if (error || settingsError || optionsError) return <p>Error :</p>;

  const { title, content } = data.pages.nodes[0];

  // search logic
  const router = useRouter();
  const {
    city: queryCity,
    checkin: queryCheckIn,
    checkout: queryCheckOut,
    guests: queryGuests,
  } = router.query;

  const [city, setCity] = useState(router.query.city || '');
  const [checkIn, setCheckIn] = useState(Date.parse(new Date()));
  const [checkOut, setCheckOut] = useState(Date.parse(new Date()));
  const [guests, setGuests] = useState(router.query.guests || '*');

  if (queryCheckIn && parseInt(queryCheckIn) !== checkIn) {
    setCheckIn(parseInt(queryCheckIn));
  }
  if (queryCheckOut && parseInt(queryCheckOut) !== checkOut) {
    setCheckOut(parseInt(queryCheckOut));
  }

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

  return (
    <>
      <PageHead page={title} />
      {settingsData && optionsData && (
        <MainLayout
          options={optionsData.pages.nodes[0].acfOptions}
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

          <TitleWithControlls title={title} content={parse(content)} />
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
