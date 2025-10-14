import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routers from './routers';
import { getCurrentUser } from './stores/redux/actions/userActions';
import { startIdleTimer } from './utils/sessionUtils';

function App() {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
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
    <>
      <Routers />
    </>
  );
}

export default App;
