import clsx from 'clsx'
import React, { useState } from 'react'

const ProductDescription = React.memo(({ text }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<div>
			<p className='mb-2 font-semibold'>Описание</p>
			<p
				className={clsx('text-[16px] transition-all duration-300', {
					'line-clamp-3': !isExpanded,
				})}
			>
				{text}
			</p>
			<button
				className='mt-4 underline text-[16px] cursor-pointer font-bold'
				onClick={() => setIsExpanded(prev => !prev)}
			>
				{isExpanded ? 'Скрыть' : 'Далее'}
			</button>
		</div>
	)
})

export default ProductDescription
