import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SCSection, SCSectionTagDark } from '../styles/commonStyledComponens';
import PropTypes from 'prop-types';

const DownloadSection = ({ backgroundUrl, tag, title, downloadButtons }) => {
  return (
    <SCDownload
      style={{
        background: `url(${backgroundUrl}) no-repeat`,
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Row>
          <Col>
            <div className="download">
              <SCSectionTagDark className="tag">
                <span>{tag}</span>
              </SCSectionTagDark>
              <h2 className="download__title">{title}</h2>
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

DownloadSection.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  downloadButtons: PropTypes.arrayOf(
    PropTypes.shape({
      buttonLink: PropTypes.string.isRequired,
      buttonIcon: PropTypes.shape({
        id: PropTypes.string.isRequired,
        altText: PropTypes.string,
        sourceUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

const SCDownload = styled(SCSection)`
  color: #fff;
  .download {
    &__title {
      font-size: 1.45rem;
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
  }

  @media screen and (min-width: 1024px) {
    .download {
      max-width: 50%;
      margin: 0 auto;
      &__title {
        font-size: 3.45rem;
        margin-bottom: 40px;
      }
      &__buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
`;
