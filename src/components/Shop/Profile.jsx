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
import { useState } from "react";

function Profile(props) {
  const { pTempImgUrl, setPTempImgUrl, isSetup, form, isFormLoading } = props;

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
          {/* <Stack align="center">
            <Group position="center">
            </Group>
           
          </Stack> */}
          <Group>
            <Image
              form={form}
              isFormLoading={isFormLoading}
              pTempImgUrl={pTempImgUrl}
              setPTempImgUrl={setPTempImgUrl}
            />
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
          <TextInput
            mt={4}
            sx={{
              ".mantine-Text-root": {
                marginBottom: "-4px",
              },
              ".mantine-Input-wrapper": {
                display: "none",
              },
            }}
            {...form.getInputProps(`image`)}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Shop Name<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <TextInput
            name="shop-name"
            placeholder="Shop Name"
            disabled={isFormLoading}
            autoComplete="off"
            {...form.getInputProps("name")}
          />
        </Grid.Col>

        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4" name="shop-description">
            Shop Description
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Textarea
            placeholder="Description of your shop"
            autosize
            minRows={4}
            maxRows={5}
            disabled={isFormLoading}
            {...form.getInputProps("description")}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

const Image = (props) => {
  const { form, isFormLoading, imageUrl, pTempImgUrl, setPTempImgUrl } = props;
  const [tempImgUrl, setTempImgUrl] = useState(null);

  const handleMediaInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return true;
    }
    form.setValues({ image: [{ file: file }] });
    if (setPTempImgUrl) {
      setPTempImgUrl(URL.createObjectURL(file));
    } else {
      setTempImgUrl(URL.createObjectURL(file));
    }
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
        id={`upload`}
        type="file"
        onChange={async (e) => {
          await handleMediaInputChange(e);
        }}
        className="input-upload2"
        disabled={isFormLoading}
      />
      <label
        htmlFor={`upload`}
        style={{
          display: "inline-block",
          borderRadius: "50%",
          cursor: isFormLoading ? "auto" : "pointer",
          border: "2px solid #e7e7e7",
        }}
      >
        {setPTempImgUrl ? (
          pTempImgUrl ? (
            <Avatar
              src={pTempImgUrl}
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
          )
        ) : tempImgUrl ? (
          <Avatar
            src={tempImgUrl}
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
  );
};

export default Profile;
