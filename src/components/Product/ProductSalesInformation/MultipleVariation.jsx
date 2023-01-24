import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";

import PesoImage from "assets/images/philippine-peso.png";
import { useState } from "react";
import { IconUpload, IconX } from "@tabler/icons";

function MultipleVariation(props) {
  const { isFormLoading, variationForm, setIsVariation, isEdit } = props;
  // console.log(variationForm.values);
  const addMoreOption = () => {
    variationForm.insertListItem("variations", {
      image: [],
      name: "",
      price: null,
      stock: null,
      sku: "",
      id: Date.now() + 1000,
    });
  };

  const removeOption = (i) => {
    if (variationForm.values.variations.length === 1) {
      variationForm.setValues({ variations: [] });
      setIsVariation(false);
    }
    variationForm.removeListItem("variations", i);
  };

  return (
    <>
      <Grid.Col span={12}>
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
              placeholder="Ex. Color"
              disabled={isFormLoading}
              {...variationForm.getInputProps(`variationName`)}
            />
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={10}>
            <Stack spacing="sm">
              {variationForm.values.variations.map((el, i) => {
                return (
                  <VariationOption
                    key={el.id}
                    item={el}
                    removeOption={removeOption}
                    variationForm={variationForm}
                    isFormLoading={isFormLoading}
                    isEdit={isEdit}
                    i={i}
                  />
                );
              })}
            </Stack>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position="right">
              <Button
                variant="default"
                disabled={isFormLoading}
                onClick={() => {
                  addMoreOption();
                }}
              >
                Add more option
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
        {/* {variationForm.values.variations.map((el1, i1) => {
          return <></>;
        })} */}
      </Grid.Col>
      {/* <Grid.Col span={12}>
        <Group position="right">
          <Button
            size="xs"
            variant="default"
            onClick={() => {
              addMoreOption();
            }}
          >
            Add More Variant
          </Button>
        </Group>
      </Grid.Col> */}
    </>
  );
}

const VariationOption = (props) => {
  const { i, item, variationForm, removeOption, isFormLoading, isEdit } = props;
  return (
    <Paper withBorder pb="sm" px="sm">
      <Group pt="sm" pb="lg" position="right">
        <ActionIcon
          size="sm"
          color="red"
          disabled={isFormLoading}
          onClick={() => {
            removeOption(i);
          }}
        >
          <IconX />
        </ActionIcon>
      </Group>
      <Grid>
        <Grid.Col span={3}>
          <Stack align="center">
            <Group position="center">
              <Image
                isEdit={isEdit}
                item={item}
                variationForm={variationForm}
                i={i}
                isFormLoading={isFormLoading}
              />
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
              {...variationForm.getInputProps(`variations.${i}.image`)}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={9}>
          <Grid
            sx={(theme) => ({
              [theme.fn.largerThan("lg")]: {
                ".item": { marginTop: "-12px" },
              },
            })}
          >
            <Grid.Col span={8} className="item">
              <TextInput
                label={`Option #${i + 1}`}
                withAsterisk
                disabled={isFormLoading}
                {...variationForm.getInputProps(`variations.${i}.name`)}
              />
            </Grid.Col>
            <Grid.Col span={4} className="item">
              <NumberInput
                label="Stock"
                placeholder="20"
                hideControls
                withAsterisk
                disabled={isFormLoading}
                {...variationForm.getInputProps(`variations.${i}.stock`)}
              />
            </Grid.Col>
            <Grid.Col span={6} className="item">
              <NumberInput
                label="Price"
                icon={<img src={PesoImage} width="14px" alt="ph-peso" />}
                hideControls
                disabled={isFormLoading}
                withAsterisk
                {...variationForm.getInputProps(`variations.${i}.price`)}
              />
            </Grid.Col>
            <Grid.Col span={6} className="item">
              <TextInput
                label="SKU"
                withAsterisk
                disabled={isFormLoading}
                {...variationForm.getInputProps(`variations.${i}.sku`)}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

const Image = (props) => {
  const { isFormLoading, variationForm, i, isEdit, item } = props;
  const [tempImgUrl, setTempImgUrl] = useState(isEdit ? item.fileUrl : null);
  const handleMediaInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return true;
    }
    const newForm = Array.from(variationForm.values.variations);
    newForm[i].image = [{ file: file }];
    variationForm.setValues({ variations: newForm });
    setTempImgUrl(URL.createObjectURL(file));
  };

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
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        id={`upload-variation-${i}`}
        type="file"
        disabled={isFormLoading}
        onChange={async (e) => {
          await handleMediaInputChange(e);
        }}
        className="input-upload2"
        // disabled={formLoading}
      />
      <label
        htmlFor={`upload-variation-${i}`}
        style={{
          display: "inline-block",
          // borderRadius: "50%",
          cursor: isFormLoading ? "auto" : "pointer",
          border: "2px solid #e7e7e7",
        }}
      >
        {tempImgUrl ? (
          <Avatar
            src={tempImgUrl}
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

export default MultipleVariation;
