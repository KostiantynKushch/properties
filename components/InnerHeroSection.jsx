import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import SearchForm from './SearchForm';

const InnerHeroSection = ({
  city,
  setCity,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  handleSearch,
}) => {
  return (
    <SCHero>
      <Container>
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
      </Container>
    </SCHero>
  );
};

export default InnerHeroSection;

const SCHero = styled.div`
  background: #f7fafd;
  padding: 116px 0 36px;
`;
