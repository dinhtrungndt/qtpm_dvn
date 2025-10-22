import { useEffect, useState } from 'react';

const Notification = ({ message, messageType, duration = 4000 }) => {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!message || !isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-16px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-16px);
            opacity: 0;
          }
        }
      `}</style>
      <div
        onClick={handleDismiss}
        className={`
          fixed top-4 right-4 z-50
          px-5 py-3 rounded-md
          max-w-sm w-full
          shadow-xl
          transition-all duration-300
          animate-[slideIn_0.3s_ease-out]
          ${!isVisible && 'animate-[slideOut_0.3s_ease-in_forwards]'}
          cursor-pointer
          select-none
          ${
            messageType === 'error'
              ? 'bg-red-50 text-red-900 border-l-4 border-red-600'
              : messageType === 'info'
              ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-600'
              : 'bg-green-50 text-green-900 border-l-4 border-green-600'
          }
          dark:bg-opacity-90 dark:text-opacity-95
          dark:border-opacity-90
          sm:max-w-xs
          hover:shadow-2xl
          hover:bg-opacity-95
        `}
        role="alert"
        aria-live="assertive"
      >
        <span className="text-sm font-semibold tracking-tight">{message}</span>
      </div>
    </>
  );
};

export default Notification;
