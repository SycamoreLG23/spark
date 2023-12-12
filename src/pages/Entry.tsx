/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useContext, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../util/AuthContext";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Toast from "../components/UI/Toast";

const Entry = () => {
  const { user, setError } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial form values
  const initialValues = {
    gratitude: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    gratitude: Yup.string().required("Please enter what you are grateful for."),
  });

  // onSubmit function to handle form submission
  const onSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    setError(null);
    try {
      if (user) {
        // Add the gratitude entry to the database
        const entriesCollection = collection(db, "gratitudeEntries");
        const data = await addDoc(entriesCollection, {
          userId: user.uid,
          entry: values.gratitude,
          timestamp: Timestamp.fromDate(new Date()),
        });
        console.log(data);
        setSuccess(true);
        resetForm();
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Error adding gratitude entry: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link
        onClick={() => {
          setError(null);
          setSuccess(false);
        }}
        to="/"
      >
        <IoMdArrowRoundBack className="w-5 h-5 md:ml-4 mb-4 md:h-6 md:w-6" />
      </Link>
      <div className="max-w-[600px] mx-auto mt-8 grid">
        <h2 className="font-bold text-xl md:text-2xl mb-4">
          Log Your Gratitude
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="grid">
            <div className="mb-4 ">
              <label
                htmlFor="gratitude"
                className="block text-sm font-medium text-gray-700"
              >
                What are you grateful for?
              </label>
              <Field
                as="textarea"
                id="gratitude"
                name="gratitude"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="gratitude"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-[#003333] text-white rounded-lg py-2 px-4 w-fit hover:bg-[#003333]/80 duration-500 text-center min-w-[140px] place-self-end"
            >
              {loading ? <LoadingSpinner /> : "Log Gratitude"}
            </button>
          </Form>
        </Formik>

        {success && (
          <Toast
            success
            close={() => setSuccess(false)}
            message={
              <p className="flex  justify-between ">
                Success!{" "}
                <Link
                  className="text-xs text-[#e9e8e8e0] underline top-[0.25rem] relative items-center mr-3 border-[#ffffff42]"
                  to="/gratitude"
                >
                  See Gratitude
                </Link>
              </p>
            }
          />
        )}
      </div>
    </>
  );
};

export default Entry;
