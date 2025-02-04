import * as Yup from "yup";

// Registration form initial values
export const loginFormInitialValues = {
    email:'',
    password:''
};

// login form validation schema
export const loginFormValidationSchema = () => (Yup.object().shape({
    email: Yup.string().email('Enter valid email address!').required('Email is required!'),
    password: Yup.string().required('Password is required!')
}));