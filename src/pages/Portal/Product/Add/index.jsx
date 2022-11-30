import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  List,
  NumberInput,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import React, { useState } from "react";
import ProductInformation from "./ProductInformation";
import ProductSpecification from "./ProductSpecification";
import ProductSalesInformation from "./ProductSalesInformation";
import { useForm, zodResolver } from "@mantine/form";
import {
  informationSchema,
  specificationSchema,
  variationSchema,
  nonVariationSchema,
} from "./Schema";

function AddProduct() {
  // const [productInputs, setProductInputs] = useState([
  //   { label: null, value: null, id: Date.now() },
  // ]);

  const [isVariation, setIsVariation] = useState(false);

  const informationForm = useForm({
    initialValues: {
      image: "",
      name: "",
      category: "",
      description: "",
    },
    validate: zodResolver(informationSchema),
  });

  const specificationForm = useForm({
    initialValues: {
      specifications: [
        {
          label: "",
          value: "",
          id: Date.now(),
        },
      ],
    },
    validate: zodResolver(specificationSchema),
  });

  const variationForm = useForm({
    initialValues: { variations: [] },
    validate: zodResolver(variationSchema),
  });

  const nonVariationForm = useForm({
    initialValues: { price: 0, stock: 0 },
    validate: zodResolver(nonVariationSchema),
  });

  return (
    <Box mt="xs" mb="xl" pt="xl" pb={40}>
      <Text weight={600} size="xl" color="dark.3">
        Add New Product
      </Text>

      <Box
        mt={32}
        sx={(theme) => ({
          width: "100%",
          ".input-container": {
            ".item-a": {
              alignSelf: "center",
            },
            [theme.fn.smallerThan("sm")]: {
              ".item-a": {
                marginBottom: "-16px",
              },
            },
            [theme.fn.largerThan("lg")]: {
              ".item-a": {
                textAlign: "right",
              },
              // width: theme.breakpoints.sm,
            },
            [theme.fn.largerThan("xl")]: {},
          },
        })}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isVariation) {
              console.log(variationForm.values);
              console.log(variationForm.validate());
            } else {
              console.log(nonVariationForm.values);
              console.log(nonVariationForm.validate());
            }

            console.log(specificationForm.values);
            console.log(specificationForm.validate());

            console.log(informationForm.values);
            console.log(informationForm.validate());
          }}
        >
          <Stack spacing={60}>
            <ProductInformation informationForm={informationForm} />
            <ProductSpecification specificationForm={specificationForm} />
            <ProductSalesInformation
              variationForm={variationForm}
              nonVariationForm={nonVariationForm}
              isVariation={isVariation}
              setIsVariation={setIsVariation}
            />
            <Box>
              <Group position="right">
                <Button color="yellow.6" type="submit">
                  Submit
                </Button>
              </Group>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default AddProduct;
