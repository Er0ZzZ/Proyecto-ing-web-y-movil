import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext, Rol } from '../context/AppContext';

interface ProtectedRouteProps extends RouteProps {
  rol?: Rol;
}

/**
 * Si no hay usuario → redirige a /auth/login.
 * Si se exige un rol y el del usuario no coincide → redirige a su home correspondiente.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rol, children, ...rest }) => {
  const { user } = useAppContext();

  return (
    <Route
      {...rest}
      render={({ location }): React.ReactElement => {
        if (!user) {
          return <Redirect to={{ pathname: '/auth/login', state: { from: location } }} />;
        }
        if (rol && user.rol !== rol) {
          const fallback = user.rol === 'admin' ? '/admin/dashboard' : '/ciudadano/home';
          return <Redirect to={fallback} />;
        }
        return <>{children}</>;
      }}
    />
  );
};

export default ProtectedRoute;
