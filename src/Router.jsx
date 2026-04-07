import { createBrowserRouter, RouterProvider } from 'react-router'
import StringRoutes from '~/Constants/StringRoutes'
import DashboardLayout from '~/layouts/DasboardLayout'
import Dashboard from './Pages/Dashboard'
import ProtectedRoutes from './components/Routes'

const DASHBOARD_ROUTES = [
  {
    path: '',
    Component: Dashboard,
    children: []
  }
]

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: StringRoutes.dashboard,
        Component: DashboardLayout,
        children: DASHBOARD_ROUTES
      },
    ]
  }
],
  {
    future: {
      v7_startTransition: true,
    },
    basename: '/DAR'
  },
)

export default function Router() {
  return <RouterProvider router={router} />
}
