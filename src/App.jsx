import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import InputField from "./ReusableComponent/Input";
import "./App.css";
import { useState } from "react";
// Country Array
const countries = ["Select Country", "INDIA", "Canada", "UK"];

// States Array
const statesByCountry = {
  INDIA: ["Select State", "Maharashtra", "Madyapradesh", "Uttarpradesh"],
  Canada: ["Select State", "Ontario", "Quebec", "British Columbia"],
  UK: ["Select State", "England", "Scotland", "Wales"],
};

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    telephone: "",
    country: "",
    state: "",
    address: "",
  });
  // Validation schema using yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
      .required("Last name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9]+$/, "Only numbers are allowed")
      .matches(/^\+?[0-9]{12}$/, "Phone number must be exactly 12 digits long")
      .required("Phone number is required"),
    country: Yup.string()
      .notOneOf(["Select Country"], "Please select a country")
      .required("Country is required"),
    state: Yup.string()
      .notOneOf(["Select State"], "Please select a state")
      .required("State is required"),
  });

  // Handle submit functionality
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setFormData({
      ...values,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      telephone: values.telephone,
      country: values.country,
      state: values.state,
      address: values.address,
    });

    resetForm();
    setSubmitting(false);
  };
  console.log(formData);

  return (
    <div className="outer-container">
      <div className="container">
        <h2>Contact Information</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            telephone: "",
            country: "Select Country",
            state: "Select State",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form>
              <div className="form-row">
                <InputField label="First Name" name="firstName" type="text" />

                <InputField label="Last Name" name="lastName" type="text" />
              </div>
              <div className="form-row">
                <InputField label="Email" name="email" type="email" />
                <InputField label="Phone" name="phone" type="tel" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">
                    Country<sup>*</sup>
                  </label>
                  <Field as="select" name="country" id="country">
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">
                    State<sup>*</sup>
                  </label>
                  <Field
                    as="select"
                    name="state"
                    id="state"
                    disabled={
                      !values.country || values.country === "Select Country"
                    }
                  >
                    {(statesByCountry[values.country] || []).map(
                      (state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      )
                    )}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="span"
                    className="error"
                  />
                </div>
              </div>
              <div className="form-row">
                <InputField
                  label="Telephone (Optional)"
                  name="telephone"
                  type="tel"
                  labelmandate={true}
                />
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field as="textarea" name="address" id="address" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default App;
