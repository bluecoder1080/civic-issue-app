import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage, MainApp, ReportForm } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <MainApp />,
  },
  {
    path: '/report',
    element: <ReportForm />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
