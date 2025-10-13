import { useState } from 'react';

const useNotification = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 4000);
  };

  return { message, messageType, showMessage };
};

export const NotificationStyles = () => (
  <style>{`
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .input-focus:focus {
      outline: none;
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }

    .btn-hover:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    }

    .btn-hover:active:not(:disabled) {
      transform: translateY(0);
    }

    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    .slide-in {
      animation: slideIn 0.3s ease-out;
    }
  `}</style>
);

export default useNotification;
