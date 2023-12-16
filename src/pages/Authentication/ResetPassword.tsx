/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PrimaryButton from "../../components/Button/PrimaryButton";
import FormField from "../../components/FormField";
import bgImg from "../../assets/rest.jpeg";
import { AuthContext } from "../../util/AuthContext";
import Toast from "../../components/UI/Toast";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [passwordReset, setPasswordReset] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  // Initial form data
  const initialValues = {
    email: "",
  };

  const validation = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const onSubmit = async (values: { email: string }) => {
    setLoading(true);

    try {
      const data = await resetPassword(values.email);
      console.log(data);
      setPasswordReset(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:grid md:grid-cols-[60%_40%] lg:grid-cols-[60%_40%] h-full">
      <div className="max-w-[600px] w-full px-6 md:px-10 mx-auto grid  h-full">
        <header className=" py-4">
          <Link className="flex justify-start items-center gap-x-2" to="/spark/">
            <img src={logo} className="h-10" alt="spark-logo" />
            <h1 className="text-lg md:text-xl font-bold">SPARK</h1>
          </Link>
        </header>
        {!passwordReset ? (
          <div className="  md:max-w-[530px] mx-auto w-full">
            <h2 className="text-center md:mb-3 font-semibold text-xl md:text-2xl lg:text-3xl">
              Set a new password
            </h2>
            <p className="text-center md:max-w-[400px] mx-auto text-black/60">
              Enter your registered email below to receive password reset.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className=" mt-10 lg:mt-14 mb-6 flex flex-col justify-between ">
                  <FormField
                    name="email"
                    title="Email*"
                    type="email"
                    error={!!(errors.email && touched.email)}
                  />
                  <PrimaryButton
                    text="Reset Password"
                    disable={false}
                    loading={loading}
                    type="submit"
                  />
                  <Link
                    className="flex justify-center items-center gap-x-2 mt-3 md:mt-7 "
                    to="/spark/signin"
                  >
                    <AiOutlineArrowLeft />
                    <span className="link-underline link-underline-black hover:font-semibold duration-700">
                      Back to Login
                    </span>
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div>
            <p className="text-lg text-center">
              Password reset successful. If you have a registered account, you
              will receive an email with instructions on how to reset your
              password.
            </p>
            <Link
              className="flex justify-center items-center gap-x-2 mt-3 md:mt-7 "
              to="/spark/signin"
            >
              <AiOutlineArrowLeft />
              <span className="link-underline link-underline-black hover:font-semibold duration-700">
                Back to Login
              </span>
            </Link>
          </div>
        )}
      </div>
      <div
        style={imageStyle}
        className="hidden relative md:grid h-full  w-full place-content-center   bg-my-gray  "
      ></div>
      {error && (
        <Toast
          close={() => setError(false)}
          message={error ? "An error occurred" : "Error"}
        />
      )}
    </div>
  );
};

export default ResetPassword;

const imageStyle = {
  backgroundImage: ` url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  height: "100vh",
};
