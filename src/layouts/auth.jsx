import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import routes from "@/routes";

export function Auth() {
  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/home",
      icon: UserIcon,
    },
    {
      name: "sign up",
      path: "/auth/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/auth/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Navbar routes={navbarRoutes} />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "auth" &&
                pages.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
