import { SiderTheme } from "antd/es/layout/Sider";
import axios from "axios";
import { useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./GlobalStyles/GlobalStyle";
import { ThemeContext } from "./hook/useContext";
import { useAppSelector } from "./hook/useHookRedux";
import Index from "./routes";
import ErrorPage from "./routes/ErrorPage";
import {
  Authentication,
  CategoryList,
  CreateCategory,
  CreateProduct,
  EditProduct,
  ProductDetail,
  ProductList,
  RootDefault,
} from "./routes/importRoot";
import EditCategory from "./routes/Page/Category/EditCategory";
import Register from "./routes/Page/Authentication/Register/Register";
import ProductDetailSlug from "./routes/Page/Product/ProductDetail/ProductDetailSlug";

function App() {
  axios.defaults.baseURL = "http://localhost:8070";
  const [themeContext, setTheme] = useState<SiderTheme>("light");
  const user = useAppSelector((state) => state.auth.login.currentUser);
  const role: any = user?.user?.role;
  const routerAdmin = createBrowserRouter([
    {
      path: "/",
      element:
        user === undefined ? <Navigate to="/auth/login" /> : <RootDefault />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
        {
          path: "/product-list",
          element: <ProductList />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/product-list/edit/:name",
          element: <EditProduct />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/product-list/create",
          element: <CreateProduct />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/category",
          element: <CategoryList />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/category/create",
          element: <CreateCategory />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/category/edit/:name",
          element: <EditCategory />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/auth/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/login",
      element: <Authentication />,
      errorElement: <ErrorPage />,
    },
  ]);
  const routerUser = createBrowserRouter([
    {
      path: "/",
      element:
        user === undefined ? (
          <Navigate to="/auth/login" />
        ) : (
          <Navigate to="/product-detail" />
        ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/product-detail",
      element: <ProductDetail />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/product-detail/:name",
      element: <ProductDetailSlug />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/login",
      element: <Authentication />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/register",
      element: <Authentication />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <GlobalStyle>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ThemeContext.Provider value={{ themeContext, setTheme }}>
        {role === "ADMIN" ? (
          <RouterProvider router={routerAdmin} />
        ) : (
          <RouterProvider router={routerUser} />
        )}
      </ThemeContext.Provider>
    </GlobalStyle>
  );
}

export default App;
