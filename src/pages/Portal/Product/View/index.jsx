import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  List,
  LoadingOverlay,
  NumberInput,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";

import _ from "lodash";
import ProductInformation from "components/Product/ProductInformation";
import ProductSpecification from "components/Product/ProductSpecification";
import ProductSalesInformation from "components/Product/ProductSalesInformation";
import { useForm, zodResolver } from "@mantine/form";
import {
  editInformationSchema,
  specificationSchema,
  editVariationSchema,
  nonVariationSchema,
} from "utils/Schema/ProductSchema";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import ItemNotFound from "components/ContentMessage";
import { useContentMessage } from "utils/contentMessageProvider";

function View(props) {
  const [isVariation, setIsVariation] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const { errorType, setErrorType } = useContentMessage();

  const productRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`api/shop/product/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const productData = res.data.product;
        productRef.current = productData;

        setProduct({ ...productData, dataId: Date.now() });
        setProductImages([...productData.images]);
        setIsFormLoading(false);

        // setProducts(res.data.products);
        // console.log(res);
        // setisPageLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setErrorType("Item404");
          return true;
        }

        setErrorType("Error500");
        // setisPageLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const informationForm = useForm({
    initialValues: {
      images: [],
      name: "",
      Departments: [],
      description: "",
    },
    validate: zodResolver(editInformationSchema),
  });

  const specificationForm = useForm({
    initialValues: {
      specifications: [],
    },
    validate: zodResolver(specificationSchema),
  });

  const variationForm = useForm({
    initialValues: {
      isMultipleVariation: false,
      variationName: "",
      variations: [],
    },
    validate: zodResolver(editVariationSchema),
  });

  const nonVariationForm = useForm({
    initialValues: {
      isMultipleVariation: false,
      price: null,
      stock: null,
    },
    validate: zodResolver(nonVariationSchema),
  });

  // useEffect(() => {
  //   if (isError) {
  //     setNotFound(true);
  //   }
  // }, [isError]);

  const resetChanges = () => {
    setProduct({ ...productRef.current, dataId: Date.now() });
  };

  const save = () => {
    let formErrors = [];
    let salesInformation;

    let payload = {};
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

    const formImage = newProdInfo.images;
    const newDepartment = newProdInfo.Departments;
    delete newProdInfo["images"];
    delete newProdInfo["Departments"];

    const diff = _.reduce(
      newProdInfo,
      function (result, value, key) {
        return _.isEqual(value, productRef.current[key])
          ? result
          : result.concat(key);
      },
      []
    );

    let oldImages = [];
    let newImagesSettings = [];
    let newImages = [];
    formImage.forEach((v) => {
      if (v._id) {
        oldImages.push({
          _id: v._id,
          isThumbnail: v.isThumbnail,
        });
      } else {
        newImagesSettings.push(v.isThumbnail);
        newImages.push(v.file);
      }
    });

    if (oldImages.length < productRef.current.images.length) {
      if (oldImages.length === 0) {
        payload.resetImages = true;
      } else {
        payload.oldImagesSettings = oldImages;
      }
    } else {
      const updatedOldImages = oldImages.filter(
        ({ _id: id1, isThumbnail: i1 }) =>
          !productRef.current.images.some(
            ({ _id: id2, isThumbnail: i2 }) => i1 === i2 && id1 === id2
          )
      );

      if (updatedOldImages.length > 0) {
        payload.oldImagesSettings = oldImages;
      }
    }

    if (newImagesSettings.length > 0) {
      payload.newImagesSettings = newImagesSettings;
    }

    diff.forEach((v) => {
      payload[v] = newProdInfo[v];
    });

    const filteredDept = newDepartment.filter(
      ({ _id: id1 }) =>
        !productRef.current.Departments.some(({ _id: id2 }) => id2 === id1)
    );

    if (filteredDept.length > 0) {
      let newProdDept = [];
      newDepartment.forEach((v) => {
        newProdDept.push(v._id);
      });
      payload.Departments = newProdDept;
    }

    const filterdNewProdSpec = newProdSpecification.specifications.filter(
      ({ label: l1, value: v1 }) =>
        !productRef.current.specifications.some(
          ({ label: l2, value: v2 }) => l1 === l2 && v1 === v2
        )
    );

    if (
      filterdNewProdSpec.length > 0 ||
      newProdSpecification.specifications.length <
        productRef.current.specifications.length
    ) {
      let newSpec = [];
      newProdSpecification.specifications.forEach((v) => {
        newSpec.push({ label: v.label, value: v.value });
      });
      payload.specifications = newSpec;
    }

    let oldVariationData = [];
    let newVariationData = [];

    let oldVariationsNewImage = [];
    let newVariationsImage = [];

    let variationErrorsImage = [];

    if (salesInformation.isMultipleVariation) {
      payload.isMultipleVariation = true;
      if (
        salesInformation.isMultipleVariation ===
        productRef.current.isMultipleVariation
      ) {
        salesInformation.variations.forEach((v, i) => {
          if (v._id) {
            let data = {
              name: v.name,
              price: v.price,
              sku: v.sku,
              stock: v.stock,
              _id: v._id,
            };

            if (v.image.length > 0) {
              let image = v.image[0]?.file;
              if (image) {
                data.newImage = true;
                oldVariationsNewImage.push(image);
              } else {
                variationErrorsImage.push(i);
              }
            }
            oldVariationData.push(data);
          } else {
            newVariationsImage.push(v.image[0].file);
            newVariationData.push({
              name: v.name,
              price: v.price,
              sku: v.sku,
              stock: v.stock,
            });
          }
        });

        if (variationErrorsImage.length > 0) {
          return true;
        }

        if (
          salesInformation.variationName !== productRef.current.variationName
        ) {
          payload.variationName = salesInformation.variationName;
        }

        if (oldVariationData.length < productRef.current.variations.length) {
          if (oldVariationData.length === 0) {
            payload.resetVariants = true;
          } else {
            payload.oldVariations = oldVariationData;
          }
        } else {
          const updatedOldVariants = oldVariationData.filter(
            ({ name: n1, price: p1, sku: s1, stock: sk1, newImage: ni1 }) =>
              !productRef.current.variations.some(
                ({ name: n2, price: p2, sku: s2, stock: sk2, newImage: ni2 }) =>
                  n1 === n2 &&
                  p1 === p2 &&
                  s1 === s2 &&
                  sk1 === sk2 &&
                  ni1 === ni2
              )
          );
          if (updatedOldVariants.length > 0) {
            payload.oldVariations = oldVariationData;
          }
        }

        if (newVariationData.length > 0) {
          payload.newVariations = newVariationData;
        }
      } else {
        let newVariations = [];
        salesInformation.variations.forEach((v, i) => {
          let image = v.image[0]?.file;
          if (image) {
            newVariationsImage.push(image);
          } else {
            variationErrorsImage.push(i);
          }
          newVariations.push({
            name: v.name,
            stock: v.stock,
            price: v.price,
            sku: v.sku,
          });
        });
        payload.variationName = salesInformation.variationName;
        payload.newVariations = newVariations;
      }
    } else {
      payload.isMultipleVariation = false;
      if (
        salesInformation.isMultipleVariation ===
        productRef.current.isMultipleVariation
      ) {
        if (salesInformation.price !== productRef.current.price) {
          payload.price = salesInformation.price;
        }

        if (salesInformation.stock !== productRef.current.stock) {
          payload.stock = salesInformation.stock;
        }
      } else {
        payload = {
          ...payload,
          ...salesInformation,
        };
      }
    }

    if (variationErrorsImage.length > 0) {
      variationForm.setErrors(
        variationErrorsImage.reduce(
          (acc, i) => ((acc[`variations.${i}.image`] = "Upload Image"), acc),
          {}
        )
      );
      showNotification({
        title: "Error submitting form",
        message: "Please finish the required inputs before submitting",
        color: "red",
      });
      setIsFormLoading(false);
      return true;
    }

    if (
      Object.keys(payload).filter((v) => v !== "isMultipleVariation").length ===
      0
    ) {
      showNotification({
        title: "Form not submitted",
        message: "There were no changes made to the product details",
        color: "yellow",
      });
      setIsFormLoading(false);
      return true;
    }
    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));

    newImages.forEach((v) => {
      formData.append("newProdImages", v);
    });

    oldVariationsNewImage.forEach((v) => {
      formData.append("oldVariationsNewImage", v);
    });

    newVariationsImage.forEach((v) => {
      formData.append("newVariationsImage", v);
    });
    axios
      .patch(`api/shop/product/${productRef.current._id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const productData = res.data.product;
        productRef.current = productData;

        setProduct({ ...productData, dataId: Date.now() });
        setProductImages([...productData.images]);
        setIsFormLoading(false);
        showNotification({
          title: "Success!",
          message: "Your product has been successfully updated!",
          color: "teal",
        });
        // navigate("/portal/product");
      })
      .catch((err) => {
        setIsFormLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (errorType) console.log(errorType);
  }, [errorType]);

  return (
    <Paper className="content">
      <Box mb="xl" pt="xl" pb={40}>
        <Text weight={600} size="xl" color="dark.3">
          Edit Product
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
              save();
              // setIsError(true);
              // submitForm();
            }}
            encType="multipart/form-data"
          >
            <Stack spacing={60}>
              <ProductInformation
                productEdit={product}
                productRef={productRef}
                informationForm={informationForm}
                isFormLoading={isFormLoading}
                productImages={productImages}
                setProductImages={setProductImages}
              />
              <ProductSpecification
                productEdit={product}
                specificationForm={specificationForm}
                isFormLoading={isFormLoading}
              />
              <ProductSalesInformation
                productEdit={product}
                variationForm={variationForm}
                nonVariationForm={nonVariationForm}
                isVariation={isVariation}
                setIsVariation={setIsVariation}
                isFormLoading={isFormLoading}
              />
              <Box>
                <Group position="right">
                  <Button
                    variant="subtle"
                    color="gray.7"
                    disabled={isFormLoading}
                    onClick={() => resetChanges()}
                  >
                    Reset Changes
                  </Button>
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

export default View;
