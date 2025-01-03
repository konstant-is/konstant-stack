import slugify from "slugify";

export const capitalize = (str: string = ""): string => {
  if (!str.length) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatSlug = (value: string = "") =>
  slugify(value, {
    lower: true,
    trim: true,
  });
