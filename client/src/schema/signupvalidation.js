import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must be at most 50 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(/\d/, "Password must contain at least one digit (0-9)")
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter (a-z)"
    )
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter (A-Z)"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default validationSchema;
