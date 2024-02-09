import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type,labelmandate }) => {
  return (
    <div className="form-group">
     { !labelmandate ?
      <label htmlFor={name}>
        {label}<sup>*</sup>
      </label>:
      <label htmlFor={name}>
        {label}
      </label>}
      <Field type={type} name={name} id={name} />
      <ErrorMessage name={name} component="span" className="error" />
    </div>
  );
};

export default InputField;
