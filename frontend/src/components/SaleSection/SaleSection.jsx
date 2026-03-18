import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleWithCrumbButton from '../../ui/TitleWithCrumbButton/TitleWithCrumbButton'
import { selectDiscountedProducts } from '../../utils/redux/selectors'
import { fetchAllProducts } from '../../utils/redux/slices/productsSlice'
import { ROUTES } from '../../utils/routes'
import ListCards from '../ListCards/ListCards'
import ProductCard from '../ProductCard/ProductCard'

const SaleSection = () => {
	const { data, loading, error } = useSelector(state => state.products)
	const discounted = useSelector(selectDiscountedProducts)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!data.length) {
			dispatch(fetchAllProducts())
		}
	}, [dispatch, data.length])

	const [shuffled, setShuffled] = useState([])

	useEffect(() => {
		const randomItems = [...discounted]
			.sort(() => 0.5 - Math.random())
			.slice(0, 4)
		setShuffled(randomItems)
	}, [discounted])

	return (
		<section>
			<TitleWithCrumbButton
				title={'Распродажа'}
				to={ROUTES.SALES}
				buttonTitle={'Все продукты'}
			/>
			{error ? (
				<ErrorInfo />
			) : (
				<ListCards loading={loading} skeletonCount={4}>
					{shuffled.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</ListCards>
			)}
		</section>
	)
}

export default SaleSection
