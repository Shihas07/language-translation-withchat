import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRouteUser = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const jwtFromCookie = Cookies.get("token");
    console.log("jwt", jwtFromCookie);

    if (!jwtFromCookie) {
      navigate("/login");
    } else {
      console.log('authentication true');
      setIsAuthorized(true);
    }
  }, [navigate]);

  // Render loading or null while checking authorization
  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  // Render the children when authorized
  return <>{children}</>;
};

export default ProtectedRouteUser;
