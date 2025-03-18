import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import UserRoles from "../pages/UserRoles";
import UserManagement from "../pages/UserManagement";
import AutoResponse from "../pages/AutoResponse";
import Customers from "../pages/Customers";
import Subscriptions from "../pages/Subscriptions";
import Books from "../pages/Books";
import BookCreate from "../components/Books/BooksCreate";
import BookEdit from "../components/Books/BookEdit";
import Sites from "../pages/Sites";
import SiteCreate from "../components/Sites/SiteCreate"; // Corrected name
import SiteEdit from "../components/Sites/SiteEdit"; // Corrected name
import SitesTable from "../components/Sites/SiteTable";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app route
  },
  {
    path: "/admin", // Admin routes
    element: <App />, // Ensure App has <Outlet />
    children: [
      { path: "home", element: <Dashboard /> },
      { path: "user-roles", element: <UserRoles /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "auto-response", element: <AutoResponse /> },
      { path: "customers", element: <Customers /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "books", element: <Books /> },
      { path: "books/create", element: <BookCreate /> },
      { path: "books/:id/edit", element: <BookEdit /> }, // Dynamic book edit route
      { path: "sites", element: <Sites /> },
      { path: "sites/create", element: <SiteCreate /> }, // Corrected component name
      { path: "sites/:id/edit", element: <SiteEdit /> }, // Dynamic site edit route
    ],
  },
]);

export default router;
