import { memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const SearchForm = ({
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
    <SCSearch>
      <form onSubmit={(e) => handleSearch(e)}>
        <Row>
          <Col sm="12" md="6" lg="3">
            <div className="field-container">
              <label htmlFor="city">Where</label>
              <input
                type="text"
                id="city"
                placeholder="Anywhere"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </Col>
          <Col sm="12" md="6" lg="2">
            <div className="field-container">
              <label>CHECK-IN</label>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={checkIn}
                onChange={(date) => setCheckIn(Date.parse(date))}
              />
            </div>
          </Col>
          <Col sm="12" md="6" lg="2">
            <div className="field-container">
              <label>CHECK-OUT</label>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={checkOut}
                onChange={(date) => setCheckOut(Date.parse(date))}
              />
            </div>
          </Col>
          <Col sm="12" md="6" lg="3">
            <div className="field-container">
              <label>GUESTS</label>
              <select
                name="guests"
                id="guests"
                className="guests-selector"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="*" disabled>
                  Guests
                </option>
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
            </div>
          </Col>
          <Col sm="12" lg="2">
            <div className="field-container btn">
              <button type="submit" className="submit-btn">
                Search
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </SCSearch>
  );
};

export default memo(SearchForm);

const SCSearch = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 48px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 18px 15px;
  color: #1e2022;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.458824px;
  text-transform: uppercase;
  color: #1e2022;

  .field-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
    @media screen and (min-width: 768px) {
      align-items: flex-start;
    }
  }
  .field-container.btn {
    padding: 0;
    @media screen and (min-width: 768px) {
      align-items: center;
    }
  }
  label {
    margin-bottom: 5px;
  }
  .guests-selector {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    background: url('/dropdown-arrow.svg') no-repeat;
    background-position-x: 94%;
    background-position-y: 50%;
    cursor: pointer;
  }
  .submit-btn {
    width: 100%;
    background: #f45757;
    border-radius: 4px;
    border: none;
    outline: none;
    color: #ffffff;
    height: 35px;
    transition: background ease 0.5s;
    &:hover {
      background: #ffeeee;
      color: #f45757;
    }
    @media screen and (min-width: 640px) {
      max-width: 150px;
    }
    @media screen and (min-width: 768px) {
      height: 53px;
      margin-top: 24px;
    }
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  input,
  select,
  input.react-datepicker-wrapper {
    width: 100%;
    background: #ffffff;
    border: 1px solid #d5dae2;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0.494118px;
    color: #99a2aa;
    height: 35px;
    padding: 0 17px;
    @media screen and (min-width: 768px) {
      height: 53px;
    }
    &:hover {
      border-color: #f45757;
    }
  }
`;
