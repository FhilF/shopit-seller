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
import PesoImage from "assets/images/philippine-peso.png";
import MultipleVariation from "./MultipleVariation";

function SalesInformation(props) {
  const {
    isFormLoading,
    variationForm,
    nonVariationForm,
    isVariation,
    setIsVariation,
    productEdit,
  } = props;

  useEffect(() => {
    if (productEdit) {
      if (productEdit.isMultipleVariation) {
        setIsVariation(true);
        variationForm.setValues({
          variationName: productEdit.variationName,
          isMultipleVariation: true,
          variations: productEdit.variations.map((v) => {
            return {
              ...v,
              image: [],
              id: Date.now() + Math.random(),
            };
          }),
        });
      } else {
        nonVariationForm.setValues({
          price: productEdit.price,
          stock: productEdit.stock,
        });
        setIsVariation(false);
      }
    }
  }, [productEdit]);

  // useEffect(() => {
  //   console.log(variationForm.values.variations);
  // }, [variationForm.values.variations]);

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
              disabled={isFormLoading}
              onChange={() => {
                if (isVariation) {
                  variationForm.setValues({ variations: [] });
                  nonVariationForm.setValues({
                    isMultipleVariation: false,
                    price: null,
                    stock: null,
                  });
                  setIsVariation(false);
                } else {
                  variationForm.setValues({
                    variationName: "",
                    isMultipleVariation: true,
                    variations: [
                      {
                        name: "",
                        id: Date.now() + Math.floor(Math.random()),
                        image: [],
                        stock: null,
                        price: null,
                        sku: "",
                      },
                    ],
                  });
                  setIsVariation(true);
                }
              }}
              label={<Text weight={600}>Enable Multiple Variation</Text>}
            />
          </Group>
        </Box>
        <Grid gutter="lg" className="input-container">
          {isVariation ? (
            <MultipleVariation
              variationForm={variationForm}
              setIsVariation={setIsVariation}
              isFormLoading={isFormLoading}
              isEdit={productEdit ? true : false}
              //   AddMoreVariant={AddMoreVariant}
            />
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
                  icon={<img src={PesoImage} width="14px" alt="ph-peso" />}
                  disabled={isFormLoading}
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
                  disabled={isFormLoading}
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

export default SalesInformation;
