import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routers from './routers';
import { getCurrentUser } from './stores/redux/actions/userActions';
import { decryptToken } from './utils/cryptoUtils';
import Loading from './utils/loading';
import { startIdleTimer } from './utils/sessionUtils';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, checkedAuth } = useSelector((state) => state.user);

  useEffect(() => {
    const encryptedToken = localStorage.getItem('access_token');
    const savedToken = decryptToken(encryptedToken);

    if (!savedToken) {
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'AUTH_CHECKED' });
      return;
    }

    if (savedToken && !user) {
      dispatch(getCurrentUser());
    } else {
      dispatch({ type: 'AUTH_CHECKED' });
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

  if (!checkedAuth) {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading />
      </div>
    );
  }

  return <Routers />;
}

export default App;
