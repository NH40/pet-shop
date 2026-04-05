import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo.jsx'
import FilterSection from '../../components/FilterSection/FilterSection.jsx'
import ListCards from '../../components/ListCards/ListCards.jsx'
import NoProductsFound from '../../components/NoProductsFound/NoProductsFound.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import BreadCrumbs from '../../ui/BreadCrumbs/BreadCrumbs.jsx'
import Title from '../../ui/Title/Title'
import filterAndSortProducts from '../../utils/filterAndSortProducts.js'
import {
	fetchAllCategories,
	fetchCategoryWithProducts,
} from '../../utils/redux/slices/categoriesSlice'
import { getCategoryBySlug } from '../../utils/slugify.js'
import { SORT_OPTIONS } from '../../utils/sortOptions.js'
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx'

const CategoryPage = () => {
	const { slug } = useParams()
	const dispatch = useDispatch()
	const { data, loading, error, current } = useSelector(
		state => state.categories,
	)

	useEffect(() => {
		if (!data.length) {
			dispatch(fetchAllCategories())
		}
	}, [data.length, dispatch])

	useEffect(() => {
		if (data.length > 0 && slug) {
			const reqCategory = getCategoryBySlug(data, slug)

			if (reqCategory) {
				dispatch(fetchCategoryWithProducts(reqCategory.id))
			}
		}
	}, [data, slug, dispatch])

	//FILTER AND SORT BY
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')
	const [discountOnly, setDiscountOnly] = useState(false)
	const [sortOption, setSortOption] = useState(SORT_OPTIONS[0])

	const filteredData = useMemo(() => {
		if (!current?.data) return []

		return filterAndSortProducts({
			products: current.data,
			priceFrom,
			priceTo,
			discountOnly,
			sortOption,
		})
	}, [current, priceFrom, priceTo, discountOnly, sortOption])

	if (!loading && slug && !current) {
		return <NotFoundPage />
	}

	return (
		<div className='mb-10 md:mb-20'>
			<BreadCrumbs />
			<Title className='mb-[var(--m-bottom-title-xs)] md:mb-[var(--m-bottom-title-md)]'>
				{current?.category.title || 'Wait a moment'}
			</Title>
			<FilterSection
				priceFrom={priceFrom}
				setPriceFrom={setPriceFrom}
				priceTo={priceTo}
				setPriceTo={setPriceTo}
				discountOnly={discountOnly}
				setDiscountOnly={setDiscountOnly}
				sortOption={sortOption}
				setSortOption={setSortOption}
			/>
			{error ? (
				<ErrorInfo />
			) : (
				<>
					{loading ? (
						<ListCards loading={true} skeletonCount={4} />
					) : current?.data && filteredData.length > 0 ? (
						<ListCards>
							{filteredData.map(product => (
								<ProductCard key={product.id} product={product} />
							))}
						</ListCards>
					) : (
						<NoProductsFound />
					)}
				</>
			)}
		</div>
	)
}

export default CategoryPage
