import * as Yup from 'yup'

export const editHeritageValidation = Yup.object().shape({
	title: Yup.string()
		.required("Заголовок обов'язковий")
		.min(5, 'Мінімальна довжина заголовку 5 символів')
		.max(100, 'Максимальна довжина заголовку 100 символів'),
	description: Yup.string()
		.required("Опис обов'язковий")
		.min(20, 'Мінімальна довжина опису 20 символів')
		.max(1000, 'Максимальна довжина опису 1000 символів'),
	userId: Yup.number().required("Користувач обов'язковий"),
	image: Yup.mixed<FileList>().optional(),
})
