import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";

// Components
import { Spinner } from "../ui/spinner";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

// Libraries
import { createClient } from "../../lib/supabase/client";

// Layout component
export function ProtectedLayout(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Check for auth -> stop loading
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;
  if (!authenticated) return <Navigate to="/login" replace />;

  // Function : Open & Close the Sidebar
  function toggleSidebar(): void {
    setIsSidebarOpen((prev) => !prev);
  }

  function closeSidebar(): void {
    setIsSidebarOpen(false);
  }

  return (
    <div className="relative min-h-screen">
      {/* Pass props to child components */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main content (fixed, sidebar slides over it) */}
      <div className="relative">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className="p-6 bg-gray-50 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
