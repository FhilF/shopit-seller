import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  List,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import React from "react";

function Profile(props) {
  const { isAddress, isSetup, form, tempImgUrls, handleMediaInputChange } =
    props;

  return (
    <Box className="container-form">
      <Box
        sx={(theme) => ({
          marginBottom: "30px",
          [theme.fn.largerThan("md")]: {
            marginLeft: isSetup && "40px",
          },
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
          Profile
        </Text>
        <Text color="gray.5" size="sm">
          Information that will be displayed to users
        </Text>
      </Box>
      <Grid gutter="lg" className="input-container">
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Shop Logo
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
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
                  await handleMediaInputChange(e);
                }}
                className="input-upload"
                // disabled={formLoading}
              />
              <label
                htmlFor="raised-button-file"
                style={{
                  display: "inline-block",
                  borderRadius: "50%",
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
                      borderRadius: "50%",
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
                      borderRadius: "50%",
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
                    Recommended image dimensions: width 300px, height 300px
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
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Shop Name<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <TextInput placeholder="Shop Name" {...form.getInputProps("name")} />
        </Grid.Col>

        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Shop Description
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Textarea
            placeholder="Description of your shop"
            autosize
            minRows={4}
            maxRows={5}
            {...form.getInputProps("description")}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Profile;
