import React from 'react';

import { Navigate } from 'react-router-dom';
import routes from '../routes';

interface GuardedRouteProps {
  children: JSX.Element;
}

function GuardedRoute({ children }: GuardedRouteProps) {
  const isAuthenticated = React.useMemo(() => {
    const user = localStorage.getItem('user');
    return !!user;
  }, []);

  return isAuthenticated ? children : <Navigate to={routes.auth.login} />;
}

export default GuardedRoute;
