import { ROUTES } from "./routes";

export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export const getCategoryBySlug = (dataFromRedux, slug) => {
  return dataFromRedux.find((dataItem) => slugify(dataItem.title) === slug);
};

export const getCategorySlug = (title) => slugify(title);

export const getProductSlug = (title, id) => `${slugify(title)}-item-${id}`;

export const getIdFromSlug = (slug) => {
  const parts = slug.split("-");
  const id = Number(parts[parts.length - 1]);
  return isNaN(id) ? null : id;
};

export const getProductLink = (product, categories) => {
  const category = categories.find((cat) => cat.id === product.categoryId);
  const categorySlug = category ? getCategorySlug(category.title) : "unknown";
  const productSlug = getProductSlug(product.title, product.id);
  return `${ROUTES.CATEGORIES}/${categorySlug}/${productSlug}`;
};
