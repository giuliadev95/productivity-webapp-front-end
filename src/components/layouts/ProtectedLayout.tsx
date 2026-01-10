import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";

// Components
import { Spinner } from "../ui/spinner";

// Library
import { createClient } from "../../lib/supabase/client";

export function ProtectedLayout(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;
  if (!authenticated) return <Navigate to="/login" replace />;

  function toggleSidebar(): void {
    setIsSidebarOpen((prev) => !prev);
  }

  function closeSidebar(): void {
    setIsSidebarOpen(false);
  }

  return (
    <div className="relative min-h-screen">
      {/* Background under the open Sidebar, grey, only when Sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50"
          aria-hidden="true"
        />
      )}

      {/* Sidebar (fixed width, slides in/out) */}
      <aside
        id="app-sidebar"
        className={[
          "fixed inset-y-0 left-0 z-50 w-64",
          "overflow-x-hidden bg-zinc-900 pt-16",
          "transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!isSidebarOpen}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeSidebar}
          className="absolute top-3 right-4 text-4xl text-gray-300 hover:text-white hover:cursor-pointer"
          aria-label="Close sidebar"
        >
          &times;
        </button>

        {/* Nav links - fixed container */}
        <div className="h-full overflow-y-auto">
          <div className="px-6 pb-6 text-lg font-semibold text-white border-b border-zinc-700">
            Productivity Manager
          </div>

          <nav className="px-2 py-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block py-3 pl-4 pr-4 text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 pl-4 pr-4 text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                >
                  Tasks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 pl-4 pr-4 text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 pl-4 pr-4 text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-3 pl-4 pr-4 text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                >
                  Settings
                </a>
              </li>
              <li className="pt-4 border-t border-zinc-700">
                <button
                  type="button"
                  className="block w-full py-3 pl-4 pr-4 text-left text-gray-400 transition-colors hover:text-red-400 hover:bg-zinc-800 rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content (fixed, sidebar slides over it) */}
      <div className="relative">
        {/* Top bar / toggle button */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-2 py-1 text-gray-700 border border-transparent hover:border-gray-800 hover:rounded-md hover:cursor-pointer transition-all"
              aria-expanded={isSidebarOpen}
              aria-controls="app-sidebar"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </header>

        <main className="p-6 bg-gray-50 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
