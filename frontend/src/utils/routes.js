export const ROUTES = {
	MAIN: '/',
	CATEGORIES: '/categories',
	PRODUCTS: '/products',
	SALES: '/discounted-items',
	CART: '/shopping-cart',
}

export const LINKS = [
	{ to: ROUTES.MAIN, label: 'Главная' },
	{
		to: ROUTES.CATEGORIES,
		label: 'Категории',
		customActiveCheck: pathname => {
			const parts = pathname.split('/').filter(Boolean)
			return (
				pathname === ROUTES.CATEGORIES ||
				(pathname.startsWith(`${ROUTES.CATEGORIES}/`) && parts.length === 2)
			)
		},
	},
	{ to: ROUTES.PRODUCTS, label: 'Все продукты' },
	{ to: ROUTES.SALES, label: 'Распродажа', specLabel: 'Товары со скидкой' },
]

export const getLinkFromRoute = route => {
	return LINKS.find(link => link.to === route)
}
