import React from "react";
import { Navigate } from "react-router";
import { useUser } from "../lib/auth";
import { paths } from "../config/paths";

interface ProtectedRouteProps {
  admin: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute = ({ admin, children }: ProtectedRouteProps) => {
  const user = useUser();

  if (!user.data || (!user.data.admin && admin))
    return (
      <Navigate
        to={paths.auth.unauthorized.getHref()}
        replace
      />
    );

  return children;
};

export default ProtectedRoute;
