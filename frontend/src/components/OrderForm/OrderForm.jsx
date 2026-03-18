import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../ui/Alert/Alert'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import { clearCart } from '../../utils/redux/slices/cartSlice'
import { resetOrderState, sendOrder } from '../../utils/redux/slices/orderSlice'
import {
	discountConsumed,
	resetSubmission,
} from '../../utils/redux/slices/saleSlice'
import ErrorInfo from '../ErrorInfo/ErrorInfo'

const OrderForm = ({ cartItems, totalSum }) => {
	const dispatch = useDispatch()
	const { error, success } = useSelector(state => state.order)
	const discountUsed = useSelector(state => state.sale.discountUsed)

	const [alertOpen, setAlertOpen] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		if (success) {
			dispatch(discountConsumed())
			setAlertOpen(true)
			reset()
			dispatch(resetSubmission())
		}
	}, [success, reset, dispatch, discountUsed])

	const onSubmit = formData => {
		const order = {
			...formData,
			products: cartItems.map(({ id, title, quantity }) => ({
				id,
				title,
				quantity,
			})),
			total: totalSum,
		}
		dispatch(sendOrder(order))
	}

	if (error) return <ErrorInfo />

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
			<Input
				{...register('name', { required: 'Имя не найдено' })}
				placeholder='Имя'
				message={errors?.name?.message}
				variant='light'
			/>
			<Input
				{...register('phoneNumber', {
					required: 'телефонный номер не найдено',
				})}
				placeholder='Телефон'
				message={errors?.phoneNumber?.message}
				variant='light'
			/>
			<Input
				{...register('email', { required: 'Email не найдено' })}
				placeholder='Email'
				type='email'
				message={errors?.email?.message}
				variant='light'
			/>

			<Button type='submit' className='mt-4'>
				Купить
			</Button>

			{alertOpen && (
				<Alert
					title={'Поздравляем!'}
					p1={'Ваш заказ успешно оформлен на сайте.'}
					p2={
						'Вскоре с вами свяжется менеджер для подтверждения вашего заказа.'
					}
					isOpen={alertOpen}
					onClose={() => {
						setAlertOpen(false)
						dispatch(resetOrderState())
						dispatch(clearCart())
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}}
				/>
			)}
		</form>
	)
}

export default OrderForm
