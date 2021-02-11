import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faListUl } from '@fortawesome/free-solid-svg-icons';

const TitleWithControls = ({
  title,
  perPage,
  setPerPage,
  orderBy,
  setOrderBy,
  listView,
  setListView,
}) => {
  const toggleView = () => {
    setListView(!listView);
  };
  return (
    <SCControls>
      <Container>
        <div className="delimiter">
          <Row>
            <Col sm="12" md="8">
              <div className="info">
                <h1>300+ Places to Stay</h1>
                <div className="info__displayed-items">
                  <select
                    name="per-page"
                    id="per-page"
                    className="per-page"
                    value={perPage}
                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                  <span>Showing 1-10 of 178</span>
                </div>
              </div>
            </Col>
            <Col sm="12" md="4">
              <div className="view-mode">
                <div className="order-by">
                  <select
                    name="order-by"
                    className="order-by__select"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <option value="DESC">Most recent</option>
                    <option value="ASC">Oldest</option>
                  </select>
                </div>
                <div className="mode-controls">
                  <span
                    onClick={toggleView}
                    className={`mode-controls__control mode-controls__tile ${
                      listView ? '' : 'mode-controls__tile--active'
                    }`}
                  >
                    <FontAwesomeIcon icon={faThLarge} className="icon" />
                  </span>
                  <span
                    onClick={toggleView}
                    className={`mode-controls__control mode-controls__list ${
                      listView ? 'mode-controls__list--active' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faListUl} className="icon" />
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </SCControls>
  );
};

export default TitleWithControls;

const SCControls = styled.div`
  .delimiter {
    padding: 80px 0 40px;
    border-bottom: 1px solid #eeeeee;
  }

  select {
    border-radius: 4px;
    border: none;
    outline: none;
    color: #77838f;
    height: 32px;
    padding-left: 10px;
    padding-right: 30px;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    background: url('/dropdown-arrow.svg') no-repeat;
    background-color: #f2f3f4;
    background-position-x: 94%;
    background-position-y: 50%;
    cursor: pointer;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 768px) {
      align-items: flex-start;
    }
    &__displayed-items {
      color: #77838f;
      select {
        background-position-x: 80%;
      }
      span {
        margin-left: 10px;
      }
    }
  }
  .view-mode {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    margin-bottom: 30px;
    @media screen and (min-width: 768px) {
      margin-bottom: 0;
      justify-content: flex-end;
    }

    .order-by {
      margin-right: 10px;
    }
    .mode-controls {
      margin-bottom: 4px;
      &__control {
        cursor: pointer;
        transition: background 0.5s ease;
        padding: 5px 9px;
        .icon {
          color: #77838f;
          font-size: 14px;
          transition: color 0.5s ease;
        }
        &:hover {
          background: #ffeeee;
          .icon {
            color: #f45757;
          }
        }
      }
      &__tile {
        background: #f2f3f4;
        border-radius: 4px 0px 0px 4px;
        &--active {
          background: #f45757;
          .icon {
            color: #fff;
          }
        }
      }
      &__list {
        background: #f2f3f4;
        border-radius: 0px 4px 4px 0px;
        &--active {
          background: #f45757;
          .icon {
            color: #fff;
          }
        }
      }
    }
  }
`;
