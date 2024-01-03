import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading) return <h1>Loading</h1>;

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}
