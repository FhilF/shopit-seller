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
import React, { useEffect, useState } from "react";
import ProductInformation from "../../../../components/Product/ProductInformation";
import ProductSpecification from "../../../../components/Product/ProductSpecification";
import ProductSalesInformation from "../../../../components/Product/ProductSalesInformation";
import { useForm, zodResolver } from "@mantine/form";
import {
  informationSchema,
  specificationSchema,
  variationSchema,
  nonVariationSchema,
} from "utils/Schema/ProductSchema";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  // const [productInputs, setProductInputs] = useState([
  //   { label: null, value: null, id: Date.now() },
  // ]);

  const [isVariation, setIsVariation] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const navigate = useNavigate();

  const informationForm = useForm({
    initialValues: {
      images: [],
      name: "",
      Departments: [],
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
    initialValues: {
      isMultipleVariation: false,
      variationName: "",
      variations: [],
    },
    validate: zodResolver(variationSchema),
  });

  const nonVariationForm = useForm({
    initialValues: {
      isMultipleVariation: false,
      price: null,
      stock: null,
    },
    validate: zodResolver(nonVariationSchema),
  });

  const submitForm = () => {
    let formErrors = [];
    let salesInformation;
    setIsFormLoading(true);
    if (isVariation) {
      salesInformation = Object.assign({}, { ...variationForm.values });
      formErrors = [
        ...formErrors,
        variationForm.validate().hasErrors ? true : false,
      ];
    } else {
      salesInformation = Object.assign({}, { ...nonVariationForm.values });
      formErrors = [
        ...formErrors,
        nonVariationForm.validate().hasErrors ? true : false,
      ];
    }

    formErrors = [
      ...formErrors,
      specificationForm.validate().hasErrors ? true : false,
      informationForm.validate().hasErrors ? true : false,
    ];

    if (formErrors.filter((v) => v).length > 0) {
      setIsFormLoading(false);
      showNotification({
        title: "Error submitting form",
        message: "Please finish the required inputs before submitting",
        color: "red",
      });
      return true;
    }

    const newProdInfo = Object.assign({}, { ...informationForm.values });
    const newProdSpecification = Object.assign(
      {},
      { ...specificationForm.values }
    );

    let newProdInfoImages = [];
    let newProdInfoImagesSettings = [];

    newProdInfo.images.forEach((v) => {
      newProdInfoImages.push(v.file);
      newProdInfoImagesSettings.push(v.isThumbnail);
    });
    newProdInfo.imageSettings = [...newProdInfoImagesSettings];

    let newProdDept = [];
    newProdInfo.Departments.forEach((v) => {
      newProdDept.push(v._id);
    });
    newProdInfo.Departments = newProdDept;

    let modifiedSpec = [];

    newProdSpecification.specifications.forEach((v) => {
      modifiedSpec.push({ label: v.label, value: v.value });
    });

    let prodVariantImages = [];
    let newVariations = [];

    if (salesInformation.isMultipleVariation) {
      salesInformation.variations.forEach((v, i) => {
        prodVariantImages.push(v.image[0].file);
        newVariations.push({
          name: v.name,
          stock: v.stock,
          price: v.price,
          sku: v.sku,
        });
      });
      salesInformation.variations = newVariations;
    }

    const payload = {
      ...newProdInfo,
      specifications: modifiedSpec,
      ...salesInformation,
    };

    const formData = new FormData();
    newProdInfoImages.forEach((v) => {
      formData.append("prodInfoImages", v);
    });

    if (payload.isMultipleVariation) {
      prodVariantImages.forEach((v) => {
        formData.append("prodVariantImages", v);
      });
    }

    formData.append("payload", JSON.stringify(payload));
    axios
      .post("api/shop/product", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsFormLoading(false);
        showNotification({
          title: "Success!",
          message: "New product added.",
          color: "teal",
        });
        navigate("/portal/product");
      })
      .catch((err) => {showNotification({
        title: "Error!",
        message:
          "There was an error processing your request. Please try again later",
        color: "red",
      });
        setIsFormLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  return (
    <Paper className="content">
      <Box mb="xl" pt="xl" pb={40}>
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
              submitForm();
            }}
            encType="multipart/form-data"
          >
            <Stack spacing={60}>
              <ProductInformation
                informationForm={informationForm}
                isFormLoading={isFormLoading}
              />
              <ProductSpecification
                specificationForm={specificationForm}
                isFormLoading={isFormLoading}
              />
              <ProductSalesInformation
                variationForm={variationForm}
                nonVariationForm={nonVariationForm}
                isVariation={isVariation}
                setIsVariation={setIsVariation}
                isFormLoading={isFormLoading}
              />
              <Box>
                <Group position="right">
                  <Button
                    color="yellow.6"
                    type="submit"
                    disabled={isFormLoading}
                  >
                    Submit
                  </Button>
                </Group>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </Paper>
  );
}

export default AddProduct;
