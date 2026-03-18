import CustomCheckbox from './CustomCheckbox/CustomCheckbox'
import CustomInput from './CustomInput/CustomInput'
import CustomSelect from './CustomSelect/CustomSelect'

const FilterSection = ({
	priceFrom,
	setPriceFrom,
	priceTo,
	setPriceTo,
	discountOnly,
	setDiscountOnly,
	sortOption,
	setSortOption,
	hiddenCheckbox = false,
}) => {
	return (
		<div className='flex items-center gap-4 lg:gap-10 flex-col md:flex-row flex-wrap w-full my-[var(--m-bottom-title-xs)] md:my-[var(--m-bottom-title-md)]'>
			<div className='flex gap-4 items-center'>
				<p className='font-semibold'>Цена</p>
				<CustomInput name='от' value={priceFrom} onChange={setPriceFrom} />
				<CustomInput name='до' value={priceTo} onChange={setPriceTo} />
			</div>

			{!hiddenCheckbox && (
				<div className='flex gap-4 items-center'>
					<p className='font-semibold w-max text-nowrap'>Товары со скидкой</p>
					<CustomCheckbox
						label='флажок'
						checked={discountOnly}
						onChange={setDiscountOnly}
					/>
				</div>
			)}

			<div className='flex gap-4 items-center'>
				<p className='font-semibold'>Отсортировано</p>
				<CustomSelect selectedValue={sortOption} onSelect={setSortOption} />
			</div>
		</div>
	)
}

export default FilterSection
