import * as Yup from "yup";
export const Schema = Yup.object({
  name: Yup.string().min(2).required("Name is required"),
  quantity: Yup.number().required("Quantity is required"),
  buyPrice: Yup.number().required("Buying Price is required"),
  sellPrice: Yup.number().required("Selling Price is required"),
  MRP: Yup.number().required("MRP is required"),
  discount: Yup.number().required("discount is required"),
});
