import { Link, useNavigate } from "react-router-dom";
import { createClient } from "../lib/supabase/client";

// constants
import { sidebarLinks } from "../constants/SidebarLinks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sidebar component
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  // Function: Logout user from session
  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      {/* Black Backdrop under the open Sidebar - visible only when Sidebar is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
          aria-hidden="true"
        />
      )}

      {/* Sidebar - fixed width, slides in/out */}
      <aside
        id="app-sidebar"
        className={[
          "fixed inset-y-0 left-0 z-50 w-64",
          "overflow-x-hidden bg-zinc-900 pt-16",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-4xl text-gray-300 hover:text-white hover:cursor-pointer"
          aria-label="close sidebar"
        >
          &times;
        </button>

        {/* Nav links - fixed container */}
        <div className="h-full overflow-y-auto">
          <div className="px-6 pb-6 text-lg font-semibold text-white border-b border-zinc-700">
            User name
          </div>

          <nav className="px-2 py-4">
            <ul className="space-y-2">
              {sidebarLinks?.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="block py-3 pl-4 pr-4 text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/** Logout btn */}
              <li className="pt-4 border-t border-zinc-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full py-3 pl-4 pr-4 text-left text-gray-400 transition-colors hover:text-white hover:bg-zinc-800 rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
