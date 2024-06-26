import * as Yup from 'yup'
import { ACCEPT_IMAGE_TYPES, MAX_FILE_SIZE } from '../../../utils/validation'

export const addHeritageValidation = Yup.object().shape({
	title: Yup.string()
		.required("Заголовок обов'язковий")
		.min(5, 'Мінімальна довжина заголовку 5 символів')
		.max(100, 'Максимальна довжина заголовку 100 символів'),
	description: Yup.string()
		.required("Опис обов'язковий")
		.min(20, 'Мінімальна довжина опису 20 символів')
		.max(1000, 'Максимальна довжина опису 1000 символів'),
	userId: Yup.number().required("Користувач обов'язковий"),
	image: Yup.mixed<FileList>()
		.required('Фото обов`язкове')
		.test('notEmpty', 'Фото обов`язкове', (value) => value.length > 0)
		.test('fileSize', 'Фото не повинно перевищувати 5 МБ', (value) => value && value[0]?.size <= MAX_FILE_SIZE)
		.test(
			'fileType',
			'Фото повинно бути формату jpg, jpeg або png',
			(value) => value && ACCEPT_IMAGE_TYPES.includes(value[0]?.type),
		),
})
