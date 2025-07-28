import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { verifyUser } from "./VerifyUser";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/UsersSlice";

function PrivateRoute() {

  const dispatch = useDispatch()
  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

 useEffect(() => {
  const checkAuth = async () => {
    const result = await verifyUser(urlBack);
    setIsAuthenticated(result.isAuthenticated);

    if (result.isAuthenticated && result.user) {
      dispatch(addUser(result.user));
    }
  };
  checkAuth();
}, [urlBack, dispatch]);
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;