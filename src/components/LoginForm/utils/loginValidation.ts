import * as Yup from 'yup'

export const loginValidation = Yup.object().shape({
	email: Yup.string().required("Електронна адреса обов'язкова").email('Введіть коректну електронну адресу'),
	password: Yup.string().required("Пароль обов'язковий"),
})
