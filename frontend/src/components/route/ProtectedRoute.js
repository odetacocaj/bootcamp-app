import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../actions/userActions";
import { Navigate } from "react-router-dom";

import Loading from "../layout/Loading";

function ProtectedRoute({ children, isAdmin }) {
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading]);
  if (loading) return <Loading/>;

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
