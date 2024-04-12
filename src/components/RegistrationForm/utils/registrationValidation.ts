import * as Yup from 'yup'

export const registrationValidation = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Not valid email'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Min password length is 6')
		.max(20, 'Max password length is 20'),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password')], 'Passwords must match'),
})
