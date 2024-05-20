import * as Yup from "yup";
export const Schema = Yup.object({
  name: Yup.string().min(2).required("Name is required"),
  quantity: Yup.number().required("Quantity is required"),
  price: Yup.number().required("Price is required"),
});
