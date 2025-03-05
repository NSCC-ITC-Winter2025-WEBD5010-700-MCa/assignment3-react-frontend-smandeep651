import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserRoles from '../pages/UserRoles';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../pages/Dashboard';
import AutoResponse from '../pages/AutoResponse';
import Customers from '../pages/Customers';
import Subscriptions from '../pages/Subscriptions';
import Books from '../pages/Books';
import BookCreate from '../components/Books/BooksCreate';
import BookEdit from '../components/Books/BookEdit';
import Sites from '../pages/Books';
import SitesCreate from '../components/Books/BooksCreate';
import SitesEdit from '../components/Books/BookEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'user-roles',
        element: <UserRoles />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
        path: 'auto-response',
        element: <AutoResponse />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'books/create',
        element: <BookCreate />,
      },
      {
        path: '/admin/books/:id/edit',
        element: <BookEdit />,
      },
      {
        path: 'sites',
        element: <Sites />,
      },
      {
        path: 'sites/create',
        element: <SitesCreate />,
      },
      {
        path: '/admin/sites/:id/edit',
        element: <SitesEdit />,
      },
    ],
  },
]);

export default router;
