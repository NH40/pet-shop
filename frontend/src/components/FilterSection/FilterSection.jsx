import CustomCheckbox from "./CustomCheckbox/CustomCheckbox";
import CustomSelect from "./CustomSelect/CustomSelect";
import CustomInput from "./CustomInput/CustomInput";

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
    <div className="flex items-center gap-4 lg:gap-10 flex-col md:flex-row flex-wrap w-full my-[var(--m-bottom-title-xs)] md:my-[var(--m-bottom-title-md)]">
      <div className="flex gap-4 items-center">
        <p className="font-semibold">Price</p>
        <CustomInput name="from" value={priceFrom} onChange={setPriceFrom} />
        <CustomInput name="to" value={priceTo} onChange={setPriceTo} />
      </div>

      {!hiddenCheckbox && (
        <div className="flex gap-4 items-center">
          <p className="font-semibold w-max text-nowrap">Discounted items</p>
          <CustomCheckbox
            label="check box"
            checked={discountOnly}
            onChange={setDiscountOnly}
          />
        </div>
      )}

      <div className="flex gap-4 items-center">
        <p className="font-semibold">Sorted</p>
        <CustomSelect selectedValue={sortOption} onSelect={setSortOption} />
      </div>
    </div>
  );
};

export default FilterSection;
