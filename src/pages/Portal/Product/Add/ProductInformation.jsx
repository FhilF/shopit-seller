import {
  Avatar,
  Box,
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
import { IconUpload } from "@tabler/icons";
import React, { useState } from "react";

function ProductInformation(props) {
  const { informationForm, tempImgUrls } = props;
  const [opened, setOpened] = useState(false);

  return (
    <>
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
              Product Information
            </Text>
            <Text color="gray.5" size="sm">
              Input product information to show to users
            </Text>
          </Box>
          <Grid gutter="lg" className="input-container">
            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Image
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <Stack>
                <Group>
                  <Box
                    sx={(theme) => ({
                      // position: "relative",
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
                          size={80}
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
                          size={80}
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
                  <Box>
                    <List size="xs">
                      <List.Item>
                        <Text color="gray.6">
                          Recommended image dimensions: width 300px, height
                          300px
                        </Text>
                      </List.Item>
                      <List.Item>
                        <Text color="gray.6">Maximum file size: 2.0MB</Text>
                      </List.Item>
                      <List.Item>
                        <Text color="gray.6">
                          Image format accepted: JPG,JPEG,PNG
                        </Text>
                      </List.Item>
                    </List>
                  </Box>
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
                  {...informationForm.getInputProps("image")}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Name<span style={{ color: "red" }}>*</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <TextInput
                placeholder="Product"
                {...informationForm.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Category<span style={{ color: "red" }}>*</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <Stack>
                <Select
                  placeholder="Category"
                  data={["test"]}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpened(true);
                  }}
                  {...informationForm.getInputProps("category")}
                  styles={{ item: { display: "none" } }}
                />
                {/* <TextInput {...informationForm.getInputProps("category")} /> */}
              </Stack>
            </Grid.Col>

            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Description
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <Textarea
                placeholder="Description of your shop"
                autosize
                minRows={4}
                maxRows={5}
                {...informationForm.getInputProps("description")}
                //   {...form.getInputProps("description")}
              />
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text weight={600} color="dark.3" size="xl">
            Edit Category
          </Text>
        }
        size="xl"
        centered={true}
      >
        {/* Modal content */}
      </Modal>
    </>
  );
}

export default ProductInformation;
