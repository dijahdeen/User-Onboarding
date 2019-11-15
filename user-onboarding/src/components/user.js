import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';



const User = ({ values, errors, touched, status }) => {
    const [UserForm, setUserForm] = useState([]);

    useEffect(() => {
        status && setUserForm(UserForm =>
            [...UserForm, status]);
    }, [status]);

    return (
        <div className='User-Form'>
            <Form>
                <Field
                    type='text'
                    name='FullName'
                    placeholder='Name'
                />
                {touched.FullName && errors.FullName && (
                    <p className="errors">{errors.FullName}</p>
                )}

                <Field
                    type='text'
                    name='Email'
                    placeholder='Email'
                />
                {touched.Email && errors.Email && (
                    <p className="errors">{errors.Email}</p>
                )}
                <Field
                    type='password'
                    name='Password'
                    placeholder='Password'
                />
                {touched.Password && errors.Password && (
                    <p className="errors">{errors.Password}</p>
                )}

                <label className="checkbox-container">
                    Terms of Service
                        <Field
                        type="checkbox"
                        name="Terms"
                        checked={values.Terms}
                    />
                    <span className="checkmark" />
                </label>
                <button type="submit"> Sign Up! </button>
            </Form>
            {UserForm.map(Users => (
                <ul key={Users.id}>
                    <li>Name: {Users.FullName}</li>
                    <li>Email: {Users.Email}</li>
                </ul>
            ))}
        </div>
    )
}
const UserForms = withFormik({
    mapPropsToValues({ FullName, Email, Password, Terms }) {
        return {
            FullName: FullName || "",
            Email: Email || "",
            Password: Password || "",
            Terms: Terms || false,

        };
    },
    validationSchema: Yup.object().shape({
        Email: Yup.string().required(),
        Password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);

            })
            .catch(err => console.log(err.response));
    }
})(User);

export default UserForms;