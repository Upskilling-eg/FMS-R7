import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ForgetPass from "./modules/Authentication/components/Forget-pass/ForgetPass";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register.JSX";
import ResetPass from "./modules/Authentication/components/Reset-pass/ResetPass";
import VerifyAccount from "./modules/Authentication/components/Verify-account/VerifyAccount";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import CategoryData from "./modules/Categories/components/CategoryData/CategoryData";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import FavList from "./modules/Favorurites/components/FavList/FavList";
import RecipeData from "./modules/Recipes/components/RecipeData/RecipeData";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import UsersList from "./modules/Users/components/UsersList/UsersList";

function App() {
  //move then improve

  const [loginData, setLoginData] = useState(null);

  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "login",
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forget-password",
          element: <ForgetPass />,
        },
        {
          path: "reset-password",
          element: <ResetPass />,
        },
        {
          path: "verify-account",
          element: <VerifyAccount />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          {" "}
          <MasterLayout loginData={loginData} />{" "}
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "category-data", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
        { path: "favs", element: <FavList /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
