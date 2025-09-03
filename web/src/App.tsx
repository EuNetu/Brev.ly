import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'
import { RedirectPage } from './pages/redirect'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
  {
    path: '/:code',
    element: <RedirectPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}