export function getDiscountPercent(price, discountPrice) {
  if (
    typeof price !== "number" ||
    typeof discountPrice !== "number" ||
    price <= 0 ||
    discountPrice >= price
  ) {
    return 0;
  }

  const discount = ((price - discountPrice) / price) * 100;
  return Math.round(discount);
}

export function priceFormatting(price) {
  if (typeof price !== "number" || isNaN(price)) return "$0";
  return `$${price}`;
}
