import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";

// Components
import { Spinner } from "../ui/spinner";

// Library
import { createClient } from "../../lib/supabase/client";

// Protected layout renders the layout fot authenticated users. It has Sidebar + Navbar + Outlet
export function ProtectedLayout(): JSX.Element {
  // Set Loader abd auth states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Set sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Check if user is authenticated
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  function toggleSidebar(): void {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <div>
      {/**
        Loader
       * 
       */}
      <button onClick={toggleSidebar}>Open Sidebar</button>
      {isSidebarOpen && (
        <ul>
          <div>Logo</div>
          <li>Account Settings</li>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Logout</li>
        </ul>
      )}
      <Outlet />
    </div>
  );
}

{
  /**
  UPDATE THIS COMPONENT WITH IMPORTS: NAVBAR, SIDEBAR

    return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>


    RESOURCES:
      State Management: useState for sidebar open/close
      Responsive Design: Mobile-first with Tailwind classes
      TypeScript: Proper interfaces and type safety
      React Router: Navigation and active states
      Event Handling: Click handlers and backdrop clicks
  */
}
