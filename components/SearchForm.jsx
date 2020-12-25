import { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(0);
  const router = useRouter();

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/properties/?city=${city}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="city">Where</label>
        <input
          type="text"
          id="city"
          placeholder="Anywhere"
          value={city}
          onChange={handleCityChange}
        />
        <label>CHECK-IN</label>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
        />
        <label>CHECK-OUT</label>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
        />
        <label>GUESTS</label>
        <select
          name="guests"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          <option value="0">Guests</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
