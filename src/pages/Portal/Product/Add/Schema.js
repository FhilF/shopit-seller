const { z } = require("zod");

exports.informationSchema = z.object({
  image: z.string().min(1, { message: "Upload image" }),
  name: z.string().min(1, { message: "Enter product name" }),
  category: z.string().min(1, { message: "Enter product category" }),
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
  variations: z.array(
    z.object({
      name: z.string().min(1, { message: "Enter variation name" }),
      options: z.array(
        z.object({
          image: z.string().min(1, { message: "Upload image" }),
          option: z.string().min(1, { message: "Enter option name" }),
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
    })
  ),
});

exports.nonVariationSchema = z.object({
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
