import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "~/hooks/Auth/useAuth";
import StringRoutes from "~/Constants/StringRoutes";

export default function ProtectedRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={StringRoutes.login} replace />
  }

  return <Outlet />
}
//
// export function DashboardRoute() {
//   const { user } = useAuth();
//   const role = user?.role?.toLowerCase();
//
//   if (!role?.includes('User')) {
//     return <Navigate to={StringRoutes.dashboard} replace />;
//   }
//
//   return <Outlet />;
// }
