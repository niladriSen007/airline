import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-lime-950 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
