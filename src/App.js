import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routers from './routers';
import { getCurrentUser } from './stores/redux/actions/userActions';
import { decryptToken } from './utils/cryptoUtils';
import { startIdleTimer } from './utils/sessionUtils';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const encryptedToken = localStorage.getItem('access_token');
    const savedToken = decryptToken(encryptedToken);
    if (savedToken && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    let cleanup;
    if (isAuthenticated) {
      cleanup = startIdleTimer(dispatch);
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, [isAuthenticated, dispatch]);

  return (
    <Routers />
  );
}

export default App;
