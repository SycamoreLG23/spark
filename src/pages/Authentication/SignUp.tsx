/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import SecondaryButton from "../../components/Button/SecondaryButton";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import { sendEmailVerification } from "firebase/auth";
import Toast from "../../components/UI/Toast";
import SuccessScreen from "../../components/UI/SuccessScreen";
import bgImg from "../../assets/simon-maage-KTzZVDjUsXw-unsplash.jpg";
import { AuthContext } from "../../util/AuthContext";

const SignUp = () => {
  // Error

  const [showError, setShowError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [href, setHref] = useState<string>("");
  const { createUser, loginWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();

  // Initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // Sign up with google
  const googleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      // Check if the user email is verified
      if (result.user.emailVerified) {
        navigate("/");
      } else {
        // If email verification is required, display a message to the user
        setSuccess(true);
        setHref("/");
      }
    } catch (error: any) {
      setShowError(error.message);
    }
  };
  const onSubmit = async (values: { email: string; password: string }) => {
    setShowError(null);
    setLoading(true);
    const { email, password } = values;
    try {
      const user = await createUser(email, password);
      user && sendEmailVerification(user.user);
      setSuccess(true);
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setShowError("Email already registered");
          break;
        case "auth/weak-password":
          setShowError(
            "Weak Password. Password should be at least 6 characters"
          );
          break;

        default:
          setShowError(err.message);
      }
    } finally {
      setLoading(false);
    }

    sessionStorage.setItem("email", email);
  };

  return !success ? (
    <div className="md:grid md:grid-cols-[60%_40%] lg:grid-cols-[60%_40%] h-full">
      <div className="max-w-[600px] w-full px-6 md:px-10 mx-auto grid  h-full">
        <header className="w-fit mt-4">
          <Link className="flex justify-start items-center gap-x-2" to="/spark/">
            <img src={logo} className="h-10" alt="spark-logo" />
            <h1 className="text-lg md:text-xl font-bold">SPARK</h1>
          </Link>
        </header>
        <div className=" mt-4  md:mt-6">
          <h2 className="font-bold text-2xl ">
            Begin your journey of gratitude
          </h2>
          <p className="mb-6 mt-2 text-black/60">
            Sign up and let hope guide you.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className=" flex flex-col justify-between">
                <div>
                  <FormField
                    name="email"
                    title="Email*"
                    type="email"
                    error={!!(errors.email && touched.email)}
                  />

                  <div className=" mb-6 md:mb-8 relative">
                    <label
                      className=" mb-1 text-xs font-medium"
                      htmlFor="password"
                    >
                      Password*
                    </label>
                    <div>
                      <Field
                        id="password"
                        className={`${
                          !!(errors.password && touched.password)
                            ? "bg-red-200"
                            : ""
                        } " block w-full border h-12  pl-3 rounded focus:outline-none"`}
                        name="password"
                        type={!showPassword ? "password" : "text"}
                        placeholder=""
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(() => !showPassword)}
                        className={`absolute right-4 top-[50%] -translate-y-[50%] `}
                      >
                        {!showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 w-full">
                      <p className="text-red-700 text-xs mt-1 ">
                        <ErrorMessage name="password" />
                      </p>
                      <Link
                        to="/spark/reset-password"
                        className="w-fit  font-light text-sm place-self-end mt-1 hover:font-medium duration-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>

                <PrimaryButton
                  text={"Sign Up"}
                  loading={loading}
                  disable={loading}
                  type="submit"
                />
                <p className="flex items-center justify-center gap-x-1 mt-2">
                  Already have an account?{"  "}
                  <Link
                    to="/spark/signin"
                    className=" link-underline link-underline-black font-semibold"
                  >
                    Sign In
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <SecondaryButton onClick={googleLogin} text="Sign in with Google" />
        </div>
      </div>
      {showError && (
        <Toast
          close={() => setShowError(null)}
          message={showError ? showError : "Error"}
        />
      )}
      <div
        style={imageStyle}
        className="hidden relative md:grid h-full  w-full place-content-center   bg-my-gray  "
      ></div>
    </div>
  ) : (
    <SuccessScreen
      message="Please Click on the verification Link sent to your email."
      link={href}
    />
  );
};

export default SignUp;

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});
const imageStyle = {
  backgroundImage: ` url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  //   backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
};
