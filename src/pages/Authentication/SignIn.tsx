/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "../../components/Button/SecondaryButton";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import bgImg from "../../assets/gabrielle-henderson-Y3OrAn230bs-unsplash.jpg";
import logo from "../../assets/Logo.svg";
import FormField from "../../components/FormField";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../util/AuthContext";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, setError } = useContext(AuthContext);

  const navigate = useNavigate();
  // Initial values
  const initialValues = {
    email: sessionStorage.getItem("email")
      ? sessionStorage.getItem("email")!
      : "",
    password: "",
  };

  // Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      if (user.user.emailVerified) {
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // onSubmit
  const onSubmit = async (values: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      const user = await login(values.email, values.password);
      console.log(user);
      // Signed in
      if (user && user.user.emailVerified) {
        localStorage.setItem("email", user.user.email!);
        navigate("/");
      } else {
        setError("Kindly verify your email");
      }
    } catch (err: any) {
      console.log(err.code);
      if (err.code.includes("invalid") || err.code.includes("incorrect")) {
        setError("Invalid email or password");
      } else if (err.code.includes("exist")) {
        setError("User does not exist");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:grid md:grid-cols-[60%_40%] lg:grid-cols-[60%_40%] h-full">
      <div className="max-w-[600px] w-full px-6 md:px-10 mx-auto grid  h-full">
        <header className="w-fit mt-4">
          <Link className="flex justify-start items-center gap-x-2" to="/spark/">
            <img src={logo} className="h-10" alt="spark-logo" />
            <h1 className="text-lg md:text-xl font-bold">SPARK</h1>
          </Link>
        </header>
        <div className=" mt-4  md:mt-6">
          <h2 className="font-bold text-2xl ">Welcome back</h2>
          <p className="mb-6 mt-2 text-black/60">
            Embrace the day with gratitude.
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
                  text={"Sign In"}
                  loading={loading}
                  disable={loading}
                  type="submit"
                />
                <p className="flex items-center justify-center gap-x-1 mt-2">
                  Don't have an account?{"  "}
                  <Link
                    to="/spark/signup"
                    className=" link-underline link-underline-black font-semibold"
                  >
                    Sign up
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

      <div
        style={imageStyle}
        className="hidden relative md:grid h-full  w-full place-content-center   bg-my-gray  "
      ></div>
    </div>
  );
};

export default SignIn;

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const imageStyle = {
  backgroundImage: ` url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  height: "100vh",
};
