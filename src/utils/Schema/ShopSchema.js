const { z } = require("zod");

exports.setUpSchema = z.object({
  name: z.string().min(2, { message: "Enter your Shop Name" }),
  description: z.string().optional(),
  phoneNumber: z
    .object({
      number: z.number({
        required_error: "Enter your phone number",
        invalid_type_error: "Enter your phone number",
      }),
      countryCode: z.number(),
    })
    .strict(),
  shopRepresentative: z
    .string()
    .min(2, { message: "Enter your Shop Representative" }),

  image: z
    .array(z.object({ file: z.instanceof(File) }))
    .max(1, { message: "Must upload 1 image" }),
  region: z.string().min(1, { message: "Enter your region" }),
  province: z.string().min(1, { message: "Enter your province" }),
  city: z.string().min(1, { message: "Enter your city" }),
  barangay: z.string().min(1, { message: "Enter your barangay" }),
  zipCode: z
    .number({
      required_error: "Enter your postal code",
      invalid_type_error: "Enter your postal code",
    })
    .refine((val) => val.toString().length > 1, {
      message: "Invalid postal code",
    }),
  addressLine1: z.string().min(1, { message: "Enter your address" }),
});

exports.profileEditSchema = z.object({
  image: z
    .array(z.object({ file: z.instanceof(File) }))
    .max(1, { message: "Must upload 1 image" }),
  name: z.string().min(2, { message: "Enter your Shop Name" }),
  description: z.string().optional(),
});

exports.privateEditSchema = z.object({
  phoneNumber: z
    .object({
      number: z.number({
        required_error: "Enter your phone number",
        invalid_type_error: "Enter your phone number",
      }),
      countryCode: z.number(),
    })
    .strict(),
  shopRepresentative: z
    .string()
    .min(2, { message: "Enter your Shop Representative" }),
});

exports.addressEditSchema = z.object({
  region: z.string().min(1, { message: "Enter your region" }),
  province: z.string().min(1, { message: "Enter your province" }),
  city: z.string().min(1, { message: "Enter your city" }),
  barangay: z.string().min(1, { message: "Enter your barangay" }),
  zipCode: z
    .number({
      required_error: "Enter your postal code",
      invalid_type_error: "Enter your postal code",
    })
    .refine((val) => val.toString().length > 1, {
      message: "Invalid postal code",
    }),
  addressLine1: z.string().min(1, { message: "Enter your address" }),
});
