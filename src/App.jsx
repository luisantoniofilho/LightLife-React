import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import CreateUser from "./features/user/CreateUser";
import LoginUser from "./features/user/LoginUser";
import Home from "./ui/Home";
import InputUserPhysicalData from "./features/physicalData/InputUserPhysicalData";
import MacroNutrientsGraphic from "./features/macros/MacroNutrientsGraphic";
import { useSelector } from "react-redux";
import MealsSuggestions from "./features/meets/MealsSugestions";

// Component to protect the routes
function ProtectedRoute({ children }) {
  // Select the isLogged state from the Redux store
  const isLogged = useSelector((state) => state.user.isLogged);

  // If the user is not logged in, redirect to the login page
  if (!isLogged) return <Navigate to="/login" />;

  // Return the protected children if the user is logged in
  return children;
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      { path: "/", element: <Home /> },
      {
        path: "/register",
        element: <CreateUser />,
      },
      {
        path: "/login",
        element: <LoginUser />,
      },
      {
        path: "/form",
        element: (
          <ProtectedRoute>
            <InputUserPhysicalData />
          </ProtectedRoute>
        ),
      },
      {
        path: "/macros",
        element: (
          <ProtectedRoute>
            <MacroNutrientsGraphic />
          </ProtectedRoute>
        ),
      },
      {
        path: "/meals",
        element: (
          <ProtectedRoute>
            <MealsSuggestions />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />; // Render the router provider with the defined routes
}

export default App;
