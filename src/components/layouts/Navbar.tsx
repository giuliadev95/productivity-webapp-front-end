interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center gap-2 px-2 py-1 text-gray-700 border border-transparent hover:border-gray-800 hover:rounded-md hover:cursor-pointer transition-all"
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
        >
          <span className="text-xl">☰</span>
        </button>

        <div className="w-24"> {/* Spacer for centering */}</div>
      </div>
    </header>
  );
}
