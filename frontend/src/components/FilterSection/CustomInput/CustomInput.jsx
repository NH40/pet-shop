import React from "react";

const CustomInput = React.memo(({ name, value, onChange }) => {
  const handleChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    onChange(digitsOnly);
  };

  return (
    <input
      type="text"
      className="w-[110px] bg-secondary-grey text-main-grey py-2 px-4 outline-none rounded-md"
      placeholder={name}
      name={name}
      value={value}
      autoComplete="off"
      onChange={handleChange}
    />
  );
});

export default CustomInput;
