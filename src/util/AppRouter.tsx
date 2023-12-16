import  { useContext } from "react";
import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LoadingScreen from "../components/UI/LoadingScreen";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { AuthContext } from "./AuthContext";
import Toast from "../components/UI/Toast";

const AppRouter = () => {
  const { loading, user, error, setError } = useContext(AuthContext);
  console.log(loading);
  const routes = (
    <>
      {user && user.emailVerified ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
      <Route path="*" element={<Navigate to="/spark/signin" replace />} />
    </>
  );

  const router = createBrowserRouter(createRoutesFromElements(routes));
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <RouterProvider router={router} />
      {error && (
        <Toast close={() => setError(null)} message={error ? error : "Error"} />
      )}
    </>
  );
};

export default AppRouter;
