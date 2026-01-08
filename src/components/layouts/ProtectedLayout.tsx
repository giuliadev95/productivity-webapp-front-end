import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Library
import { createClient } from "../../lib/supabase/client";

export function ProtectedLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
