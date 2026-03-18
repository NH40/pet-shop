import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleWithCrumbButton from '../../ui/TitleWithCrumbButton/TitleWithCrumbButton'
import { fetchAllCategories } from '../../utils/redux/slices/categoriesSlice'
import { ROUTES } from '../../utils/routes'
import CategoryCard from '../CategoryCard/CategoryCard'
import ErrorInfo from '../ErrorInfo/ErrorInfo'
import ListCards from '../ListCards/ListCards'

const VISIBLE_CATEGORIES = 4

const CategoriesSection = () => {
	const { data, loading, error } = useSelector(state => state.categories)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!data.length) {
			dispatch(fetchAllCategories())
		}
	}, [dispatch, data.length])

	return (
		<section>
			<TitleWithCrumbButton
				title={'Категории'}
				to={ROUTES.CATEGORIES}
				buttonTitle={'Все категории'}
			/>

			{error ? (
				<ErrorInfo />
			) : (
				<ListCards loading={loading} skeletonCount={8}>
					{data.slice(0, VISIBLE_CATEGORIES).map(category => (
						<CategoryCard key={category.id} category={category} />
					))}
				</ListCards>
			)}
		</section>
	)
}

export default CategoriesSection
