import styled from 'styled-components';
import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Notification = ({ onToggle, show, title, message, time }) => {
  return (
    <SCNotify>
      <Toast show={show} onClose={onToggle} className="notification">
        <Toast.Header className="notification__header">
          <div className="notification__icon">
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
          </div>
          <strong className="mr-auto">{title}</strong>
          <small className="notification__time">{time}</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </SCNotify>
  );
};

export default Notification;

// onToggle, show, title, message, time
Notification.propTypes = {
  onToggle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string,
};

const SCNotify = styled.div`
  .notification {
    position: fixed;
    z-index: 2;
    top: 10px;
    right: 10px;
    width: 100%;
    &__header {
    }
    &__icon {
      background: linear-gradient(135deg, #f45757 0.59%, #ff9292 100%);
      margin-right: 10px;
      padding: 3px;
      border-radius: 4px;
    }
    &__time {
      padding-top: 5px;
    }
  }
`;
