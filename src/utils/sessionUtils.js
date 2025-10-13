import { logout } from '../stores/redux/actions/userActions';

let timeoutId;

export const startIdleTimer = (dispatch) => {
  const resetTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => dispatch(logout()), 30 * 60 * 1000);
  };

  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keydown', resetTimer);
  window.addEventListener('scroll', resetTimer);
  resetTimer();

  return () => {
    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('keydown', resetTimer);
    window.removeEventListener('scroll', resetTimer);
    clearTimeout(timeoutId);
  };
};
