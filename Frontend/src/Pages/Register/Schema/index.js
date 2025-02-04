import * as Yup from "yup";

// Registration form initial values
export const registrationFormInitialValues = {
    first_name: '',
    last_name:'',
    email:'',
    password:''
};

// Registration form validation schema
export const registrationFormValidationSchema = () => (Yup.object().shape({
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
    email: Yup.string().email('Enter valid email address!').required('Email is required!'),
    password: Yup.string().required('Password is required!')
}));