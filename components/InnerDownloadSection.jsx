import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SCSection } from '../styles/commonStyledComponens';
import PropTypes from 'prop-types';

const DownloadSection = ({ title, description, downloadButtons }) => {
  return (
    <SCDownload>
      <Container>
        <Row>
          <Col>
            <div className="download">
              <h2 className="download__title">{title}</h2>
              <div className="download__description">
                <p>{description}</p>
              </div>
              <div className="download__buttons">
                {downloadButtons.map((button) => (
                  <div className="download__btn" key={button.buttonIcon.id}>
                    <a href={button.buttonLink} target="_blank">
                      <img
                        src={button.buttonIcon.sourceUrl}
                        alt={button.buttonIcon.altText}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </SCDownload>
  );
};

export default DownloadSection;

DownloadSection.propTypes = {};

const SCDownload = styled(SCSection)`
  padding: 130px 0;
  background-color: #f7fafd;
  color: #77838f;
  .download {
    &__title {
      color: #1e2022;
      font-size: 1.45rem;
      margin-bottom: 20px;
    }
    &__description {
      max-width: 457px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__btn {
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .download__btn + .download__btn {
    margin-top: 15px;
    @media screen and (min-width: 768px) {
      margin-top: 0px;
      margin-left: 20px;
    }
  }

  @media screen and (min-width: 768px) {
    .download {
      max-width: 50%;
      margin: 0 auto;
      &__title {
        font-size: 3.45rem;
        margin-bottom: 10px;
      }
      &__description {
        margin-bottom: 40px;
      }
      &__buttons {
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
