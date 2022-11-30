import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  List,
  Modal,
  NumberInput,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconPlus, IconUpload, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import produce from "immer";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

function SalesInformation(props) {
  const { variationForm, nonVariationForm, isVariation, setIsVariation } =
    props;

  const AddMoreVariant = () => {
    variationForm.insertListItem("variations", {
      name: "",
      id: Date.now(),
      options: [
        {
          image: "",
          option: "",
          price: null,
          sku: "",
          id: Date.now() + 1000,
        },
      ],
    });
  };

  const addMoreOption = (i) => {
    variationForm.insertListItem(`variations.${i}.options`, {
      image: "",
      option: "",
      price: null,
      sku: "",
      id: Date.now() + 1000,
    });
  };

  const removeVariant = (i) => {
    if (variationForm.values.variations.length === 1) {
      variationForm.setValues({ variations: [] });
      nonVariationForm.setValues({ price: null, stock: null });
      setIsVariation(false);
      // variationForm.setFieldValue('path', value)
    }
    variationForm.removeListItem("variations", i);
  };

  const removeOption = (i1, i2) => {
    if (variationForm.values.variations[i1].options.length === 1) {
      showNotification({
        title: "Cannot be removed!",
        message: "Variant should have atleast 1 option",
        color: "red",
      });
      return true;
    }

    variationForm.removeListItem(`variations.${i1}.options`, i2);
  };

  useEffect(() => {
    // console.log(variations);
  }, []);

  return (
    <Stack>
      <Box className="container-form">
        <Box
          sx={(theme) => ({
            marginBottom: "30px",
            // [theme.fn.largerThan("md")]: {
            //   marginLeft: "40px",
            // },
          })}
        >
          <Divider
            size="sm"
            sx={(theme) => ({
              width: "80px",
              // borderTopColor: `${theme.colors.yellow[6]} !important`,
            })}
          />
          <Group position="apart">
            <Stack spacing={0}>
              <Text weight={600} color="dark.4" mt="xs">
                Sales Information
              </Text>
              <Text color="gray.5" size="sm">
                Input product information to show to users
              </Text>
            </Stack>
            <Switch
              styles={{ root: { lineHeight: 0 } }}
              checked={isVariation}
              onChange={() => {
                if (isVariation) {
                  variationForm.setValues({ variations: [] });
                  nonVariationForm.setValues({ price: null, stock: null });
                  setIsVariation(false);
                } else {
                  variationForm.insertListItem("variations", {
                    name: "",
                    id: Date.now(),
                    options: [
                      {
                        image: "",
                        option: "",
                        price: null,
                        sku: "",
                        id: Date.now() + 1000,
                      },
                    ],
                  });
                  nonVariationForm.setValues({ price: null, stock: null });
                  setIsVariation(true);
                }
              }}
              label={<Text weight={600}>Enable Multiple Variation</Text>}
            />
          </Group>
        </Box>
        <Grid gutter="lg" className="input-container">
          {isVariation ? (
            <>
              <Grid.Col span={12}>
                {variationForm.values.variations.map((el1, i1) => {
                  return (
                    <Box py="md" px="sm" key={el1.id}>
                      <Paper withBorder py="xl" px="sm">
                        <Grid
                          gutter="lg"
                          sx={{
                            ".item-a": {
                              display: "flex",
                              justifyContent: "flex-end",
                            },
                          }}
                        >
                          <Grid.Col span={2} className="item-a">
                            <Text weight={600} size="sm" color="dark.4">
                              Variation
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={10}>
                            <TextInput
                              sx={(theme) => ({
                                width: "100%",
                                [theme.fn.largerThan("lg")]: {
                                  width: "400px",
                                },
                              })}
                              // w={400}
                              placeholder="Product"
                              {...variationForm.getInputProps(
                                `variations.${i1}.name`
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col
                            span={2}
                            className="item-a"
                            sx={{ alignSelf: "flex-start !important" }}
                          >
                            <Text weight={600} size="sm" color="dark.4">
                              Options
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={10} p="lg">
                            <Grid
                              sx={{
                                border: "1px solid #dee2e6",
                                ".variations-item": {
                                  borderBottom: "1px solid #dee2e6",
                                },
                                ".variations-item-b": {
                                  borderLeft: "1px solid #dee2e6",
                                },
                              }}
                            >
                              <Grid.Col
                                span={3}
                                className="variation-item variation-item-a"
                                sx={{}}
                                py="sm"
                              >
                                <Group position="center">
                                  <Text weight={600} size="sm" color="dark.4">
                                    Image
                                  </Text>
                                </Group>
                              </Grid.Col>
                              <Grid.Col
                                span={9}
                                className="variation-item variation-item-b"
                                sx={{}}
                                py="sm"
                              >
                                <Text weight={600} size="sm" color="dark.4">
                                  Values
                                </Text>
                              </Grid.Col>
                              {el1.options.map((el2, i2) => {
                                return (
                                  <VariationOption
                                    key={el2.id}
                                    variationForm={variationForm}
                                    removeOption={removeOption}
                                    el1={el1}
                                    el2={el2}
                                    i1={i1}
                                    i2={i2}
                                  />
                                );
                              })}
                            </Grid>
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Group position="right" spacing="xs">
                              <Button
                                color="red"
                                size="xs"
                                onClick={() => {
                                  removeVariant(i1);
                                }}
                              >
                                Remove Variant
                              </Button>
                              <Button
                                size="xs"
                                variant="default"
                                onClick={() => {
                                  addMoreOption(i1);
                                }}
                              >
                                Add More Option
                              </Button>
                            </Group>
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    </Box>
                  );
                })}
              </Grid.Col>
              <Grid.Col span={12}>
                <Group position="right">
                  <Button
                    size="xs"
                    variant="default"
                    onClick={() => {
                      AddMoreVariant();
                    }}
                  >
                    Add More Variant
                  </Button>
                </Group>
              </Grid.Col>
            </>
          ) : (
            <>
              <Grid.Col span={12} sm={3} lg={4} className="item-a">
                <Text size="sm" weight={600} color="dark.4">
                  Price
                  <span style={{ color: "red" }}>*</span>
                </Text>
              </Grid.Col>
              <Grid.Col span={12} sm={9} lg={8} className="item-b">
                <NumberInput
                  hideControls
                  placeholder="Product Price"
                  {...nonVariationForm.getInputProps(`price`)}
                />
              </Grid.Col>
              <Grid.Col span={12} sm={3} lg={4} className="item-a">
                <Text size="sm" weight={600} color="dark.4">
                  Stock<span style={{ color: "red" }}>*</span>
                </Text>
              </Grid.Col>
              <Grid.Col span={12} sm={9} lg={8} className="item-b">
                <NumberInput
                  hideControls
                  placeholder="Product Stock"
                  {...nonVariationForm.getInputProps(`stock`)}
                  //   {...form.getInputProps("name")}
                />
              </Grid.Col>
            </>
          )}
        </Grid>
      </Box>
    </Stack>
  );
}

const VariationOption = (props) => {
  const { el1, el2, i1, i2, variationForm, removeOption } = props;
  return (
    <>
      <Grid.Col
        span={3}
        className="variation-item variation-item-a"
        sx={{}}
        py="md"
      >
        <Stack align="center">
          <Group position="center">
            <Image />
          </Group>
          <TextInput
            sx={{
              ".mantine-Text-root": {
                marginTop: "-4px",
              },
              ".mantine-Input-wrapper": {
                display: "none",
              },
            }}
            {...variationForm.getInputProps(
              `variations.${i1}.options.${i2}.image`
            )}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col
        span={9}
        className="variation-item variation-item-b"
        sx={{}}
        pb="md"
      >
        <Stack spacing={2}>
          <Grid gutter="sm">
            <Grid.Col lg={8}>
              <TextInput
                label={`Option#${i2 + 1}`}
                {...variationForm.getInputProps(
                  `variations.${i1}.options.${i2}.option`
                )}
              />
            </Grid.Col>
            <Grid.Col lg={4}>
              <NumberInput
                label="Stock"
                {...variationForm.getInputProps(
                  `variations.${i1}.options.${i2}.stock`
                )}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <NumberInput
                label="Price"
                hideControls
                {...variationForm.getInputProps(
                  `variations.${i1}.options.${i2}.price`
                )}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                label="SKU"
                {...variationForm.getInputProps(
                  `variations.${i1}.options.${i2}.sku`
                )}
              />
            </Grid.Col>
          </Grid>
          <Group position="right" mt={8}>
            <Button size="xs" color="red" onClick={() => removeOption(i1, i2)}>
              Remove Option #{i2 + 1}
            </Button>
          </Group>
        </Stack>
      </Grid.Col>
    </>
  );
};

const Image = (props) => {
  const { tempImgUrls } = props;
  return (
    <Box
      sx={(theme) => ({
        // position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "120px",
        [theme.fn.smallerThan("sm")]: {
          marginTop: "4px",
        },
      })}
    >
      <input
        accept="image/png, image/gif, image/jpeg"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={async (e) => {
          // await handleMediaInputChange(e);
        }}
        className="input-upload"
        // disabled={formLoading}
      />
      <label
        htmlFor="raised-button-file"
        style={{
          display: "inline-block",
          // borderRadius: "50%",
          cursor: "pointer",
          border: "2px solid #e7e7e7",
        }}
      >
        {tempImgUrls ? (
          <Avatar
            src={tempImgUrls}
            size={110}
            alt="prev-shop-logo"
            sx={(theme) => ({
              // borderRadius: "50%",
              ".mantine-Avatar-placeholder": {
                backgroundColor: theme.colors.gray[3],
              },
            })}
          />
        ) : (
          <Avatar
            size={110}
            alt="upload-shop-logo"
            sx={(theme) => ({
              // borderRadius: "50%",
              ".mantine-Avatar-placeholder": {
                backgroundColor: theme.colors.gray[3],
              },
            })}
          >
            <IconUpload />
          </Avatar>
        )}
      </label>
    </Box>
  );
};

export default SalesInformation;
