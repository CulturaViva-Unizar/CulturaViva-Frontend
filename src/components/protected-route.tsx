import React from "react";
import { Navigate, useLocation } from "react-router";
import { Role } from "../config/constants";
import { useUser } from "../lib/auth";
import { paths } from "../config/paths";

interface ProtectedRouteProps {
  admin: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute = ({ admin, children }: ProtectedRouteProps) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data || (!user.data.admin && admin))
    return (
      <Navigate
        to={paths.auth.unauthorized.getHref(location.pathname)}
        replace
      />
    );

  return children;
};

export default ProtectedRoute;
