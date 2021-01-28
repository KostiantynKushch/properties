import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const PropSidebarFilter = () => {
  return (
    <SCSidebar>
      <div className="wraper">
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Amenities</p>
          </div>
          <div className=" controls-block__options controls-block__options--one-col">
            <Row>
              <Col>
                <div className="option">
                  <label className="option__checkbox">
                    <input type="checkbox" name="option" value="option" />
                    <span className="option__label">Option Name</span>
                  </label>
                </div>
                <div className="option">
                  <label className="option__checkbox">
                    <input type="checkbox" name="option" value="option" />
                    <span className="option__label">Option Name</span>
                  </label>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="controls-block">
          <div className="controls-block__header">
            <p>Amenities</p>
          </div>

          <div className=" controls-block__options controls-block__options--two-cols">
            <Row>
              <Col>
                <div className="option">
                  <label className="option__checkbox">
                    <input type="checkbox" name="option" value="option" />
                    <span className="option__label">Guest Suite</span>
                  </label>
                </div>
              </Col>
              <Col>
                <div className="option">
                  <label className="option__checkbox">
                    <input type="checkbox" name="option" value="option" />
                    <span className="option__label">Guesthouse</span>
                  </label>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </SCSidebar>
  );
};

export default PropSidebarFilter;

const SCSidebar = styled.div`
  max-width: 360px;
  .wraper {
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
          margin-top: 20px;
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
