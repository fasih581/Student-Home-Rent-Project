import * as yup from "yup";
import "yup-phone";

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const AddUserSchema = yup.object().shape({
  name: yup.string().required("Please Enter Name!"),
  phone: yup
    .string()
    .typeError("That doesn't look like a phone number!")
    .min(10)
    .required("Please Enter Phone Number!"),
  email: yup.string().email("Please Enter a valid Email").required("Please Enter Email!"),
  password: yup.string().min(5).required("Please Enter Password!"),
});

// matches(phoneRegExp, { message: "Please create a stronger password" })

export const LoginUserSchema = yup.object().shape({
  name: yup.string().required("Please Enter Name!"),
  email: yup.string().email("Please Enter a valid Email").required("Please Enter Email!"),
  password: yup.string().min(5).required("Please Enter Password!"),
});
