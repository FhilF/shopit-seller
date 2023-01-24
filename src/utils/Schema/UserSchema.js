const { z } = require("zod");

exports.schema = z
  .object({
    name: z.string().min(2, { message: "Enter your name" }),
    username: z.string().min(6, { message: "Minimum of 6 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Enter a password" }),
    cpassword: z.string().min(1, { message: "Enter confirm password" }),
    phoneNumber: z
      .object({
        number: z.number({
          required_error: "Enter your phone number",
          invalid_type_error: "Enter your phone number",
        }),
        countryCode: z.number(),
      })
      .strict(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"], // path of error
  });
