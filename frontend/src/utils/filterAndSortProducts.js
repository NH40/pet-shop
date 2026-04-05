function filterAndSortProducts({
	products,
	priceFrom,
	priceTo,
	discountOnly = false,
	sortOption = 'by default',
}) {
	if (!products || !Array.isArray(products)) return []

	let filtered = [...products]

	const from = parseFloat(priceFrom)
	const to = parseFloat(priceTo)

	// 1. FILTER PRICE
	if (!isNaN(from)) {
		filtered = filtered.filter(p => {
			const finalPrice = p.discont_price ?? p.price
			return finalPrice >= from
		})
	}

	if (!isNaN(to) && (!from || to > from)) {
		filtered = filtered.filter(p => {
			const finalPrice = p.discont_price ?? p.price
			return finalPrice <= to
		})
	}

	// 2. FILTER SALE
	if (discountOnly) {
		filtered = filtered.filter(p => p.discont_price !== null)
	}

	// 3. SORT BY
	filtered.sort((a, b) => {
		const priceA = a.discont_price ?? a.price
		const priceB = b.discont_price ?? b.price

		switch (sortOption) {
			case 'высокая-низкая':
				return priceB - priceA
			case 'низкая-высокая':
				return priceA - priceB
			case 'новейший':
				return new Date(b.createdAt) - new Date(a.createdAt)
			default:
				return 0
		}
	})

	return filtered
}

export default filterAndSortProducts
