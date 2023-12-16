import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import ResetPassword from "../pages/Authentication/ResetPassword";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/spark/signin" element={<SignIn />} />
      <Route path="/spark/signup" element={<SignUp />} />
      <Route path="/spark/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/spark/signin" replace />} />
    </Routes>
  );
};
