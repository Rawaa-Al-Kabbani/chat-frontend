import { FunctionComponent, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../authentication";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    console.log("not logged in");
    return <Navigate to="/sign-in" replace />;
  }
  console.log("logged in");

  return <>{children}</>;
};

export default PrivateRoute;
