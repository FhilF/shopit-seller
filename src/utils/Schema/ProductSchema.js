const { z } = require("zod");

exports.informationSchema = z.object({
  images: z
    .array(z.object({ file: z.instanceof(File), isThumbnail: z.boolean() }))
    .min(1, { message: "Must upload atleast 1 image(s)" }),
  name: z.string().min(1, { message: "Enter product name" }),
  Departments: z
    .array(z.object({ _id: z.string(), name: z.string() }))
    .min(1, { message: "Enter product department" }),
  description: z.string().min(1, { message: "Enter product description" }),
});

exports.specificationSchema = z.object({
  specifications: z
    .array(
      z.object({
        label: z.string().min(1, { message: "Enter label" }),
        value: z.string().min(1, { message: "Enter value" }),
      })
    )
    .min(1),
});

exports.variationSchema = z.object({
  isMultipleVariation: z.boolean(),
  variationName: z.string().min(1, { message: "Enter variation name" }),
  variations: z.array(
    z.object({
      name: z.string().min(1, { message: "Enter option name" }),
      image: z
        .array(z.object({ file: z.instanceof(File) }))
        .min(1, { message: "Must upload 1 image" })
        .max(1, { message: "Must upload 1 image" }),
      stock: z
        .number({
          required_error: "Enter stock",
          invalid_type_error: "Enter stock",
        })
        .gt(0, { message: "Enter stock" }),
      price: z
        .number({
          required_error: "Enter price",
          invalid_type_error: "Enter price",
        })
        .gt(0, { message: "Enter price" }),
      sku: z.string().min(1, { message: "Enter SKU" }),
    })
  ),
});

exports.nonVariationSchema = z.object({
  isMultipleVariation: z.boolean(),
  price: z
    .number({
      required_error: "Enter price",
      invalid_type_error: "Enter price",
    })
    .gt(0, { message: "Enter price" }),
  stock: z
    .number({
      required_error: "Enter stock",
      invalid_type_error: "Enter stock",
    })
    .gt(0, { message: "Enter stock" }),
});

exports.editInformationSchema = z.object({
  images: z.array(
    z.object({ file: z.instanceof(File).optional(), isThumbnail: z.boolean() })
  ),
  name: z.string().min(1, { message: "Enter product name" }),
  Departments: z
    .array(z.object({ _id: z.string(), name: z.string() }))
    .min(1, { message: "Enter product department" }),
  description: z.string().min(1, { message: "Enter product description" }),
});

exports.editVariationSchema = z.object({
  isMultipleVariation: z.boolean(),
  variationName: z.string().min(1, { message: "Enter variation name" }),
  variations: z.array(
    z.object({
      name: z.string().min(1, { message: "Enter option name" }),
      image: z
        .array(z.object({ file: z.instanceof(File) }))
        .max(1, { message: "Must upload 1 image" }),
      stock: z
        .number({
          required_error: "Enter stock",
          invalid_type_error: "Enter stock",
        })
        .gt(0, { message: "Enter stock" }),
      price: z
        .number({
          required_error: "Enter price",
          invalid_type_error: "Enter price",
        })
        .gt(0, { message: "Enter price" }),
      sku: z.string().min(1, { message: "Enter SKU" }),
    })
  ),
});
