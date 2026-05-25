import Companies from "./admin/Companies";
import CompaniesCreate from "./admin/CompaniesCreate";
import CompantSetup from "./admin/CompantSetup";
import Browse from "./components/Browse";
import Home from "./components/Home";
import JobDescriptions from "./components/JobDescriptions";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminJobs from "./admin/AdminJobs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostJobs from "./admin/PostJobs";
import Applicants from "./admin/Applicants";
import ProtectedRoute from "./admin/ProtectedRoute";

const appRouter = createBrowserRouter([
  // Client Sites Routes:-
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/description/:id",
    element: <JobDescriptions />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // Admin site Routes:-

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: <CompaniesCreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompantSetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJobs />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
