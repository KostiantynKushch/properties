import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PROPERTIES_IDS_TO_SHOW } from '../lib/Queries';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import * as R from 'ramda';
import { convertArrayToMatrix } from '../lib/utils';

const PropSidebarFilter = ({
  amenities,
  extras,
  accessibility,
  bedroom,
  propertyType,
  propsCategory,
  propsGuests,
  propsArrayToExclude,
  propertiesToShow,
  setPropertiesToShow,
}) => {
  const [taxID, setTaxID] = useState({ id: '', status: false });

  const [getIdsToShow, { loading, error, data }] = useLazyQuery(
    GET_PROPERTIES_IDS_TO_SHOW,
    {
      variables: {
        taxonomyID: taxID.id || '',
        category: propsCategory,
        guests: propsGuests,
        arrayToExclude: propsArrayToExclude,
      },
    }
  );

  const handleFiltering = (e) => {
    setTaxID({ ...taxID, id: e.target.value, status: e.target.checked });
    getIdsToShow();
  };

  const getIdsArray = (arrayOfObjects) => {
    let results = [];
    arrayOfObjects.map((objectItem) => results.push(objectItem.databaseId));
    return results;
  };

  useEffect(() => {
    if (data && taxID.status && !loading) {
      let tempArr = getIdsArray(data.propertyAmenity.properties.nodes);

      if (propertiesToShow && propertiesToShow.length > 0) {
        setPropertiesToShow(R.union(propertiesToShow, tempArr));
      } else {
        setPropertiesToShow(tempArr);
      }
    } else if (data && !taxID.status && !loading) {
      let tempArr = getIdsArray(data.propertyAmenity.properties.nodes);
      setPropertiesToShow(
        propertiesToShow.filter((el) => !tempArr.includes(el))
      );
    }
  }, [loading, data, taxID]);

  return (
    <SCSidebar>
      <div className="wrapper">
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Amenities</p>
          </div>
          <div className=" controls-block__options controls-block__options--two-cols">
            {amenities &&
              // display into two rows
              convertArrayToMatrix(amenities).map((row, index) => (
                <Row key={index}>
                  {row.map((col) => (
                    <Col key={col.id}>
                      <div className="option">
                        <label className="option__checkbox">
                          <input
                            type="checkbox"
                            name="option"
                            value={col.id}
                            onClick={handleFiltering}
                          />
                          <span className="option__label">{col.name}</span>
                        </label>
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
          </div>
        </div>
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Extras</p>
          </div>

          <div className=" controls-block__options controls-block__options--two-cols">
            {extras &&
              // display into two rows
              convertArrayToMatrix(extras).map((row, index) => (
                <Row key={index}>
                  {row.map((col) => (
                    <Col key={col.id}>
                      <div className="option">
                        <label className="option__checkbox">
                          <input
                            type="checkbox"
                            name="option"
                            value={col.id}
                            onClick={handleFiltering}
                          />
                          <span className="option__label">{col.name}</span>
                        </label>
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
          </div>
        </div>
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Accessibility</p>
          </div>
          <div className=" controls-block__options controls-block__options--one-col">
            <Row>
              <Col>
                {accessibility &&
                  accessibility.map((item) => (
                    <div className="option" key={item.id}>
                      <label className="option__checkbox">
                        <input
                          type="checkbox"
                          name="option"
                          value={item.id}
                          onClick={handleFiltering}
                        />
                        <span className="option__label">{item.name}</span>
                      </label>
                    </div>
                  ))}
              </Col>
            </Row>
          </div>
        </div>
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Bedroom</p>
          </div>
          <div className=" controls-block__options controls-block__options--one-col">
            <Row>
              <Col>
                {bedroom &&
                  bedroom.map((item) => (
                    <div className="option" key={item.id}>
                      <label className="option__checkbox">
                        <input
                          type="checkbox"
                          name="option"
                          value={item.id}
                          onClick={handleFiltering}
                        />
                        <span className="option__label">{item.name}</span>
                      </label>
                    </div>
                  ))}
              </Col>
            </Row>
          </div>
        </div>
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Property Type</p>
          </div>
          <div className=" controls-block__options controls-block__options--two-cols">
            {propertyType &&
              // display into two rows
              convertArrayToMatrix(propertyType).map((row, index) => (
                <Row key={index}>
                  {row.map((col) => (
                    <Col key={col.id}>
                      <div className="option">
                        <label className="option__checkbox">
                          <input
                            type="checkbox"
                            name="option"
                            value={col.id}
                            onClick={handleFiltering}
                          />
                          <span className="option__label">{col.name}</span>
                        </label>
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
          </div>
        </div>
      </div>
    </SCSidebar>
  );
};

export default PropSidebarFilter;

// TODO: add prop-types

const SCSidebar = styled.div`
  max-width: 360px;
  .wrapper {
    padding: 25px 25px 5px;
    background: #ffffff;
    box-shadow: 0px 2px 48px rgba(0, 0, 0, 0.06);
    border-radius: 4px;

    .controls-block {
      &__header {
        font-family: Nunito;
        font-size: 18px;
        letter-spacing: 0.675px;
        color: #1e2022;
      }

      &__options {
        margin-bottom: 20px;

        .option {
          position: relative;

          &__checkbox {
            margin: 0;
          }
          &__label {
            font-family: Nunito;
            font-size: 14px;
            letter-spacing: 0.494118px;
            color: #77838f;
            padding-left: 23px;
            cursor: pointer;
            &:hover {
              color: #f45959;
              transition: color 0.5 ease;
              &:before {
                border-color: #f45959;
                transition: border-color 0.5 ease;
              }
            }
            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
              border-radius: 4px;
              border: 1px solid #d5dae2;
              border-radius: 4px;
            }
          }
          &__checkbox input[type='checkbox'] {
            display: none;
          }
        }
        .option__checkbox
          input[type='checkbox']:checked
          ~ .option__label:before {
          background: url('/check-solid.svg') no-repeat center;
          background-size: 90%;
        }
        .option + .option {
          margin-top: 10px;
        }

        &--two-cols {
          .row {
            .col + .col {
              margin-left: -15px;
            }
          }
          .row + .row {
            margin-top: 10px;
          }
        }
      }
    }
    .controls-block + .controls-block {
      border-top: 1px solid #eeeeee;
      margin-top: 20px;
      padding-top: 20px;
    }
  }
`;
