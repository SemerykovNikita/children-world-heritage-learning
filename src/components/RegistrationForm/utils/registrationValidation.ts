import * as Yup from 'yup'

export const registrationValidation = Yup.object().shape({
	email: Yup.string().required("Електронна адреса обов'язкова").email('Введіть коректну електронну адресу'),
	password: Yup.string()
		.required("Пароль обов'язковий")
		.min(6, 'Мінімальна довжина паролю 6 символів')
		.max(20, 'Максимальна довжина паролю 20 символів'),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password')], 'Паролі не співпадають'),
})
