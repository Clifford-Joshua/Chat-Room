import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { socket } from "../components/socket";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userSignedUp =
    localStorage.getItem("user") === "true" ||
    sessionStorage.getItem("user") === "true";

  const userNotSet =
    localStorage.getItem("user") === null &&
    sessionStorage.getItem("user") === null;

  // user never signed up -> redirect to signup
  if (userNotSet) {
    return <Navigate to={"/signup"} />;
  }

  // user exists but not signed in
  if (!userSignedUp) {
    return <Navigate to={"/login"} />;
  }

  if (!token) {
    return <Navigate to={"/signup"} />;
  }

  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }

  return children;
};

export default ProtectRoute;
