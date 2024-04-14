import { Button, FormControl, Input, Textarea } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useSuccessToast } from '../../hooks/useSuccessToast'
import { useAddHeritage } from '../../queries/heritage'
import { useUserStore } from '../../store/user'
import { COLOR_THEME } from '../../styles/index'
import { getBlob } from '../../utils/getBlob'
import { Form } from '../ui/Form/index'
import FormError from '../ui/FormError/index'
import { HeritageForm, useAddHeritageForm } from './hooks/useAddHeritageForm'

export const AddHeritageForm = () => {
	const { user } = useUserStore(
		useShallow((state) => ({
			user: state.user,
		})),
	)

	const showSuccessToast = useSuccessToast({
		title: 'Запис успішно створено',
	})

	const showErrorToast = useErrorToast({
		title: 'Помилка при створенні запису',
	})

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isValid },
	} = useAddHeritageForm()

	const { mutate: addHeritage, isPending } = useAddHeritage({
		onSuccess: () => {
			showSuccessToast()
			reset()
		},
		onError: () => showErrorToast(),
	})

	const onSubmit: SubmitHandler<HeritageForm> = async ({ description, title, userId, image }) => {
		// since we have just mock server and data is stored in json file, we'll save image as base64 string just for example
		const imageBlob = await getBlob(image)

		if (!imageBlob) {
			showErrorToast('Помилка при завантаженні фото. Спробуйте ще раз.')
			return
		}

		addHeritage({ description, title, userId, dateOfCreation: new Date().toISOString(), imageBlob })
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<input type='hidden' {...register('userId')} value={user?.id} />
			<FormControl isInvalid={!!errors.title}>
				<Input placeholder='Заголовок' type='text' {...register('title')} />
				<FormError message={errors.title?.message} />
			</FormControl>

			<FormControl isInvalid={!!errors.description}>
				<Textarea minHeight={150} resize='none' placeholder='Опис' {...register('description')} />
				<FormError message={errors.description?.message} />
			</FormControl>

			<FormControl isInvalid={!!errors.image}>
				<Input pt={1} placeholder='Зображення' type='file' {...register('image')} />
				<FormError message={errors.image?.message} />
			</FormControl>

			<Button
				type='submit'
				disabled={!isValid}
				isLoading={isPending}
				loadingText='Чекайте...'
				colorScheme={COLOR_THEME}
				variant='solid'
				onClick={() => {
					const values = getValues()
					console.log(values)
				}}
			>
				Створити
			</Button>
		</Form>
	)
}
