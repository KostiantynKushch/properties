import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import SearchForm from './SearchForm';
import { useState } from 'react';
import { useRouter } from 'next/router';

const HomeHeroSection = ({ heroTitle }) => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(Date.parse(new Date()));
  const [checkOut, setCheckOut] = useState(Date.parse(new Date()));
  const [guests, setGuests] = useState('*');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/properties/?city=${city}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
    );
  };

  return (
    <SCHeroSection>
      <Container>
        <SCHeroInner>
          <div className="title">
            <h1>{heroTitle}</h1>
          </div>
          <div className="search">
            <SearchForm
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
          </div>
        </SCHeroInner>
      </Container>
    </SCHeroSection>
  );
};

export default HomeHeroSection;

const SCHeroSection = styled.div`
  background: #99a2aa;
  color: #fff;
  padding: 80px 0 15px;
`;
const SCHeroInner = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    max-width: 555px;
    text-align: center;
    margin-bottom: 20px;
    @media screen and (min-width: 640px) {
      margin-bottom: 30px;
    }
    @media screen and (min-width: 1024px) {
      margin-bottom: 100px;
    }
  }
  .search {
    width: 100%;
  }
`;
