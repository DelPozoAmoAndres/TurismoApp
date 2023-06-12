import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/AuthContexts';

interface AdminRouteProps {
  component: React.ComponentType<any>;
  alternativePath: string;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<AdminRouteProps> = ({ component: Component, alternativePath, ...rest }) => {
  const auth = useAuth();
  return <Route {...rest} render={(props) => (auth.token ? <Component {...props} /> : <Redirect to={alternativePath} />)} />;
};

export default PrivateRoute;
