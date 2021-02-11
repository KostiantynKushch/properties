import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  CREATE_NEWSLETTER_DRAFT,
  UPDATE_NEWSLETTER_VALUE,
  SUBMIT_NEWSLETTER_FORM,
} from '../lib/Queries';
import { validateEmail } from '../lib/utils';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { SCSection } from '../styles/commonStyledComponents';
import Notification from './Notification';
import PropTypes from 'prop-types';

const NewsletterSection = ({ title, description, formId, fieldId }) => {
  const [email, setEmail] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationTime, setNotificationTime] = useState(null);

  const toggleNotification = (message) => {
    if (notification && notificationMessage && !message) {
      setNotification(false);
      setNotificationMessage('');
    } else {
      setNotification(true);
      setNotificationTime(new Date().toLocaleTimeString());
      setNotificationMessage(message);
    }

    setTimeout(() => {
      setNotification(false);
      setNotificationMessage('');
    }, 5000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [
    createDraft,
    { loading: draftLoading, data: draftData, error: draftError },
  ] = useMutation(CREATE_NEWSLETTER_DRAFT);
  const [
    updateDraft,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation(UPDATE_NEWSLETTER_VALUE);
  const [
    submitForm,
    { loading: submitLoading, data: submitData, error: submitError },
  ] = useMutation(SUBMIT_NEWSLETTER_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      createDraft({ variables: { formId: formId } });
      setNotificationMessage('');
    } else {
      toggleNotification("Oops! Your email doesn't valid!");
    }
  };

  useEffect(() => {
    if (
      draftLoading === false &&
      draftData !== undefined &&
      formSending === false &&
      validateEmail(email)
    ) {
      const token = draftData.createGravityFormsDraftEntry.resumeToken;
      updateDraft({
        variables: { fieldId: fieldId, resumeToken: token, value: email },
      });
      setFormSending(true);
    }
  }, [draftLoading]);

  useEffect(() => {
    if (
      updateLoading === false &&
      updateData !== undefined &&
      formSending === true
    ) {
      const token =
        updateData.updateDraftEntryEmailFieldValue.entry.resumeToken;
      submitForm({ variables: { resumeToken: token } });
    }
  }, [updateLoading]);

  useEffect(() => {
    if (
      submitLoading === false &&
      submitData !== undefined &&
      formSending === true
    ) {
      setEmail('');
      setFormSending(false);
      toggleNotification('Thank you for the Subscription!');
    }
  }, [submitLoading]);

  useEffect(() => {
    if (draftError || updateError || submitError) {
      setFormSending(false);
      toggleNotification('Oops! An error occurred, please try again latter.');
    }
  }, [draftError, updateError, submitError]);
  return (
    <>
      <SCNewsLetter>
        <Container>
          <Row>
            <Col>
              <h2>{title}</h2>
              <div className="description">
                <p>{description}</p>
              </div>

              <form onSubmit={handleSubmit} className="subscribe-form">
                <input
                  className="email-field"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={formSending ? true : false}
                  placeholder="Enter your email address"
                />
                <button
                  className="submit"
                  type="submit"
                  disabled={formSending ? true : false}
                >
                  <svg
                    width="21"
                    height="21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.688.98a.698.698 0 01.3.714l-2.856 17.143a.704.704 0 01-.357.502.685.685 0 01-.614.034l-5.882-2.4-3.326 3.65a.658.658 0 01-.524.234.635.635 0 01-.257-.044.661.661 0 01-.335-.268.692.692 0 01-.123-.402v-5.045l-5.268-2.154c-.275-.104-.424-.309-.446-.614-.022-.29.097-.51.357-.658L19.93.958c.26-.157.513-.15.759.022zM16.87 17.71l2.466-14.766-16.004 9.23 3.75 1.53 9.631-7.133-5.334 8.896 5.49 2.243z"
                      fill="#fff"
                    />
                  </svg>
                </button>
                {formSending && (
                  <div className="loading-spinner">
                    <Spinner
                      animation="border"
                      variant="secondary"
                      className="loading-spinner__body"
                    />
                  </div>
                )}
              </form>
            </Col>
          </Row>
        </Container>
      </SCNewsLetter>
      <Notification
        show={notification}
        onToggle={() => toggleNotification()}
        title="Hotel Properties"
        message={notificationMessage}
        time={notificationTime}
      />
    </>
  );
};

export default NewsletterSection;
NewsletterSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  formId: PropTypes.number,
  FieldId: PropTypes.number,
};

const SCNewsLetter = styled(SCSection)`
  background: #f7fafd;
  h2 {
    color: #1e2022;
  }
  .description {
    max-width: 457px;
    margin: 0 auto 40px;
  }
  .subscribe-form {
    position: relative;
    max-width: 457px;
    margin: 0 auto;
  }
  .email-field {
    border: none;
    outline: none;
    width: 100%;
    height: 52px;
    padding: 6px 65px 6px 19px;
    border-radius: 4px;
    &:focus {
      box-shadow: inset 0px 0px 0px 1px #fd8a8a;
    }
    &::placeholder {
      color: #77838f;
    }
  }
  .submit {
    position: absolute;
    z-index: 2;
    right: 6px;
    top: -27%;
    transform: translateY(50%);
    background: linear-gradient(135deg, #f45757 0.59%, #ff9292 100%);
    border-radius: 4px;
    border: none;
    outline: none;
    width: 40px;
    height: 40px;
    svg {
      transition: transform 0.5s ease;
    }
    &:hover {
      svg {
        transform: rotate(60deg) translate(-2px, -2px);
      }
    }
  }
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &__body {
      color: #fd8a8a;
    }
  }
`;
