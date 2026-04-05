import slugify from 'slugify'
import { ROUTES } from './routes'

export const slugifyText = text => {
	return slugify(text, {
		lower: true,
		remove: /[*+~.()'"!:@]/g,
		locale: 'ru', // поддержка кириллицы
	})
}

export const getCategorySlug = title => slugifyText(title)
export const getCategoryBySlug = (dataFromRedux, slug) => {
	return dataFromRedux.find(item => slugifyText(item.title) === slug)
}

export const getProductSlug = (title, id) => `${slugify(title)}-item-${id}`

export const getIdFromSlug = slug => {
	const parts = slug.split('-')
	const id = Number(parts[parts.length - 1])
	return isNaN(id) ? null : id
}

export const getProductLink = (product, categories) => {
	const category = categories.find(cat => cat.id === product.categoryId)
	const categorySlug = category ? getCategorySlug(category.title) : 'unknown'
	const productSlug = getProductSlug(product.title, product.id)
	return `${ROUTES.CATEGORIES}/${categorySlug}/${productSlug}`
}
