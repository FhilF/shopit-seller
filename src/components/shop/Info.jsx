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

function Info(props) {
  const { isSetup, form } = props;

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
          Private Info
        </Text>
        <Text color="gray.5" size="sm">
          Information that will not be displayed to users
        </Text>
      </Box>
      <Grid gutter="lg" className="input-container">
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Phone Number<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <NumberInput
            hideControls={true}
            placeholder="9*********"
            icon={
              <Text size="sm" color="dark.4">
                +63
              </Text>
            }
            {...form.getInputProps("phoneNumber")}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Info;
