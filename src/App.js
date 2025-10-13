import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routers from './routers';
import { getCurrentUser } from './stores/redux/actions/userActions';
import { startIdleTimer } from './utils/sessionUtils';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken && !token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);

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
    <>
      <Routers />
    </>
  );
}

export default App;
