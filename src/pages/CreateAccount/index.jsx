import React, { useState } from "react";
import {
  Card,
  Box,
  Text,
  Badge,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Title,
  Grid,
  Stack,
  Image,
  Paper,
  Divider,
  NumberInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAlertCircle, IconAsterisk, IconUser, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import Image1 from "assets/images/create-account.png";
import axios from "axios";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";
import { schema } from "utils/Schema/UserSchema";
import { ReactComponent as GroceriesSvg } from "assets/svg/groceries-pana.svg";

function CreateAccount() {
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      cpassword: "",
      phoneNumber: { countryCode: 63, number: null },
    },
    validate: zodResolver(schema),
  });

  const register = async () => {
    if (isFormLoading) {
      return true;
    }
    cleanNotifications();
    if (form.validate().hasErrors) {
      showNotification({
        title: "Error submitting form",
        message: "Please finish the required inputs before submitting",
        color: "red",
      });
      return true;
    }
    setIsFormLoading(true);
    const { cpassword: _, ...newInfo } = form.values;
    axios
      .post("auth/register", newInfo)
      .then((res) => {
        showNotification({
          id: "success-register",
          title: "Success!",
          message: "Your account has been registered",
          color: "teal",
          autoClose: false,
          disallowClose: true,
        });

        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsFormLoading(false);
        if (err.response.status === 400 && err.response.data.duplicateKey) {
          showNotification({
            title: "Sorry we can't process your request!",
            message: "There is an error from your form.",
            color: "red",
          });
          form.setFieldError(
            err.response.data.duplicateKey,
            `This ${err.response.data.duplicateKey} has already been taken. Try another`
          );
          return true;
        }
        showNotification({
          title: "Error!",
          message: "Sorry we can't process your request!",
          color: "red",
        });
      });
  };
  return (
    <Box>
      <Grid>
        <Grid.Col span={7}>
          <Box>
            <Box
              sx={(theme) => ({
                marginTop: "50px",
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                ".mantine-Image-root": {
                  width: "550px",
                },
              })}
            >
              <Box h={500} w={500}>
                <GroceriesSvg />
              </Box>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={5} px="xl" mt={-20}>
          <Paper mt={60} shadow="lg" radius="xs" p="xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
              autoComplete="off"
            >
              <Stack spacing={0}>
                <Text color="dark.3" size={26} weight={600}>
                  Create Account
                </Text>
                <Text color="gray.6" size="sm">
                  Setup your account for you to sign in
                </Text>
              </Stack>
              <Stack
                mt="xl"
                spacing="xs"
                sx={(theme) => ({
                  ".text-input": {
                    label: { color: theme.colors.dark[3] },
                  },
                })}
              >
                <TextInput
                  className="text-input"
                  label="Email"
                  withAsterisk
                  autoComplete="off"
                  disabled={isFormLoading}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  className="text-input"
                  label="Username"
                  withAsterisk
                  autoComplete="off"
                  disabled={isFormLoading}
                  {...form.getInputProps("username")}
                />
                <PasswordInput
                  className="text-input"
                  label="Password"
                  withAsterisk
                  autoComplete="new-password"
                  disabled={isFormLoading}
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  className="text-input"
                  label="Confirm Password"
                  withAsterisk
                  autoComplete="off"
                  disabled={isFormLoading}
                  {...form.getInputProps("cpassword")}
                />
                <NumberInput
                  placeholder="9xxxxxxxxx"
                  label="Phone Number"
                  withAsterisk
                  hideControls
                  disabled={isFormLoading}
                  icon={
                    <Text size="sm" color="dark.4">
                      +63
                    </Text>
                  }
                  {...form.getInputProps("phoneNumber.number")}
                />
                <TextInput
                  className="text-input"
                  label="Name"
                  withAsterisk
                  autoComplete="off"
                  disabled={isFormLoading}
                  {...form.getInputProps("name")}
                />
              </Stack>
              <Stack spacing="xl" mt={40}>
                <Button type="submit" disabled={isFormLoading}>
                  Register
                </Button>
                <Divider sx={{ width: "80px", alignSelf: "center" }} />
                <Group position="center" spacing={4}>
                  <Text color="gray.6" size="sm">
                    Already have an account?
                  </Text>
                  <Text
                    color="yellow.7"
                    size="sm"
                    weight={600}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/sign-in");
                    }}
                  >
                    Sign in
                  </Text>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default CreateAccount;
