import { Button, FormControl, Input, Textarea } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useSuccessToast } from '../../hooks/useSuccessToast'
import { useEditHeritage } from '../../queries/heritage'
import { useUserStore } from '../../store/user'
import { COLOR_THEME } from '../../styles/index'
import { Heritage } from '../../types/index'
import { getBlob } from '../../utils/getBlob'
import { ACCEPT_IMAGE_TYPES, MAX_FILE_SIZE } from '../../utils/validation'
import { Form } from '../ui/Form/index'
import FormError from '../ui/FormError/index'
import { HeritageForm, useEditHeritageForm } from './hooks/useEditHeritageForm'

export const EditHeritageForm = ({ heritage }: { heritage: Heritage }) => {
	const { user } = useUserStore(
		useShallow((state) => ({
			user: state.user,
		})),
	)

	const navigate = useNavigate()

	const showSuccessToast = useSuccessToast({
		title: 'Запис успішно відредаговно',
	})

	const showErrorToast = useErrorToast({
		title: 'Помилка при редагуванні запису',
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useEditHeritageForm({
		description: heritage.description,
		title: heritage.title,
		userId: heritage.userId,
	})

	const { mutate: editHeritage, isPending } = useEditHeritage(heritage.id, {
		onSuccess: () => {
			showSuccessToast()
			reset()
			navigate(`/heritages/${heritage.id}`)
		},
		onError: () => showErrorToast(),
	})

	const onSubmit: SubmitHandler<HeritageForm> = async ({ description, title, image }) => {
		let imageBlob = heritage.imageBlob

		if (image?.length) imageBlob = (await getBlob(image)) ?? imageBlob

		editHeritage({ ...heritage, description, title, imageBlob })
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
				<Input
					pt={1}
					placeholder='Зображення'
					type='file'
					{...register('image', {
						validate: (value) => {
							if (!value?.length) return true

							if (!ACCEPT_IMAGE_TYPES.some((t) => t === value[0].type))
								return 'Фото повинно бути формату jpg, jpeg або png'

							if (value[0].size > MAX_FILE_SIZE) return 'Фото не повинно перевищувати 5 МБ'
						},
					})}
				/>
				<FormError message={errors.image?.message} />
			</FormControl>

			<Button
				type='submit'
				disabled={!isValid}
				isLoading={isPending}
				loadingText='Чекайте...'
				colorScheme={COLOR_THEME}
				variant='solid'
			>
				Відредагувати
			</Button>
		</Form>
	)
}
