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
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useState } from "react";

const gridSx = (theme) => {
  return {
    ".item": {
      display: "flex",
      alignItems: "center",
      div: {
        width: "100%",
      },
    },
    ".item-a": {
      justifyContent: "flex-end",
      [theme.fn.largerThan("lg")]: {
        ".inner": { width: "260px", textAlign: "left" },
      },
    },
  };
};

function ProductSpecification(props) {
  const { specificationForm } = props;
  const addRow = () => {
    specificationForm.insertListItem("specifications", {
      label: "",
      value: "",
      id: Date.now(),
    });
  };

  const removeRow = (i) => {
    if (specificationForm.values.specifications.length < 2) {
      showNotification({
        title: "Cannot remove row!",
        message: "Please input atleast 1 specification of your product.",
        color: "red",
      });
      return true;
    }
    specificationForm.removeListItem("specifications", i);
  };

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
          <Text weight={600} color="dark.4" mt="xs">
            Product Specification
          </Text>
          <Text color="gray.5" size="sm">
            Fill in your product specification to boost exposure
          </Text>
        </Box>
        <Grid
          gutter="md"
          className="input-container"
          sx={(theme) => gridSx(theme)}
        >
          <Grid.Col span={12} sm={3} md={5} className="item item-a title">
            <Box className="inner">
              <Text size="sm" weight={600}>
                Label
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={12} sm={9} md={6} className="item item-b title">
            <Box className="inner">
              <Text size="sm" weight={600}>
                Specification
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={12} sm={9} md={1} className="item item-c">
            {/* <Box>
              <TextInput
                placeholder="Shop Name"
                //   {...form.getInputProps("name")}
              />
            </Box> */}
          </Grid.Col>
        </Grid>

        <Stack mt="sm" sx={(theme) => gridSx(theme)}>
          {specificationForm.values.specifications.map((el, i) => {
            return (
              <Grid key={el.id}>
                <Grid.Col span={12} sm={3} lg={5} className="item item-a">
                  <Box className="inner">
                    <TextInput
                      placeholder="Ex: Brand"
                      {...specificationForm.getInputProps(
                        `specifications.${i}.label`
                      )}
                    />
                  </Box>
                </Grid.Col>
                <Grid.Col span={12} sm={9} lg={6} className="item item-b">
                  <Box>
                    <TextInput
                      placeholder="Ex Value: Nike"
                      {...specificationForm.getInputProps(
                        `specifications.${i}.value`
                      )}
                    />
                  </Box>
                </Grid.Col>
                <Grid.Col span={12} sm={9} lg={1} className="item item-c">
                  <Box>
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        removeRow(i);
                      }}
                    >
                      <IconX size={18} />
                    </ActionIcon>
                  </Box>
                </Grid.Col>
              </Grid>
            );
          })}
        </Stack>
        <Box pt={40} sx={{ width: "100%" }}>
          <Group position="right" mr="xl">
            <Button color="yellow.6" onClick={() => addRow()}>
              Add
            </Button>
          </Group>
        </Box>
      </Box>
    </Stack>
  );
}

export default ProductSpecification;
