import { createBrowserRouter } from "react-router-dom";

// components
import { LoginForm } from "../components/forms/login-form";
import { SignUpForm } from "../components/forms/sign-up-form";
import Dashboard from "../components/protected/Dashboard";
import ForgotPassword from "../components/auth/ForgotPassword";
import UpdatePassword from "../components/auth/UpdatePassword";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";

export const router = createBrowserRouter([
  // public routes
  { path: "/login", element: <LoginForm /> },
  { path: "/sign-up", element: <SignUpForm /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/update-password", element: <UpdatePassword /> },
  // private routes
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      // future future protected routes go here
    ],
  },
]);
