import * as Yup from "yup";
export const Schema = Yup.object({
  username: Yup.string().min(2).required("Name is required"),
  email: Yup.string().email().required("Valid Email is required"),
  occupation: Yup.string().required("Occupation is required"),
  password: Yup.string().min(6).required("Mnimun 6 digit password is required"),
});
