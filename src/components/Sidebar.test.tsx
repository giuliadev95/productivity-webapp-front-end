import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./Sidebar";

// mock navigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// mock supabase
vi.mock("../lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signOut: vi.fn(),
    },
  }),
}));

describe("Sidebar", () => {
  it("is not visible when its state 'isOpen' useState equals to false", () => {
    render(
      <BrowserRouter>
        <Sidebar isOpen={false} onClose={vi.fn()} />
      </BrowserRouter>
    );
    const sidebar = screen.getByRole("complementary", { hidden: true }); // This must be inside the 'it'
    expect(sidebar).toHaveAttribute("aria-hidden", "true");
  });
});

it("Call the 'onClose function when clicking the backdrop", () => {
  const onClose = vi.fn();
  render(
    <BrowserRouter>
      <Sidebar isOpen={true} onClose={onClose} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByLabelText(/close sidebar/i)); // the aria label text is case insensitive, it picks original labels like 'Close Sidebar', 'Close sidebar', and 'close sidebar'.
  expect(onClose).toHaveBeenCalled(); // This allows the test to reliably select the close button, regardless of capitalization, and simulate a user clicking it.
});
