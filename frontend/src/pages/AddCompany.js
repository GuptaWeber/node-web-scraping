import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  cin: Yup.string().required("CIN is required"),
  pinCode: Yup.string().required("Pin Code is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
});

export const AddCompany = () => {
  const navigate = useNavigate();

  const initialValues = {
    companyName: "",
    cin: "",
    pinCode: "",
    email: "",
    address: "",
  };

  const handleSubmit = async (values) => {
    try {
      const { companyName, cin, pinCode, email, address } = values;
      const response = await axios.post("http://localhost:5001/companies", {
        companyName,
        cin,
        pinCode,
        email,
        address,
      });

      if (response.status === 201) {
        toast.success("Company added successfully");
        navigate(`/client-details/${response.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-gray-700 font-bold mb-2"
            >
              Company Name
            </label>
            <Field
              type="text"
              id="companyName"
              name="companyName"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cin" className="block text-gray-700 font-bold mb-2">
              CIN
            </label>
            <Field
              type="text"
              id="cin"
              name="cin"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="cin"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pinCode"
              className="block text-gray-700 font-bold mb-2"
            >
              Pin Code
            </label>
            <Field
              type="text"
              id="pinCode"
              name="pinCode"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="pinCode"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <Field
              as="textarea"
              id="address"
              name="address"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
